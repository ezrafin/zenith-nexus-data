-- Forum Enhancements Migration

-- Add user_id to forum_discussions (link to auth.users)
ALTER TABLE public.forum_discussions
ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- Add user_id to forum_replies
ALTER TABLE public.forum_replies
ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- Add tags to forum_discussions
ALTER TABLE public.forum_discussions
ADD COLUMN IF NOT EXISTS tags text[] DEFAULT ARRAY[]::text[];

-- Add like_count and dislike_count
ALTER TABLE public.forum_discussions
ADD COLUMN IF NOT EXISTS like_count integer DEFAULT 0 NOT NULL;

ALTER TABLE public.forum_replies
ADD COLUMN IF NOT EXISTS like_count integer DEFAULT 0 NOT NULL;

-- Post reactions table
CREATE TABLE IF NOT EXISTS public.forum_reactions (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content_type text NOT NULL,
    content_id uuid NOT NULL,
    reaction_type text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT forum_reactions_content_type_check CHECK ((content_type = ANY (ARRAY['discussion'::text, 'reply'::text]))),
    CONSTRAINT forum_reactions_reaction_type_check CHECK ((reaction_type = ANY (ARRAY['like'::text, 'dislike'::text, 'helpful'::text, 'insightful'::text, 'agree'::text, 'disagree'::text]))),
    UNIQUE(user_id, content_type, content_id)
);

-- Post bookmarks
CREATE TABLE IF NOT EXISTS public.forum_bookmarks (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    discussion_id uuid NOT NULL REFERENCES public.forum_discussions(id) ON DELETE CASCADE,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    UNIQUE(user_id, discussion_id)
);

-- Followed threads
CREATE TABLE IF NOT EXISTS public.forum_follows (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    discussion_id uuid NOT NULL REFERENCES public.forum_discussions(id) ON DELETE CASCADE,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    UNIQUE(user_id, discussion_id)
);

-- Edit history for posts
CREATE TABLE IF NOT EXISTS public.forum_edit_history (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    content_type text NOT NULL,
    content_id uuid NOT NULL,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    old_content text NOT NULL,
    edited_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT forum_edit_history_content_type_check CHECK ((content_type = ANY (ARRAY['discussion'::text, 'reply'::text])))
);

-- Nested replies support (parent_id for threading)
ALTER TABLE public.forum_replies
ADD COLUMN IF NOT EXISTS parent_id uuid REFERENCES public.forum_replies(id) ON DELETE CASCADE;

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_forum_discussions_user_id ON public.forum_discussions(user_id);
CREATE INDEX IF NOT EXISTS idx_forum_discussions_tags ON public.forum_discussions USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_forum_discussions_created_at ON public.forum_discussions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_forum_discussions_like_count ON public.forum_discussions(like_count DESC);
CREATE INDEX IF NOT EXISTS idx_forum_replies_discussion_id ON public.forum_replies(discussion_id);
CREATE INDEX IF NOT EXISTS idx_forum_replies_parent_id ON public.forum_replies(parent_id);
CREATE INDEX IF NOT EXISTS idx_forum_reactions_content ON public.forum_reactions(content_type, content_id);
CREATE INDEX IF NOT EXISTS idx_forum_bookmarks_user_id ON public.forum_bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_forum_follows_user_id ON public.forum_follows(user_id);

-- Enable RLS
ALTER TABLE public.forum_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_edit_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view all reactions" ON public.forum_reactions
    FOR SELECT USING (true);

CREATE POLICY "Users can manage own reactions" ON public.forum_reactions
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Users can view own bookmarks" ON public.forum_bookmarks
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can manage own bookmarks" ON public.forum_bookmarks
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Users can view own follows" ON public.forum_follows
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can manage own follows" ON public.forum_follows
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Users can view edit history" ON public.forum_edit_history
    FOR SELECT USING (true);

-- Function to update like_count
CREATE OR REPLACE FUNCTION update_forum_like_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_TABLE_NAME = 'forum_discussions' THEN
        UPDATE public.forum_discussions
        SET like_count = (
            SELECT COUNT(*) FROM public.forum_reactions
            WHERE content_type = 'discussion'
            AND content_id = NEW.content_id
            AND reaction_type = 'like'
        )
        WHERE id = NEW.content_id;
    ELSIF TG_TABLE_NAME = 'forum_replies' THEN
        UPDATE public.forum_replies
        SET like_count = (
            SELECT COUNT(*) FROM public.forum_reactions
            WHERE content_type = 'reply'
            AND content_id = NEW.content_id
            AND reaction_type = 'like'
        )
        WHERE id = NEW.content_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for like_count updates
DROP TRIGGER IF EXISTS trigger_update_discussion_likes ON public.forum_reactions;
CREATE TRIGGER trigger_update_discussion_likes
    AFTER INSERT OR DELETE ON public.forum_reactions
    FOR EACH ROW
    WHEN (NEW.content_type = 'discussion' OR OLD.content_type = 'discussion')
    EXECUTE FUNCTION update_forum_like_count();

DROP TRIGGER IF EXISTS trigger_update_reply_likes ON public.forum_reactions;
CREATE TRIGGER trigger_update_reply_likes
    AFTER INSERT OR DELETE ON public.forum_reactions
    FOR EACH ROW
    WHEN (NEW.content_type = 'reply' OR OLD.content_type = 'reply')
    EXECUTE FUNCTION update_forum_like_count();

