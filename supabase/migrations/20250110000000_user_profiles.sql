-- User Profiles Table
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username text UNIQUE,
    display_name text,
    bio text,
    avatar_url text,
    reputation integer DEFAULT 0 NOT NULL,
    post_count integer DEFAULT 0 NOT NULL,
    comment_count integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    privacy_level text DEFAULT 'public'::text NOT NULL,
    CONSTRAINT user_profiles_privacy_level_check CHECK ((privacy_level = ANY (ARRAY['public'::text, 'private'::text, 'friends'::text])))
);

-- User Preferences Table
CREATE TABLE IF NOT EXISTS public.user_preferences (
    user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    theme text DEFAULT 'auto'::text NOT NULL,
    default_markets text[] DEFAULT ARRAY['indices', 'stocks', 'crypto']::text[],
    refresh_interval integer DEFAULT 60000,
    email_notifications boolean DEFAULT true NOT NULL,
    push_notifications boolean DEFAULT false NOT NULL,
    preferred_topics text[] DEFAULT ARRAY[]::text[],
    language text DEFAULT 'en'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT user_preferences_theme_check CHECK ((theme = ANY (ARRAY['light'::text, 'dark'::text, 'auto'::text])))
);

-- User Bookmarks/Saved Content Table
CREATE TABLE IF NOT EXISTS public.user_bookmarks (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content_type text NOT NULL,
    content_id text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT user_bookmarks_content_type_check CHECK ((content_type = ANY (ARRAY['article'::text, 'forum'::text, 'video'::text, 'analytics'::text]))),
    UNIQUE(user_id, content_type, content_id)
);

-- User Reading History Table
CREATE TABLE IF NOT EXISTS public.user_reading_history (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content_type text NOT NULL,
    content_id text NOT NULL,
    read_at timestamp with time zone DEFAULT now() NOT NULL,
    progress_percent integer DEFAULT 0,
    CONSTRAINT user_reading_history_content_type_check CHECK ((content_type = ANY (ARRAY['article'::text, 'forum'::text, 'video'::text, 'analytics'::text])))
);

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_reading_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view public profiles" ON public.user_profiles
    FOR SELECT USING (privacy_level = 'public' OR id = auth.uid());

CREATE POLICY "Users can update own profile" ON public.user_profiles
    FOR UPDATE USING (id = auth.uid());

CREATE POLICY "Users can insert own profile" ON public.user_profiles
    FOR INSERT WITH CHECK (id = auth.uid());

-- RLS Policies for user_preferences
CREATE POLICY "Users can manage own preferences" ON public.user_preferences
    FOR ALL USING (user_id = auth.uid());

-- RLS Policies for user_bookmarks
CREATE POLICY "Users can manage own bookmarks" ON public.user_bookmarks
    FOR ALL USING (user_id = auth.uid());

-- RLS Policies for user_reading_history
CREATE POLICY "Users can manage own reading history" ON public.user_reading_history
    FOR ALL USING (user_id = auth.uid());

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.user_profiles (id, username, display_name)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
        COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email)
    );
    
    INSERT INTO public.user_preferences (user_id)
    VALUES (NEW.id);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_username ON public.user_profiles(username);
CREATE INDEX IF NOT EXISTS idx_user_bookmarks_user_id ON public.user_bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_user_reading_history_user_id ON public.user_reading_history(user_id);

