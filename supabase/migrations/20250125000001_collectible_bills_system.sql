-- Collectible Bills System Migration
-- Implements gamified hidden-object event with 31 $100 bills (30 regular + 1 legendary)

-- Table: collectible_bills
-- Stores metadata for all 31 collectible bills
CREATE TABLE IF NOT EXISTS public.collectible_bills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bill_id TEXT UNIQUE NOT NULL, -- e.g., 'forum_first_visit', 'legendary_hidden_treasure'
  name TEXT NOT NULL,
  description TEXT,
  rarity TEXT NOT NULL CHECK (rarity IN ('regular', 'legendary')),
  trigger_type TEXT NOT NULL, -- 'page_visit', 'action', 'condition', 'legendary_spawn'
  trigger_data JSONB, -- Flexible JSON for trigger conditions
  spawn_article_id TEXT, -- For legendary: stores the article ID where bill will spawn
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table: user_collected_bills
-- Tracks which bills each user has collected
CREATE TABLE IF NOT EXISTS public.user_collected_bills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  bill_id TEXT NOT NULL REFERENCES collectible_bills(bill_id) ON DELETE CASCADE,
  collected_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  collection_context JSONB, -- Store context like page URL, action type, etc.
  UNIQUE(user_id, bill_id)
);

-- Table: user_legendary_spawns
-- Tracks legendary bill spawn locations for each user
CREATE TABLE IF NOT EXISTS public.user_legendary_spawns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  article_id TEXT NOT NULL, -- ID/slug of article where legendary bill spawned
  article_type TEXT NOT NULL, -- 'news', 'analytics', 'basic_article', 'advanced_article'
  spawned_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  collected_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id) -- One legendary spawn per user
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_collected_bills_user_id ON public.user_collected_bills(user_id);
CREATE INDEX IF NOT EXISTS idx_user_collected_bills_bill_id ON public.user_collected_bills(bill_id);
CREATE INDEX IF NOT EXISTS idx_user_legendary_spawns_user_id ON public.user_legendary_spawns(user_id);
CREATE INDEX IF NOT EXISTS idx_collectible_bills_bill_id ON public.collectible_bills(bill_id);
CREATE INDEX IF NOT EXISTS idx_collectible_bills_rarity ON public.collectible_bills(rarity);

-- Enable RLS
ALTER TABLE public.collectible_bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_collected_bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_legendary_spawns ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Collectible bills are publicly readable
CREATE POLICY "Collectible bills are publicly readable" ON public.collectible_bills
  FOR SELECT USING (true);

-- Users can only view their own collected bills
CREATE POLICY "Users can view own collected bills" ON public.user_collected_bills
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own collected bills (via Edge Function with service role)
CREATE POLICY "Users can insert own collected bills" ON public.user_collected_bills
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only view their own legendary spawns
CREATE POLICY "Users can view own legendary spawns" ON public.user_legendary_spawns
  FOR SELECT USING (auth.uid() = user_id);

-- Function to get user's collection progress
CREATE OR REPLACE FUNCTION get_user_collection_progress(p_user_id UUID)
RETURNS TABLE (
  collected_count BIGINT,
  total_count BIGINT,
  has_all_regular BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(ucb.bill_id)::BIGINT as collected_count,
    (SELECT COUNT(*)::BIGINT FROM public.collectible_bills WHERE rarity = 'regular') as total_count,
    COUNT(CASE WHEN cb.rarity = 'regular' THEN 1 END)::BIGINT = 
      (SELECT COUNT(*)::BIGINT FROM public.collectible_bills WHERE rarity = 'regular') as has_all_regular
  FROM public.user_collected_bills ucb
  JOIN public.collectible_bills cb ON ucb.bill_id = cb.bill_id
  WHERE ucb.user_id = p_user_id;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION get_user_collection_progress TO authenticated;
GRANT EXECUTE ON FUNCTION get_user_collection_progress TO anon;

