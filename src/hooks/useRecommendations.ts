import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { MarketData } from '@/lib/api';

export interface Recommendation {
  type: 'article' | 'forum' | 'video' | 'analytics';
  id: string;
  title: string;
  reason: string;
  score: number;
}

export function useRecommendations() {
  const { user } = useUser();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadRecommendations();
    }
  }, [user]);

  const loadRecommendations = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Get user's reading history, bookmarks, and watchlists
      const [historyData, bookmarksData, watchlistsData] = await Promise.all([
        supabase
          .from('user_reading_history')
          .select('content_type, content_id')
          .eq('user_id', user.id)
          .order('read_at', { ascending: false })
          .limit(50),
        supabase
          .from('user_bookmarks')
          .select('content_type, content_id')
          .eq('user_id', user.id),
        supabase
          .from('watchlists')
          .select('watchlist_items(symbol, market_type)')
          .eq('user_id', user.id),
      ]);

      // Analyze interests
      const interests = analyzeInterests(
        historyData.data || [],
        bookmarksData.data || [],
        watchlistsData.data || []
      );

      // Generate recommendations based on interests
      const recs = await generateRecommendations(interests);
      setRecommendations(recs);
    } catch (error) {
      console.error('Error loading recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    recommendations,
    loading,
    refresh: loadRecommendations,
  };
}

function analyzeInterests(
  history: Array<{ content_type: string; content_id: string }>,
  bookmarks: Array<{ content_type: string; content_id: string }>,
  watchlists: any[]
) {
  const interests: Record<string, number> = {};

  // Count content types
  [...history, ...bookmarks].forEach((item) => {
    interests[item.content_type] = (interests[item.content_type] || 0) + 1;
  });

  // Count market interests from watchlists
  watchlists.forEach((watchlist) => {
    watchlist.watchlist_items?.forEach((item: any) => {
      const key = `market_${item.market_type}`;
      interests[key] = (interests[key] || 0) + 1;
    });
  });

  return interests;
}

async function generateRecommendations(interests: Record<string, number>): Promise<Recommendation[]> {
  const recommendations: Recommendation[] = [];

  // Get top interests
  const topInterests = Object.entries(interests)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Generate recommendations based on interests
  for (const [interest, score] of topInterests) {
    if (interest.startsWith('market_')) {
      const marketType = interest.replace('market_', '');
      // Recommend forum discussions about this market
      try {
        const { data } = await supabase
          .from('forum_discussions')
          .select('id, title, category')
          .eq('category', marketType)
          .order('created_at', { ascending: false })
          .limit(3);

        if (data) {
          data.forEach((item) => {
            recommendations.push({
              type: 'forum',
              id: item.id,
              title: item.title,
              reason: `Based on your interest in ${marketType}`,
              score: score * 10,
            });
          });
        }
      } catch (error) {
        console.error('Error fetching forum recommendations:', error);
      }
    } else if (interest === 'article' || interest === 'news') {
      // Recommend similar articles
      try {
        const { data } = await supabase
          .from('news_articles')
          .select('id, title, market')
          .order('published_at', { ascending: false })
          .limit(3);

        if (data) {
          data.forEach((item) => {
            recommendations.push({
              type: 'article',
              id: item.id,
              title: item.title,
              reason: 'Trending news you might like',
              score: score * 8,
            });
          });
        }
      } catch (error) {
        console.error('Error fetching article recommendations:', error);
      }
    }
  }

  // Sort by score and return top 10
  return recommendations
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
}

