import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCollectibleBills } from '@/hooks/useCollectibleBills';
import { motion, AnimatePresence } from 'framer-motion';
import { checkmarkAnimation, shakeAnimation, prefersReducedMotion, transitions } from '@/lib/animations';
import { useTranslation } from '@/hooks/useTranslation';
import { checkRateLimit } from '@/lib/api/rateLimit';

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
  const { collectBill } = useCollectibleBills();
  const { t } = useTranslation({ namespace: 'forum' });

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
    mutationFn: async (action: 'add' | 'remove'): Promise<'add' | 'remove'> => {
      if (!user) throw new Error(t('toast.pleaseSignInToReact'));

      // Server-side rate limit check for adding reactions
      if (action === 'add') {
        const rateLimitCheck = await checkRateLimit('create_reaction', 30, 60, user.id);
        if (!rateLimitCheck.allowed) {
          throw new Error(rateLimitCheck.message || t('toast.rateLimitExceeded'));
        }
      }

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
      return action;
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
      toast.error(error instanceof Error ? error.message : t('toast.failedToUpdateReaction'));
    },
    onSuccess: async (action) => {
      // Invalidate reaction counts cache
      queryClient.invalidateQueries({ queryKey: ['reactionCounts', contentType] });
      
      // Also invalidate related content queries
      if (contentType === 'discussion') {
        queryClient.invalidateQueries({ queryKey: ['forumTopic', contentId] });
        queryClient.invalidateQueries({ queryKey: ['forumTopics'] });
      } else if (contentType === 'reply') {
        queryClient.invalidateQueries({ queryKey: ['forumComments'] });
      }
      
      // Trigger bill collection for reacting (only when adding, not removing)
      if (action === 'add' && contentType === 'discussion') {
        await collectBill('forum_react', {
          page: `/forum/${contentId}`,
          action: 'react_discussion',
          metadata: { reactionType },
        });
      }
    },
  });

  const handleReaction = () => {
    if (!user) {
      toast.error(t('toast.pleaseSignInToReact'));
      return;
    }

    reactionMutation.mutate(isReacted ? 'remove' : 'add');
  };

  const Icon = reactionIcons[reactionType];
  const colorClass = reactionColors[reactionType];

  return (
    <motion.div
      animate={reactionMutation.isError && !prefersReducedMotion() ? shakeAnimation : {}}
      className="inline-block"
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={handleReaction}
        disabled={reactionMutation.isPending}
        loading={reactionMutation.isPending}
        className={cn(
          'flex items-center gap-1.5 text-sm transition-all duration-200 relative interactive-button touch-target',
          'hover:scale-105 active:scale-95',
          isReacted ? colorClass : 'text-muted-foreground hover:text-foreground',
          className
        )}
      >
        <motion.div
          animate={isReacted && !prefersReducedMotion() ? {
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          } : {}}
          transition={transitions.fast}
        >
          <Icon className={cn('h-4 w-4', isReacted && 'fill-current')} />
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.span
            key={reactionCount}
            initial={prefersReducedMotion() ? {} : { scale: 1.3, opacity: 0.5 }}
            animate={prefersReducedMotion() ? {} : { scale: 1, opacity: 1 }}
            exit={prefersReducedMotion() ? {} : { scale: 0.8, opacity: 0 }}
            transition={transitions.fast}
            className="tabular-nums"
          >
            {reactionCount}
          </motion.span>
        </AnimatePresence>
        {isReacted && !prefersReducedMotion() && (
          <motion.div
            className="absolute -top-1 -right-1"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={checkmarkAnimation.transition}
          >
            <div className="w-2 h-2 bg-current rounded-full" />
          </motion.div>
        )}
      </Button>
    </motion.div>
  );
}
