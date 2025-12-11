-- Forum Approval System Migration
-- Adds approval status to discussions and admin comments functionality

-- Add approval status to forum_discussions
ALTER TABLE public.forum_discussions
ADD COLUMN IF NOT EXISTS is_approved boolean DEFAULT false NOT NULL;

-- Add approved_by and approved_at for tracking
ALTER TABLE public.forum_discussions
ADD COLUMN IF NOT EXISTS approved_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS approved_at timestamp with time zone;

-- Add request_id to link discussions to topic requests
ALTER TABLE public.forum_discussions
ADD COLUMN IF NOT EXISTS request_id uuid REFERENCES public.forum_topic_requests(id) ON DELETE SET NULL;

-- Admin comments table for admin comments on replies
CREATE TABLE IF NOT EXISTS public.admin_comments (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    reply_id uuid NOT NULL REFERENCES public.forum_replies(id) ON DELETE CASCADE,
    admin_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    comment text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_forum_discussions_approved ON public.forum_discussions(is_approved, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_forum_discussions_request_id ON public.forum_discussions(request_id);
CREATE INDEX IF NOT EXISTS idx_admin_comments_reply_id ON public.admin_comments(reply_id);
CREATE INDEX IF NOT EXISTS idx_admin_comments_admin_id ON public.admin_comments(admin_id);

-- Enable RLS
ALTER TABLE public.admin_comments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for admin_comments
-- Everyone can view admin comments
CREATE POLICY "Anyone can view admin comments" ON public.admin_comments
    FOR SELECT USING (true);

-- Only admins can create/update/delete comments
-- Note: In production, you'd check for admin role, here we check by email
CREATE POLICY "Admins can manage comments" ON public.admin_comments
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND auth.users.email = 'mark.lindt.finance@gmail.com'
        )
    );

-- Update RLS policy for forum_discussions to only show approved discussions publicly
DROP POLICY IF EXISTS "Forum discussions are publicly readable" ON public.forum_discussions;
CREATE POLICY "Approved forum discussions are publicly readable" ON public.forum_discussions
    FOR SELECT USING (is_approved = true);

-- Users can view their own unapproved discussions
CREATE POLICY "Users can view own unapproved discussions" ON public.forum_discussions
    FOR SELECT USING (user_id = auth.uid() OR is_approved = true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_admin_comments_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updated_at
DROP TRIGGER IF EXISTS trigger_update_admin_comments_updated_at ON public.admin_comments;
CREATE TRIGGER trigger_update_admin_comments_updated_at
    BEFORE UPDATE ON public.admin_comments
    FOR EACH ROW
    EXECUTE FUNCTION update_admin_comments_updated_at();

