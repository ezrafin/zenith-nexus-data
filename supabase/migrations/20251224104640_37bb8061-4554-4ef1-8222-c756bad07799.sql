-- Create collectible_bills table
CREATE TABLE public.collectible_bills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  bill_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  rarity TEXT NOT NULL CHECK (rarity IN ('regular', 'legendary')),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_collected_bills table
CREATE TABLE public.user_collected_bills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  bill_id TEXT NOT NULL,
  collected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  context JSONB,
  UNIQUE(user_id, bill_id)
);

-- Create user_legendary_spawns table
CREATE TABLE public.user_legendary_spawns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  article_id TEXT NOT NULL,
  article_type TEXT NOT NULL CHECK (article_type IN ('news', 'analytics', 'basic_article', 'advanced_article')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  collected_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on all tables
ALTER TABLE public.collectible_bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_collected_bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_legendary_spawns ENABLE ROW LEVEL SECURITY;

-- Collectible bills are public read
CREATE POLICY "Anyone can view collectible bills"
ON public.collectible_bills
FOR SELECT
USING (true);

-- User collected bills policies
CREATE POLICY "Users can view their own collected bills"
ON public.user_collected_bills
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own collected bills"
ON public.user_collected_bills
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- User legendary spawns policies
CREATE POLICY "Users can view their own legendary spawns"
ON public.user_legendary_spawns
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own legendary spawns"
ON public.user_legendary_spawns
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own legendary spawns"
ON public.user_legendary_spawns
FOR UPDATE
USING (auth.uid() = user_id);

-- Insert initial collectible bills data
INSERT INTO public.collectible_bills (bill_id, name, rarity, description) VALUES
('homepage_visit', 'Welcome Bill', 'regular', 'Visit the homepage'),
('forum_first_visit', 'Forum Explorer', 'regular', 'Visit the forum'),
('forum_search', 'Search Master', 'regular', 'Search in the forum'),
('forum_react', 'First Reaction', 'regular', 'React to a discussion'),
('markets_page_visit', 'Market Watcher', 'regular', 'Visit markets page'),
('markets_type_visit', 'Market Deep Dive', 'regular', 'Visit specific market type'),
('analytics_read', 'Analyst', 'regular', 'Read an analytics article'),
('news_read', 'News Reader', 'regular', 'Read a news article'),
('basic_article_read', 'Learner', 'regular', 'Read a basic article'),
('advanced_article_read', 'Advanced Learner', 'regular', 'Read an advanced article'),
('profile_own_visit', 'Self Aware', 'regular', 'Visit your own profile'),
('profile_other_visit', 'Social', 'regular', 'Visit another user profile'),
('watchlist_create', 'Watchful', 'regular', 'Create a watchlist'),
('collection_create', 'Collector', 'regular', 'Create a collection'),
('company_visit', 'Researcher', 'regular', 'Visit a company page'),
('discussion_create', 'Voice Heard', 'regular', 'Create a discussion'),
('reply_create', 'Conversationalist', 'regular', 'Reply to a discussion'),
('bookmark_add', 'Bookworm', 'regular', 'Add a bookmark'),
('alert_create', 'Alert', 'regular', 'Create a market alert'),
('settings_visit', 'Configurator', 'regular', 'Visit settings'),
('education_visit', 'Student', 'regular', 'Visit education page'),
('course_start', 'Course Starter', 'regular', 'Start a course'),
('tools_visit', 'Tool User', 'regular', 'Visit tools page'),
('crypto_page', 'Crypto Fan', 'regular', 'Visit crypto market'),
('stocks_page', 'Stock Trader', 'regular', 'Visit stocks market'),
('commodities_page', 'Commodity Trader', 'regular', 'Visit commodities market'),
('currencies_page', 'Forex Trader', 'regular', 'Visit currencies market'),
('indices_page', 'Index Watcher', 'regular', 'Visit indices market'),
('theme_change', 'Theme Changer', 'regular', 'Change theme'),
('language_change', 'Polyglot', 'regular', 'Change language'),
('legendary_hidden_treasure', 'Hidden Treasure', 'legendary', 'The legendary $100 bill');