import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface ReactionCounts {
  [targetId: string]: {
    like: number;
    dislike: number;
  };
}

export function useReactionCounts(targetIds: string[], targetType: 'discussion' | 'reply') {
  // Sort and deduplicate targetIds to ensure consistent query keys
  const sortedIds = [...new Set(targetIds)].sort();
  
  return useQuery({
    queryKey: ['reactionCounts', targetType, sortedIds],
    queryFn: async (): Promise<ReactionCounts> => {
      if (targetIds.length === 0) return {};

      const { data, error } = await supabase
        .from('forum_reactions')
        .select('target_id, reaction_type')
        .eq('target_type', targetType)
        .in('target_id', targetIds);

      if (error) {
        console.error('Error fetching reaction counts:', error);
        return {};
      }

      // Count reactions by target_id and reaction_type
      const counts: ReactionCounts = {};
      
      // Initialize all target IDs with zero counts
      sortedIds.forEach(id => {
        counts[id] = { like: 0, dislike: 0 };
      });

      // Count actual reactions
      data?.forEach(reaction => {
        if (counts[reaction.target_id]) {
          if (reaction.reaction_type === 'like') {
            counts[reaction.target_id].like++;
          } else if (reaction.reaction_type === 'dislike') {
            counts[reaction.target_id].dislike++;
          }
        }
      });

      return counts;
    },
    enabled: sortedIds.length > 0,
    staleTime: 30 * 1000, // 30 seconds
    // Deduplicate queries with same parameters
    queryKeyHashFn: (queryKey) => {
      // Create a stable hash for query key to ensure deduplication
      return JSON.stringify(queryKey);
    },
  });
}
