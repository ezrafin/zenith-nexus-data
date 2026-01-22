-- Fix Security Issues Migration

-- 1. Fix profiles table RLS - enforce privacy_level
-- Drop existing public read policy
DROP POLICY IF EXISTS "Profiles are publicly readable" ON public.profiles;

-- Create privacy-aware RLS policies for profiles
-- Users can always view their own profile
CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

-- Users can view public profiles only
CREATE POLICY "Public profiles are viewable by authenticated users"
ON public.profiles FOR SELECT
TO authenticated
USING (privacy_level = 'public' OR auth.uid() = id);

-- 2. Fix forum_topic_requests - hide email from public queries
-- Create a public view that excludes sensitive email info
CREATE OR REPLACE VIEW public.forum_topic_requests_public
WITH (security_invoker=on) AS
SELECT 
    id,
    topic_title,
    topic_description,
    requester_name, -- Keep name but exclude email
    status,
    created_at,
    reviewed_at,
    admin_notes
FROM public.forum_topic_requests
WHERE status = 'approved';

-- Drop existing permissive SELECT policy
DROP POLICY IF EXISTS "Approved requests are publicly readable" ON public.forum_topic_requests;

-- Create more restrictive policy - users can only see their own requests via email match
-- No public SELECT access to base table - use the view instead
CREATE POLICY "No direct public SELECT on forum_topic_requests"
ON public.forum_topic_requests FOR SELECT
USING (false);

-- Grant SELECT on the public view to anon and authenticated
GRANT SELECT ON public.forum_topic_requests_public TO anon;
GRANT SELECT ON public.forum_topic_requests_public TO authenticated;