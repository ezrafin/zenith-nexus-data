import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';
import { logger } from '@/lib/logger';

export function useAuthorFollow(authorId?: string) {
  const { user } = useUser();
  const { t } = useTranslation({ namespace: 'ui' });
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadStatus = async () => {
      if (!user || !authorId) return;

      const { data, error } = await (supabase
        .from('author_follows' as any)
        .select('id')
        .eq('user_id', user.id)
        .eq('author_id', authorId)
        .maybeSingle() as any);

      if (error) {
        logger.error('Error loading author follow status:', error);
        return;
      }

      setIsFollowing(!!data);
    };

    loadStatus();
  }, [user, authorId]);

  const toggleFollow = useCallback(async () => {
    if (!user) {
      toast.error(t('toast.pleaseSignInToFollow'));
      return;
    }

    if (!authorId) {
      return;
    }

    setLoading(true);
    const next = !isFollowing;
    setIsFollowing(next);

    try {
      if (next) {
        // Get current article count for this author
        // We'll need to fetch articles and count them
        // For now, set to 0 and update when articles are loaded
        const { error } = await (supabase.from('author_follows' as any).insert({
          user_id: user.id,
          author_id: authorId,
          last_article_count: 0,
        }) as any);
        if (error) throw error;
        toast.success(t('toast.followingAuthor', 'Following author'));
      } else {
        const { error } = await (supabase
          .from('author_follows' as any)
          .delete()
          .eq('user_id', user.id)
          .eq('author_id', authorId) as any);
        if (error) throw error;
        toast.success(t('toast.unfollowedAuthor', 'Unfollowed author'));
      }
    } catch (error: any) {
      setIsFollowing(!next);
      toast.error(error.message || t('errors.failedToUpdate'));
    } finally {
      setLoading(false);
    }
  }, [user, authorId, isFollowing, t]);

  return { isFollowing, loading, toggleFollow };
}

