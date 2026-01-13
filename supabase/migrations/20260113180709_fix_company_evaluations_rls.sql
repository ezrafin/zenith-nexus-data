-- Fix company_evaluations RLS policy
-- Remove old permissive policy that allows all evaluations to be read

-- Drop the old permissive policy that was created before moderation was implemented
DROP POLICY IF EXISTS "Company evaluations are publicly readable" ON public.company_evaluations;

-- Ensure the correct policy exists (should already exist from previous migration)
-- This policy only allows approved evaluations or user's own evaluations
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'company_evaluations' 
    AND policyname = 'Anyone can view approved evaluations'
  ) THEN
    CREATE POLICY "Anyone can view approved evaluations"
    ON public.company_evaluations
    FOR SELECT
    USING (is_approved = true OR auth.uid() = user_id);
  END IF;
END $$;

