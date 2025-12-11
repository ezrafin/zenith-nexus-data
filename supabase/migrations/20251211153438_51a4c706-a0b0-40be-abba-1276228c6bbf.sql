-- Create forum_categories table
CREATE TABLE public.forum_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  icon text DEFAULT 'MessageSquare',
  topic_count integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.forum_categories ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Forum categories are publicly readable"
ON public.forum_categories
FOR SELECT
USING (true);

-- Seed forum categories
INSERT INTO public.forum_categories (name, slug, description, icon, topic_count) VALUES
('General Discussion', 'general', 'General topics about investing and markets', 'MessageSquare', 12),
('Stock Analysis', 'stocks', 'Discuss individual stocks and equity analysis', 'TrendingUp', 8),
('Cryptocurrency', 'crypto', 'Bitcoin, Ethereum, and other digital assets', 'Coins', 15),
('ETFs & Funds', 'etfs', 'Exchange-traded funds and mutual funds discussion', 'Briefcase', 5),
('Beginner Questions', 'beginners', 'New to investing? Ask your questions here', 'HelpCircle', 20),
('Market News', 'news', 'Discuss breaking market news and events', 'Newspaper', 10);

-- Seed sample forum discussions
INSERT INTO public.forum_discussions (title, content, category, author_name, view_count, reply_count, is_pinned, is_featured) VALUES
('Welcome to the Community!', 'This is a place to discuss all things investing. Please be respectful and follow our community guidelines.', 'general', 'Admin', 150, 5, true, true),
('Best dividend stocks for 2024?', 'Looking for recommendations on solid dividend-paying stocks. What are your top picks?', 'stocks', 'InvestorJohn', 89, 12, false, false),
('Bitcoin halving impact discussion', 'With the recent halving, what do you think will happen to BTC price in the next 6 months?', 'crypto', 'CryptoFan', 234, 28, false, true),
('VOO vs VTI - which is better?', 'Trying to decide between these two popular ETFs for my long-term portfolio. Thoughts?', 'etfs', 'NewInvestor', 67, 8, false, false),
('How to start investing with $1000?', 'I have $1000 to invest. What would be the best strategy for a complete beginner?', 'beginners', 'Starter123', 312, 45, true, false),
('Fed rate decision impact', 'How do you think the latest Fed announcement will affect the markets?', 'news', 'MarketWatcher', 178, 22, false, false);