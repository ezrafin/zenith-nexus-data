-- Create author_follows table for following article authors
CREATE TABLE public.author_follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  author_id TEXT NOT NULL,
  last_article_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, author_id)
);

-- Enable RLS
ALTER TABLE public.author_follows ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own author follows"
  ON public.author_follows FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can follow authors"
  ON public.author_follows FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unfollow authors"
  ON public.author_follows FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their author follows"
  ON public.author_follows FOR UPDATE
  USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_author_follows_user_id ON public.author_follows(user_id);
CREATE INDEX idx_author_follows_author_id ON public.author_follows(author_id);