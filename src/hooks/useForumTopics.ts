import { useQuery } from '@tanstack/react-query';
import { fetchForumTopics, ForumTopic } from '@/lib/api/index';

interface UseForumTopicsOptions {
  categoryId?: string;
}

export function useForumTopics(options?: UseForumTopicsOptions) {
  return useQuery<ForumTopic[], Error>({
    queryKey: ['forumTopics', { category: options?.categoryId }],
    queryFn: () => fetchForumTopics(options?.categoryId),
    staleTime: 2 * 60 * 1000, // 2-3 minutes - balance between freshness and performance
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

