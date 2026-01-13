-- Admin Moderation RLS Policies
-- Allow admin to update/delete any discussions, replies, and evaluations for moderation

-- Admin email constant (should match ADMIN_EMAIL in ModerationPage.tsx)
-- Note: In production, consider using a roles table or service role for admin operations

-- Drop existing admin policies if they exist
DROP POLICY IF EXISTS "Admin can update any discussion for moderation" ON public.forum_discussions;
DROP POLICY IF EXISTS "Admin can delete any discussion for moderation" ON public.forum_discussions;
DROP POLICY IF EXISTS "Admin can update any reply for moderation" ON public.forum_replies;
DROP POLICY IF EXISTS "Admin can update any evaluation for moderation" ON public.company_evaluations;
DROP POLICY IF EXISTS "Admin can delete any evaluation for moderation" ON public.company_evaluations;

-- Create policy for admin to update any discussion for moderation
-- This allows admin (by email) to update is_featured field for moderation
CREATE POLICY "Admin can update any discussion for moderation"
ON public.forum_discussions
FOR UPDATE
USING (
  -- Allow if user is the author OR if user is admin (check by email)
  auth.uid() = user_id 
  OR (
    SELECT email 
    FROM auth.users 
    WHERE id = auth.uid()
  ) = 'mark.lindt.finance@gmail.com'
);

-- Create policy for admin to delete any discussion for moderation
CREATE POLICY "Admin can delete any discussion for moderation"
ON public.forum_discussions
FOR DELETE
USING (
  -- Allow if user is the author OR if user is admin (check by email)
  auth.uid() = user_id 
  OR (
    SELECT email 
    FROM auth.users 
    WHERE id = auth.uid()
  ) = 'mark.lindt.finance@gmail.com'
);

-- Create policy for admin to update any reply for moderation
CREATE POLICY "Admin can update any reply for moderation"
ON public.forum_replies
FOR UPDATE
USING (
  -- Allow if user is the author OR if user is admin (check by email)
  auth.uid() = user_id 
  OR (
    SELECT email 
    FROM auth.users 
    WHERE id = auth.uid()
  ) = 'mark.lindt.finance@gmail.com'
);

-- Create policy for admin to update any evaluation for moderation
CREATE POLICY "Admin can update any evaluation for moderation"
ON public.company_evaluations
FOR UPDATE
USING (
  -- Allow if user is the author OR if user is admin (check by email)
  auth.uid() = user_id 
  OR (
    SELECT email 
    FROM auth.users 
    WHERE id = auth.uid()
  ) = 'mark.lindt.finance@gmail.com'
);

-- Create policy for admin to delete any evaluation for moderation
CREATE POLICY "Admin can delete any evaluation for moderation"
ON public.company_evaluations
FOR DELETE
USING (
  -- Allow if user is the author OR if user is admin (check by email)
  auth.uid() = user_id 
  OR (
    SELECT email 
    FROM auth.users 
    WHERE id = auth.uid()
  ) = 'mark.lindt.finance@gmail.com'
);

