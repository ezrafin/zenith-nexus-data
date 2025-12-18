import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReactionButtonProps {
  contentType: 'discussion' | 'reply';
  contentId: string;
  reactionType: 'like' | 'dislike';
  count?: number;
  className?: string;
}

const reactionIcons = {
  like: ThumbsUp,
  dislike: ThumbsDown,
};

const reactionColors = {
  like: 'text-positive hover:text-positive',
  dislike: 'text-negative hover:text-negative',
};

export function ReactionButton({
  contentType,
  contentId,
  reactionType,
  count = 0,
  className,
}: ReactionButtonProps) {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [isReacted, setIsReacted] = useState(false);
  const [reactionCount, setReactionCount] = useState(count);

  // Sync count from props when it changes
  useEffect(() => {
    setReactionCount(count);
  }, [count]);

  useEffect(() => {
    if (user) {
      checkReaction();
    }
  }, [user, contentType, contentId, reactionType]);

  const checkReaction = async () => {
    if (!user) return;

    try {
      const { data } = await supabase
        .from('forum_reactions')
        .select('id')
        .eq('user_id', user.id)
        .eq('target_type', contentType)
        .eq('target_id', contentId)
        .eq('reaction_type', reactionType)
        .maybeSingle();

      setIsReacted(!!data);
    } catch (error) {
      // Not reacted
    }
  };

  // Optimistic mutation for reactions
  const reactionMutation = useMutation({
    mutationFn: async (action: 'add' | 'remove') => {
      if (!user) throw new Error('Please sign in to react');

      if (action === 'remove') {
        const { error } = await supabase
          .from('forum_reactions')
          .delete()
          .eq('user_id', user.id)
          .eq('target_type', contentType)
          .eq('target_id', contentId)
          .eq('reaction_type', reactionType);
        if (error) throw error;
      } else {
        // Remove any existing reaction of different type first
        await supabase
          .from('forum_reactions')
          .delete()
          .eq('user_id', user.id)
          .eq('target_type', contentType)
          .eq('target_id', contentId);

        // Add new reaction
        const { error } = await supabase
          .from('forum_reactions')
          .insert({
            user_id: user.id,
            target_type: contentType,
            target_id: contentId,
            reaction_type: reactionType,
          });
        if (error) throw error;
      }
    },
    onMutate: async (action) => {
      // Optimistically update UI
      const previousIsReacted = isReacted;
      const previousCount = reactionCount;

      if (action === 'remove') {
        setIsReacted(false);
        setReactionCount(Math.max(0, reactionCount - 1));
      } else {
        setIsReacted(true);
        setReactionCount(reactionCount + 1);
      }

      // Return context for rollback
      return { previousIsReacted, previousCount };
    },
    onError: (error, action, context) => {
      // Rollback on error
      if (context) {
        setIsReacted(context.previousIsReacted);
        setReactionCount(context.previousCount);
      }
      toast.error(error instanceof Error ? error.message : 'Failed to update reaction');
    },
    onSuccess: () => {
      // Invalidate reaction counts cache
      queryClient.invalidateQueries({ queryKey: ['reactionCounts', contentType] });
      
      // Also invalidate related content queries
      if (contentType === 'discussion') {
        queryClient.invalidateQueries({ queryKey: ['forumTopic', contentId] });
        queryClient.invalidateQueries({ queryKey: ['forumTopics'] });
      } else if (contentType === 'reply') {
        queryClient.invalidateQueries({ queryKey: ['forumComments'] });
      }
    },
  });

  const handleReaction = () => {
    if (!user) {
      toast.error('Please sign in to react');
      return;
    }

    reactionMutation.mutate(isReacted ? 'remove' : 'add');
  };

  const Icon = reactionIcons[reactionType];
  const colorClass = reactionColors[reactionType];

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleReaction}
      disabled={reactionMutation.isPending}
      className={cn(
        'flex items-center gap-1.5 text-sm transition-colors',
        isReacted ? colorClass : 'text-muted-foreground hover:text-foreground',
        className
      )}
    >
      <Icon className={cn('h-4 w-4', isReacted && 'fill-current')} />
      <span className="tabular-nums">{reactionCount}</span>
    </Button>
  );
}
