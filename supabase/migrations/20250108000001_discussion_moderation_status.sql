-- Discussion Moderation Status Migration
-- Add status field to forum_discussions for moderation workflow

-- Add status column to forum_discussions
ALTER TABLE public.forum_discussions
ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending' NOT NULL;

-- Add constraint for status values
ALTER TABLE public.forum_discussions
ADD CONSTRAINT IF NOT EXISTS forum_discussions_status_check 
CHECK (status = ANY (ARRAY['pending'::text, 'approved'::text, 'rejected'::text]));

-- Create index for filtering by status
CREATE INDEX IF NOT EXISTS idx_forum_discussions_status 
ON public.forum_discussions (status) 
WHERE status = 'pending';

-- Create index for approved discussions (most common query)
CREATE INDEX IF NOT EXISTS idx_forum_discussions_approved 
ON public.forum_discussions (status, created_at DESC) 
WHERE status = 'approved';

-- Update RLS policies to only show approved discussions to public
-- Users can see their own pending/rejected discussions

-- Drop existing policy first
DROP POLICY IF EXISTS "Forum discussions are publicly readable" ON public.forum_discussions;

-- Create new policy that allows:
-- 1. Anyone to see approved discussions
-- 2. Users to see their own pending/rejected discussions
CREATE POLICY "Forum discussions visibility policy" ON public.forum_discussions
  FOR SELECT
  USING (
    status = 'approved' 
    OR (auth.uid() = user_id AND status IN ('pending', 'rejected'))
  );

-- Set all existing discussions to approved (backward compatibility)
UPDATE public.forum_discussions
SET status = 'approved'
WHERE status = 'pending' OR status IS NULL;

