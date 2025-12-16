import { useQuery } from '@tanstack/react-query';
import { fetchForumComments, ForumComment } from '@/lib/api/index';

interface UseForumCommentsOptions {
  topicId: string;
  enabled?: boolean;
}

export function useForumComments({ topicId, enabled = true }: UseForumCommentsOptions) {
  return useQuery<ForumComment[], Error>({
    queryKey: ['forumComments', topicId],
    queryFn: () => fetchForumComments(topicId),
    enabled: enabled && !!topicId,
    staleTime: 1 * 60 * 1000, // 1 minute - comments update frequently
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}

