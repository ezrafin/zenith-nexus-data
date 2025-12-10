-- Reputation & Gamification System Migration

-- User Achievements Table
CREATE TABLE IF NOT EXISTS public.user_achievements (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    achievement_id text NOT NULL,
    unlocked_at timestamp with time zone DEFAULT now() NOT NULL,
    UNIQUE(user_id, achievement_id)
);

-- Achievement Definitions (stored in app, but we track unlocks)
-- Types: first_post, first_reply, helpful_answer, expert_analyst, top_contributor, etc.

-- User Activity Streaks
CREATE TABLE IF NOT EXISTS public.user_activity_streaks (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    streak_type text NOT NULL,
    current_streak integer DEFAULT 1 NOT NULL,
    longest_streak integer DEFAULT 1 NOT NULL,
    last_activity_date date NOT NULL,
    UNIQUE(user_id, streak_type),
    CONSTRAINT user_activity_streaks_streak_type_check CHECK ((streak_type = ANY (ARRAY['daily'::text, 'weekly'::text])))
);

-- Reputation History (for tracking reputation changes)
CREATE TABLE IF NOT EXISTS public.reputation_history (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    change_amount integer NOT NULL,
    reason text NOT NULL,
    source_type text,
    source_id uuid,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Function to update reputation when reactions are added/removed
CREATE OR REPLACE FUNCTION update_user_reputation()
RETURNS TRIGGER AS $$
DECLARE
    content_user_id uuid;
    reputation_change integer;
BEGIN
    -- Determine the user who owns the content
    IF TG_TABLE_NAME = 'forum_reactions' THEN
        IF NEW.content_type = 'discussion' THEN
            SELECT user_id INTO content_user_id
            FROM public.forum_discussions
            WHERE id = NEW.content_id;
        ELSIF NEW.content_type = 'reply' THEN
            SELECT user_id INTO content_user_id
            FROM public.forum_replies
            WHERE id = NEW.content_id;
        END IF;

        -- Calculate reputation change based on reaction type
        CASE NEW.reaction_type
            WHEN 'like' THEN reputation_change := 1;
            WHEN 'helpful' THEN reputation_change := 2;
            WHEN 'insightful' THEN reputation_change := 3;
            WHEN 'agree' THEN reputation_change := 1;
            ELSE reputation_change := 0;
        END CASE;

        -- Update reputation if content owner exists
        IF content_user_id IS NOT NULL AND reputation_change > 0 THEN
            UPDATE public.user_profiles
            SET reputation = reputation + reputation_change,
                updated_at = now()
            WHERE id = content_user_id;

            -- Log reputation change
            INSERT INTO public.reputation_history (user_id, change_amount, reason, source_type, source_id)
            VALUES (content_user_id, reputation_change, 'Reaction: ' || NEW.reaction_type, NEW.content_type, NEW.content_id);
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for reputation updates
DROP TRIGGER IF EXISTS trigger_update_reputation_on_reaction ON public.forum_reactions;
CREATE TRIGGER trigger_update_reputation_on_reaction
    AFTER INSERT ON public.forum_reactions
    FOR EACH ROW
    EXECUTE FUNCTION update_user_reputation();

-- Function to update reputation when reactions are removed
CREATE OR REPLACE FUNCTION remove_user_reputation()
RETURNS TRIGGER AS $$
DECLARE
    content_user_id uuid;
    reputation_change integer;
BEGIN
    -- Determine the user who owns the content
    IF OLD.content_type = 'discussion' THEN
        SELECT user_id INTO content_user_id
        FROM public.forum_discussions
        WHERE id = OLD.content_id;
    ELSIF OLD.content_type = 'reply' THEN
        SELECT user_id INTO content_user_id
        FROM public.forum_replies
        WHERE id = OLD.content_id;
    END IF;

    -- Calculate reputation change (negative)
    CASE OLD.reaction_type
        WHEN 'like' THEN reputation_change := -1;
        WHEN 'helpful' THEN reputation_change := -2;
        WHEN 'insightful' THEN reputation_change := -3;
        WHEN 'agree' THEN reputation_change := -1;
        ELSE reputation_change := 0;
    END CASE;

    -- Update reputation if content owner exists
    IF content_user_id IS NOT NULL AND reputation_change < 0 THEN
        UPDATE public.user_profiles
        SET reputation = GREATEST(0, reputation + reputation_change),
            updated_at = now()
        WHERE id = content_user_id;
    END IF;

    RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for reputation removal
DROP TRIGGER IF EXISTS trigger_remove_reputation_on_reaction_delete ON public.forum_reactions;
CREATE TRIGGER trigger_remove_reputation_on_reaction_delete
    AFTER DELETE ON public.forum_reactions
    FOR EACH ROW
    EXECUTE FUNCTION remove_user_reputation();

-- Function to update post/comment counts
CREATE OR REPLACE FUNCTION update_user_activity_counts()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_TABLE_NAME = 'forum_discussions' AND NEW.user_id IS NOT NULL THEN
        UPDATE public.user_profiles
        SET post_count = post_count + 1,
            updated_at = now()
        WHERE id = NEW.user_id;
    ELSIF TG_TABLE_NAME = 'forum_replies' AND NEW.user_id IS NOT NULL THEN
        UPDATE public.user_profiles
        SET comment_count = comment_count + 1,
            updated_at = now()
        WHERE id = NEW.user_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers for activity counts
DROP TRIGGER IF EXISTS trigger_update_post_count ON public.forum_discussions;
CREATE TRIGGER trigger_update_post_count
    AFTER INSERT ON public.forum_discussions
    FOR EACH ROW
    WHEN (NEW.user_id IS NOT NULL)
    EXECUTE FUNCTION update_user_activity_counts();

DROP TRIGGER IF EXISTS trigger_update_comment_count ON public.forum_replies;
CREATE TRIGGER trigger_update_comment_count
    AFTER INSERT ON public.forum_replies
    FOR EACH ROW
    WHEN (NEW.user_id IS NOT NULL)
    EXECUTE FUNCTION update_user_activity_counts();

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON public.user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_reputation_history_user_id ON public.reputation_history(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_streaks_user_id ON public.user_activity_streaks(user_id);

-- Enable RLS
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reputation_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity_streaks ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own achievements" ON public.user_achievements
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can view own reputation history" ON public.reputation_history
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can view own streaks" ON public.user_activity_streaks
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can view public achievements" ON public.user_achievements
    FOR SELECT USING (true);

