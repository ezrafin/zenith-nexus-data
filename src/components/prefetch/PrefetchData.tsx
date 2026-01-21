import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useI18n } from '@/context/I18nContext';
import { logger } from '@/lib/logger';

/**
 * Component to prefetch critical data for Index page in parallel with translations
 * This improves perceived performance by loading data before user sees the page
 */
export function PrefetchData() {
  const queryClient = useQueryClient();
  const { loading: translationsLoading, translations } = useI18n();

  useEffect(() => {
    // Only prefetch when translations are loaded and we have critical namespaces
    if (translationsLoading || !translations.common || !translations.ui) {
      return;
    }

    // Prefetch critical data for Index page
    const prefetchCriticalData = async () => {
      try {
        // Prefetch news data (used in NewsSection)
        const { fetchNews } = await import('@/lib/api/index');
        queryClient.prefetchQuery({
          queryKey: ['news', 'all', 1, 15],
          queryFn: async () => {
            const news = await fetchNews();
            return { articles: news.slice(0, 15), lastUpdated: new Date().toISOString(), totalCount: news.length };
          },
          staleTime: 2 * 60 * 1000, // 2 minutes
        }).catch((error) => {
          logger.warn('Failed to prefetch news:', error);
        });

        // Prefetch analytics data (used in AnalyticsSection)
        const { fetchAnalytics } = await import('@/lib/api/analytics');
        queryClient.prefetchQuery({
          queryKey: ['analytics'],
          queryFn: () => fetchAnalytics(),
          staleTime: 5 * 60 * 1000, // 5 minutes
        }).catch((error) => {
          logger.warn('Failed to prefetch analytics:', error);
        });

        // Prefetch market data for indices (most commonly viewed on homepage)
        const { fetchMarketDataFromAPI } = await import('@/hooks/useMarketDataQuery');
        queryClient.prefetchQuery({
          queryKey: ['marketData', 'indices'],
          queryFn: () => fetchMarketDataFromAPI('indices'),
          staleTime: 30 * 1000, // 30 seconds
        }).catch((error) => {
          logger.warn('Failed to prefetch indices data:', error);
        });
      } catch (error) {
        logger.warn('Error prefetching critical data:', error);
      }
    };

    // Small delay to avoid blocking translation loading
    const timeoutId = setTimeout(prefetchCriticalData, 100);

    return () => clearTimeout(timeoutId);
  }, [queryClient, translationsLoading, translations]);

  return null; // This component doesn't render anything
}

