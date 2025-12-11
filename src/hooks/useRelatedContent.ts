import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface RelatedItem {
  type: 'article' | 'forum' | 'video' | 'analytics' | 'news';
  id: string;
  title: string;
  excerpt?: string;
  date?: string;
}

interface UseRelatedContentOptions {
  contentType: 'analytics' | 'news' | 'video' | 'forum';
  contentId: string;
  category?: string;
  limit?: number;
}

// Mock analytics data for category matching
const analyticsArticles = [
  { slug: 'sp500-weekly-analysis', title: 'S&P 500 Weekly Analysis: Market Resilience', type: 'markets', excerpt: 'Weekly market analysis and key support levels.' },
  { slug: 'crypto-market-outlook', title: 'Crypto Market Outlook: Bitcoin Dominance Rising', type: 'technical', excerpt: 'Technical analysis of cryptocurrency markets.' },
  { slug: 'earnings-season-preview', title: 'Q4 Earnings Season Preview: What to Expect', type: 'expert', excerpt: 'Expert preview of upcoming earnings reports.' },
  { slug: 'bond-market-analysis', title: 'Bond Market Analysis: Yield Curve Insights', type: 'longterm', excerpt: 'Long-term analysis of bond market trends.' },
  { slug: 'nasdaq-chart-patterns', title: 'NASDAQ Technical Setup: Key Chart Patterns to Watch', type: 'technical', excerpt: 'Identifying potential breakout opportunities.' },
  { slug: 'gold-price-forecast', title: 'Gold Price Forecast: Safe Haven Demand', type: 'markets', excerpt: 'Analysis of gold price movements and forecasts.' },
  { slug: 'oil-market-dynamics', title: 'Oil Market Dynamics: Supply and Demand Factors', type: 'expert', excerpt: 'Expert analysis of global oil markets.' },
  { slug: 'forex-weekly-outlook', title: 'Forex Weekly Outlook: Major Currency Pairs', type: 'technical', excerpt: 'Technical analysis of major forex pairs.' },
  { slug: 'emerging-markets-analysis', title: 'Emerging Markets Analysis: Growth Opportunities', type: 'longterm', excerpt: 'Long-term outlook for emerging market investments.' },
  { slug: 'dividend-stocks-picks', title: 'Top Dividend Stocks for Income Investors', type: 'expert', excerpt: 'Expert picks for dividend-focused portfolios.' },
];

// Category relevance mapping
const categoryRelevance: Record<string, string[]> = {
  technical: ['technical', 'markets'],
  markets: ['markets', 'technical', 'expert'],
  expert: ['expert', 'longterm', 'markets'],
  longterm: ['longterm', 'expert', 'markets'],
};

export function useRelatedContent({ contentType, contentId, category, limit = 3 }: UseRelatedContentOptions) {
  const [relatedItems, setRelatedItems] = useState<RelatedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRelatedContent() {
      setLoading(true);
      
      try {
        // First, try to get manually curated relationships from database
        const { data: relationships } = await supabase
          .from('content_relationships')
          .select('*')
          .eq('source_type', contentType)
          .eq('source_id', contentId)
          .order('relevance_score', { ascending: false })
          .limit(limit);

        if (relationships && relationships.length > 0) {
          // Use manually curated relationships if available
          const items: RelatedItem[] = relationships.map(rel => ({
            type: rel.related_type as RelatedItem['type'],
            id: rel.related_id,
            title: rel.related_id, // Would need to fetch actual titles
          }));
          setRelatedItems(items);
        } else {
          // Fall back to automatic category-based matching
          const relatedCategories = category ? categoryRelevance[category] || [category] : [];
          
          // Filter articles by related categories, excluding current article
          const relevantArticles = analyticsArticles
            .filter(article => 
              article.slug !== contentId && 
              relatedCategories.includes(article.type)
            )
            .sort((a, b) => {
              // Prioritize exact category matches
              const aExact = a.type === category ? 1 : 0;
              const bExact = b.type === category ? 1 : 0;
              return bExact - aExact;
            })
            .slice(0, limit);

          // If not enough matches, fill with random articles
          if (relevantArticles.length < limit) {
            const otherArticles = analyticsArticles
              .filter(article => 
                article.slug !== contentId && 
                !relevantArticles.includes(article)
              )
              .slice(0, limit - relevantArticles.length);
            
            relevantArticles.push(...otherArticles);
          }

          const items: RelatedItem[] = relevantArticles.map(article => ({
            type: 'analytics' as const,
            id: article.slug,
            title: article.title,
            excerpt: article.excerpt,
          }));

          setRelatedItems(items);
        }
      } catch (error) {
        console.error('Error fetching related content:', error);
        // Fallback to basic matching on error
        const fallbackItems = analyticsArticles
          .filter(a => a.slug !== contentId)
          .slice(0, limit)
          .map(article => ({
            type: 'analytics' as const,
            id: article.slug,
            title: article.title,
          }));
        setRelatedItems(fallbackItems);
      } finally {
        setLoading(false);
      }
    }

    fetchRelatedContent();
  }, [contentType, contentId, category, limit]);

  return { relatedItems, loading };
}
