-- Create user_follows table for following users
CREATE TABLE public.user_follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID NOT NULL,
  following_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(follower_id, following_id),
  CONSTRAINT no_self_follow CHECK (follower_id != following_id)
);

-- Enable Row Level Security
ALTER TABLE public.user_follows ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Anyone can view follows"
  ON public.user_follows 
  FOR SELECT 
  USING (true);

CREATE POLICY "Users can follow others"
  ON public.user_follows 
  FOR INSERT 
  WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can unfollow"
  ON public.user_follows 
  FOR DELETE 
  USING (auth.uid() = follower_id);

-- Create indexes for performance
CREATE INDEX idx_user_follows_follower ON public.user_follows(follower_id);
CREATE INDEX idx_user_follows_following ON public.user_follows(following_id);