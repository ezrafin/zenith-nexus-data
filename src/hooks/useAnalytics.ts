import { useQuery } from '@tanstack/react-query';
import { fetchAnalytics, AnalyticsArticle } from '@/lib/api/index';
import { useI18n } from '@/context/I18nContext';

interface UseAnalyticsOptions {
  type?: string;
  language?: string;
}

export function useAnalytics(options?: UseAnalyticsOptions) {
  const { language: currentLanguage } = useI18n();
  const language = options?.language ?? (currentLanguage === 'pl' ? 'pl' : undefined);

  return useQuery<AnalyticsArticle[], Error>({
    queryKey: ['analytics', { type: options?.type || 'all', language }],
    queryFn: () => fetchAnalytics(options?.type, language),
    staleTime: 5 * 60 * 1000, // 5 minutes - analytics don't change frequently
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

