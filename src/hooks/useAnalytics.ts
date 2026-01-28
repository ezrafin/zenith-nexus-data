import { useQuery } from '@tanstack/react-query';
import { fetchAnalytics, AnalyticsArticle } from '@/lib/api/index';

interface UseAnalyticsOptions {
  type?: string;
}

export function useAnalytics(options?: UseAnalyticsOptions) {
  return useQuery<AnalyticsArticle[], Error>({
    queryKey: ['analytics', { type: options?.type || 'all' }],
    queryFn: () => fetchAnalytics(options?.type),
    staleTime: 5 * 60 * 1000, // 5 minutes - analytics don't change frequently
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

