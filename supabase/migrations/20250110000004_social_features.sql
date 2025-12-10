-- Social Features Migration

-- User Follows Table
CREATE TABLE IF NOT EXISTS public.user_follows (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    follower_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    following_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    UNIQUE(follower_id, following_id),
    CONSTRAINT user_follows_no_self_follow CHECK (follower_id != following_id)
);

-- User Mentions Table (for @mentions in posts)
CREATE TABLE IF NOT EXISTS public.user_mentions (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content_type text NOT NULL,
    content_id uuid NOT NULL,
    mentioned_by uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    is_read boolean DEFAULT false NOT NULL,
    CONSTRAINT user_mentions_content_type_check CHECK ((content_type = ANY (ARRAY['discussion'::text, 'reply'::text])))
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_follows_follower ON public.user_follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_user_follows_following ON public.user_follows(following_id);
CREATE INDEX IF NOT EXISTS idx_user_mentions_user_id ON public.user_mentions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_mentions_unread ON public.user_mentions(user_id, is_read) WHERE is_read = false;

-- Enable RLS
ALTER TABLE public.user_follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_mentions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view all follows" ON public.user_follows
    FOR SELECT USING (true);

CREATE POLICY "Users can manage own follows" ON public.user_follows
    FOR ALL USING (follower_id = auth.uid());

CREATE POLICY "Users can view own mentions" ON public.user_mentions
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update own mentions" ON public.user_mentions
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can create mentions" ON public.user_mentions
    FOR INSERT WITH CHECK (mentioned_by = auth.uid());

