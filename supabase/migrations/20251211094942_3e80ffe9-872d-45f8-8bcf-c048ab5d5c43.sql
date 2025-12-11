-- Create table for article tags
CREATE TABLE public.article_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create table for article-tag relationships (analytics articles)
CREATE TABLE public.analytics_article_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_slug text NOT NULL,
  tag_id uuid NOT NULL REFERENCES public.article_tags(id) ON DELETE CASCADE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(article_slug, tag_id)
);

-- Create table for content relationships with relevance scores
CREATE TABLE public.content_relationships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_type text NOT NULL, -- 'analytics', 'news', 'video'
  source_id text NOT NULL,
  related_type text NOT NULL,
  related_id text NOT NULL,
  relevance_score integer NOT NULL DEFAULT 50, -- 0-100
  relationship_type text NOT NULL DEFAULT 'auto', -- 'auto', 'manual'
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(source_type, source_id, related_type, related_id)
);

-- Enable RLS
ALTER TABLE public.article_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_article_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_relationships ENABLE ROW LEVEL SECURITY;

-- RLS policies - tags and relationships are publicly readable
CREATE POLICY "Article tags are publicly readable" ON public.article_tags
  FOR SELECT USING (true);

CREATE POLICY "Analytics article tags are publicly readable" ON public.analytics_article_tags
  FOR SELECT USING (true);

CREATE POLICY "Content relationships are publicly readable" ON public.content_relationships
  FOR SELECT USING (true);

-- Insert default tags for financial content
INSERT INTO public.article_tags (name, slug) VALUES
  ('Technical Analysis', 'technical-analysis'),
  ('Fundamental Analysis', 'fundamental-analysis'),
  ('Stock Market', 'stock-market'),
  ('Cryptocurrency', 'cryptocurrency'),
  ('Forex', 'forex'),
  ('Commodities', 'commodities'),
  ('ETFs', 'etfs'),
  ('Options', 'options'),
  ('Trading Strategies', 'trading-strategies'),
  ('Market News', 'market-news'),
  ('Economic Indicators', 'economic-indicators'),
  ('Earnings', 'earnings'),
  ('IPO', 'ipo'),
  ('Dividends', 'dividends'),
  ('Risk Management', 'risk-management'),
  ('Portfolio Management', 'portfolio-management'),
  ('Long-term Investing', 'long-term-investing'),
  ('Day Trading', 'day-trading'),
  ('Swing Trading', 'swing-trading'),
  ('Market Psychology', 'market-psychology');

-- Create index for faster lookups
CREATE INDEX idx_content_relationships_source ON public.content_relationships(source_type, source_id);
CREATE INDEX idx_content_relationships_related ON public.content_relationships(related_type, related_id);
CREATE INDEX idx_analytics_article_tags_slug ON public.analytics_article_tags(article_slug);