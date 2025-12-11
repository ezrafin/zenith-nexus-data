import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ThumbsUp, ThumbsDown, Lightbulb, Heart, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReactionButtonProps {
  contentType: 'discussion' | 'reply';
  contentId: string;
  reactionType: 'like' | 'dislike' | 'helpful' | 'insightful' | 'agree' | 'disagree';
  count?: number;
  className?: string;
}

const reactionIcons = {
  like: ThumbsUp,
  dislike: ThumbsDown,
  helpful: CheckCircle,
  insightful: Lightbulb,
  agree: Heart,
  disagree: XCircle,
};

const reactionColors = {
  like: 'text-positive hover:text-positive',
  dislike: 'text-negative hover:text-negative',
  helpful: 'text-blue-500 hover:text-blue-600',
  insightful: 'text-purple-500 hover:text-purple-600',
  agree: 'text-green-500 hover:text-green-600',
  disagree: 'text-red-500 hover:text-red-600',
};

export function ReactionButton({
  contentType,
  contentId,
  reactionType,
  count = 0,
  className,
}: ReactionButtonProps) {
  const { user } = useUser();
  const [isReacted, setIsReacted] = useState(false);
  const [reactionCount, setReactionCount] = useState(count);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      checkReaction();
    }
  }, [user, contentType, contentId, reactionType]);

  const checkReaction = async () => {
    if (!user) return;

    try {
      const { data } = await (supabase
        .from('forum_reactions' as any)
        .select('id')
        .eq('user_id', user.id)
        .eq('target_type', contentType)
        .eq('target_id', contentId)
        .eq('reaction_type', reactionType)
        .maybeSingle() as any);

      setIsReacted(!!data);
    } catch (error) {
      // Not reacted
    }
  };

  const handleReaction = async () => {
    if (!user) {
      toast.error('Please sign in to react');
      return;
    }

    setLoading(true);
    try {
      if (isReacted) {
        // Remove reaction
        const { error } = await (supabase
          .from('forum_reactions' as any)
          .delete()
          .eq('user_id', user.id)
          .eq('target_type', contentType)
          .eq('target_id', contentId)
          .eq('reaction_type', reactionType) as any);

        if (error) throw error;

        setIsReacted(false);
        setReactionCount(Math.max(0, reactionCount - 1));
      } else {
        // Add reaction
        // First, remove any existing reaction of different type
        await (supabase
          .from('forum_reactions' as any)
          .delete()
          .eq('user_id', user.id)
          .eq('target_type', contentType)
          .eq('target_id', contentId) as any);

        // Add new reaction
        const { error } = await (supabase
          .from('forum_reactions' as any)
          .insert({
            user_id: user.id,
            target_type: contentType,
            target_id: contentId,
            reaction_type: reactionType,
          }) as any);

        if (error) throw error;

        setIsReacted(true);
        setReactionCount(reactionCount + 1);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update reaction');
    } finally {
      setLoading(false);
    }
  };

  const Icon = reactionIcons[reactionType];
  const colorClass = reactionColors[reactionType];

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleReaction}
      disabled={loading}
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
