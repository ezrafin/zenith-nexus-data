import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Bookmark, Check } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useCollectibleBills } from '@/hooks/useCollectibleBills';
import { motion, AnimatePresence } from 'framer-motion';
import { checkmarkAnimation, prefersReducedMotion, transitions } from '@/lib/animations';

interface BookmarkButtonProps {
  contentType: 'article' | 'forum' | 'video' | 'analytics';
  contentId: string;
  className?: string;
}

export function BookmarkButton({ contentType, contentId, className }: BookmarkButtonProps) {
  const { user } = useUser();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { collectBill } = useCollectibleBills();

  useEffect(() => {
    if (user) {
      checkBookmarkStatus();
    }
  }, [user, contentType, contentId]);

  const checkBookmarkStatus = async () => {
    if (!user) return;

    try {
      const { data } = await (supabase
        .from('user_bookmarks' as any)
        .select('id')
        .eq('user_id', user.id)
        .eq('content_type', contentType)
        .eq('content_id', contentId)
        .maybeSingle() as any);

      setIsBookmarked(!!data);
    } catch (error) {
      // Not bookmarked
    }
  };

  const toggleBookmark = async () => {
    if (!user) {
      toast.error('Please sign in to bookmark content');
      return;
    }

    setLoading(true);
    try {
      if (isBookmarked) {
        const { error } = await (supabase
          .from('user_bookmarks' as any)
          .delete()
          .eq('user_id', user.id)
          .eq('content_type', contentType)
          .eq('content_id', contentId) as any);

        if (error) throw error;

        setIsBookmarked(false);
        toast.success('Removed from bookmarks');
      } else {
        const { error } = await (supabase
          .from('user_bookmarks' as any)
          .insert({
            user_id: user.id,
            content_type: contentType,
            content_id: contentId,
          }) as any);

        if (error) throw error;

        setIsBookmarked(true);
        toast.success('Added to bookmarks');
        
        // Trigger bill collection for creating bookmark
        await collectBill('bookmark_create', {
          action: 'create_bookmark',
          metadata: { contentType, contentId },
        });
      }
    } catch (error: any) {
      if (error.code === '23505') {
        // Already bookmarked
        setIsBookmarked(true);
      } else {
        toast.error('Failed to update bookmark');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleBookmark}
      disabled={loading}
      loading={loading}
      className={cn(
        'flex items-center gap-2 relative overflow-visible',
        isBookmarked && 'bg-primary/10 border-primary/30',
        className
      )}
    >
      <motion.div
        animate={isBookmarked && !prefersReducedMotion() ? {
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0],
        } : {}}
        transition={transitions.fast}
      >
        <Bookmark className={cn('h-4 w-4', isBookmarked && 'fill-current')} />
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.span
          key={isBookmarked ? 'bookmarked' : 'bookmark'}
          initial={prefersReducedMotion() ? {} : { opacity: 0, x: -5 }}
          animate={prefersReducedMotion() ? {} : { opacity: 1, x: 0 }}
          exit={prefersReducedMotion() ? {} : { opacity: 0, x: 5 }}
          transition={transitions.fast}
        >
          {isBookmarked ? 'Bookmarked' : 'Bookmark'}
        </motion.span>
      </AnimatePresence>
      {isBookmarked && !prefersReducedMotion() && (
        <motion.div
          className="absolute -top-1 -right-1"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={checkmarkAnimation.transition}
        >
          <Check className="h-3 w-3 text-primary" />
        </motion.div>
      )}
    </Button>
  );
}
