import { useQuery } from '@tanstack/react-query';
import { fetchForumCategories, ForumCategory } from '@/lib/api/index';

export function useForumCategories() {
  return useQuery<ForumCategory[], Error>({
    queryKey: ['forumCategories'],
    queryFn: fetchForumCategories,
    staleTime: 15 * 60 * 1000, // 15 minutes - categories rarely change
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

