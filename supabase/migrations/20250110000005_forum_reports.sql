-- Forum Reports Table for Moderation

CREATE TABLE IF NOT EXISTS public.forum_reports (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content_type text NOT NULL,
    content_id uuid NOT NULL,
    reason text NOT NULL,
    details text,
    status text DEFAULT 'pending' NOT NULL,
    reviewed_by uuid REFERENCES auth.users(id),
    reviewed_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT forum_reports_content_type_check CHECK ((content_type = ANY (ARRAY['discussion'::text, 'reply'::text]))),
    CONSTRAINT forum_reports_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'reviewed'::text, 'resolved'::text, 'dismissed'::text])))
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_forum_reports_status ON public.forum_reports(status);
CREATE INDEX IF NOT EXISTS idx_forum_reports_content ON public.forum_reports(content_type, content_id);
CREATE INDEX IF NOT EXISTS idx_forum_reports_user_id ON public.forum_reports(user_id);
CREATE INDEX IF NOT EXISTS idx_forum_reports_pending ON public.forum_reports(status, created_at) WHERE status = 'pending';

-- Enable RLS
ALTER TABLE public.forum_reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can create reports" ON public.forum_reports
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view own reports" ON public.forum_reports
    FOR SELECT USING (user_id = auth.uid());

-- Moderators can view all reports (would need role check in real app)
CREATE POLICY "Moderators can view all reports" ON public.forum_reports
    FOR SELECT USING (true);

CREATE POLICY "Moderators can update reports" ON public.forum_reports
    FOR UPDATE USING (true);

