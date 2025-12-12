import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface NewsArticle {
  id: string;
  external_id: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  url: string | null;
  image_url: string | null;
  source_name: string;
  source_id: string | null;
  author: string | null;
  published_at: string;
  market: string;
  fetched_at: string;
  created_at: string;
}

interface UseNewsResult {
  news: NewsArticle[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  refetch: () => Promise<void>;
}

export function useNews(market: string = 'all'): UseNewsResult {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // Fast: Load cached news directly from database
  const loadCachedNews = useCallback(async () => {
    try {
      let query = supabase
        .from('news_articles')
        .select('*')
        .order('published_at', { ascending: false })
        .limit(50);

      if (market !== 'all') {
        query = query.eq('market', market);
      }

      const { data: articles, error: dbError } = await query;

      if (dbError) {
        console.error('Error loading cached news:', dbError);
        return false;
      }

      if (articles && articles.length > 0) {
        setNews(articles);
        setLoading(false);
        
        // Get last fetch time
        const { data: fetchLog } = await supabase
          .from('news_fetch_log')
          .select('last_fetched_at')
          .order('last_fetched_at', { ascending: false })
          .limit(1)
          .maybeSingle();
        
        if (fetchLog) {
          setLastUpdated(fetchLog.last_fetched_at);
        }
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error in loadCachedNews:', err);
      return false;
    }
  }, [market]);

  // Slow: Refresh news from edge function (background)
  const refreshFromAPI = useCallback(async (forceRefresh = false) => {
    try {
      const { data, error: fnError } = await supabase.functions.invoke('fetch-news', {
        body: { market, forceRefresh }
      });

      if (fnError) {
        console.error('Error calling fetch-news:', fnError);
        return;
      }

      if (data?.articles) {
        setNews(data.articles);
        setLastUpdated(data.lastUpdated);
      }
    } catch (err) {
      console.error('Error refreshing news:', err);
    }
  }, [market]);

  useEffect(() => {
    const initNews = async () => {
      setLoading(true);
      setError(null);

      // Step 1: Try to load cached news immediately
      const hasCachedData = await loadCachedNews();

      // Step 2: Refresh in background (don't await if we have cached data)
      if (hasCachedData) {
        // Refresh in background without blocking UI
        refreshFromAPI(false);
      } else {
        // No cached data, must wait for API
        setLoading(true);
        try {
          await refreshFromAPI(false);
        } catch (err) {
          setError('Failed to fetch news');
        } finally {
          setLoading(false);
        }
      }
    };

    initNews();
  }, [loadCachedNews, refreshFromAPI]);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await refreshFromAPI(true);
    } catch (err) {
      setError('Failed to fetch news');
    } finally {
      setLoading(false);
    }
  }, [refreshFromAPI]);

  return { news, loading, error, lastUpdated, refetch };
}
