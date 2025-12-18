import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface ReactionCounts {
  [targetId: string]: {
    like: number;
    dislike: number;
  };
}

export function useReactionCounts(targetIds: string[], targetType: 'discussion' | 'reply') {
  return useQuery({
    queryKey: ['reactionCounts', targetType, targetIds],
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
      targetIds.forEach(id => {
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
    enabled: targetIds.length > 0,
    staleTime: 30 * 1000, // 30 seconds
  });
}
