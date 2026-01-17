-- Create author_follows table for following article authors
CREATE TABLE public.author_follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  author_id TEXT NOT NULL,
  last_article_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, author_id)
);

-- Enable Row Level Security
ALTER TABLE public.author_follows ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Anyone can view author follows"
  ON public.author_follows 
  FOR SELECT 
  USING (true);

CREATE POLICY "Users can follow authors"
  ON public.author_follows 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unfollow authors"
  ON public.author_follows 
  FOR DELETE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own author follows"
  ON public.author_follows 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_author_follows_user_id ON public.author_follows(user_id);
CREATE INDEX idx_author_follows_author_id ON public.author_follows(author_id);

