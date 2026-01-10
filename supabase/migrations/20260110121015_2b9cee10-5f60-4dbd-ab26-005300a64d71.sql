-- Add is_approved column to forum_replies for moderation
ALTER TABLE public.forum_replies 
ADD COLUMN IF NOT EXISTS is_approved boolean NOT NULL DEFAULT false;

-- Add is_approved column to company_evaluations for moderation  
ALTER TABLE public.company_evaluations 
ADD COLUMN IF NOT EXISTS is_approved boolean NOT NULL DEFAULT false;

-- Add index for faster moderation queries on forum_replies
CREATE INDEX IF NOT EXISTS idx_forum_replies_is_approved ON public.forum_replies(is_approved);

-- Add index for faster moderation queries on company_evaluations
CREATE INDEX IF NOT EXISTS idx_company_evaluations_is_approved ON public.company_evaluations(is_approved);

-- Update existing forum_discussions: use is_featured for approved status
-- No changes needed as is_featured is already used for moderation

-- Create or replace RLS policy for forum_replies to only show approved replies
-- First drop the existing policy if it exists
DROP POLICY IF EXISTS "Anyone can view approved replies" ON public.forum_replies;
CREATE POLICY "Anyone can view approved replies"
ON public.forum_replies
FOR SELECT
USING (is_approved = true OR auth.uid() = user_id);

-- Update RLS for company_evaluations to only show approved comments
DROP POLICY IF EXISTS "Anyone can view approved evaluations" ON public.company_evaluations;
CREATE POLICY "Anyone can view approved evaluations"
ON public.company_evaluations
FOR SELECT
USING (is_approved = true OR auth.uid() = user_id);