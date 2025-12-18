-- Add privacy_level to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS privacy_level text NOT NULL DEFAULT 'public';

-- Add symbol column to forum_discussions for linking to specific assets
ALTER TABLE public.forum_discussions 
ADD COLUMN IF NOT EXISTS symbol text;

-- Add asset_type column to forum_discussions
ALTER TABLE public.forum_discussions 
ADD COLUMN IF NOT EXISTS asset_type text;