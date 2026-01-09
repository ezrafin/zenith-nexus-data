import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { toast } from 'sonner';
import { useCollectibleBills } from './useCollectibleBills';
import { useTranslation } from '@/hooks/useTranslation';

export function useUserFollow(targetUserId?: string) {
  const { user } = useUser();
  const { t } = useTranslation({ namespace: 'ui' });
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { collectBill } = useCollectibleBills();

  useEffect(() => {
    const loadStatus = async () => {
      if (!user || !targetUserId || user.id === targetUserId) return;

      const { data, error } = await supabase
        .from('user_follows' as any)
        .select('id')
        .eq('follower_id', user.id)
        .eq('following_id', targetUserId)
        .maybeSingle();

      if (error) {
        console.error('Error loading follow status:', error);
        return;
      }

      setIsFollowing(!!data);
    };

    loadStatus();
  }, [user, targetUserId]);

  const toggleFollow = useCallback(async () => {
    if (!user) {
      toast.error(t('toast.pleaseSignInToFollow'));
      return;
    }

    if (!targetUserId || user.id === targetUserId) {
      return;
    }

    setLoading(true);
    const next = !isFollowing;
    setIsFollowing(next);

    try {
      if (next) {
        const { error } = await supabase.from('user_follows' as any).insert({
          follower_id: user.id,
          following_id: targetUserId,
        });
        if (error) throw error;
        toast.success(t('toast.followingUser'));
        
        // Trigger bill collection for following user
        await collectBill('user_follow', {
          action: 'follow_user',
          metadata: { targetUserId },
        });
      } else {
        const { error } = await supabase
          .from('user_follows' as any)
          .delete()
          .eq('follower_id', user.id)
          .eq('following_id', targetUserId);
        if (error) throw error;
        toast.success(t('toast.unfollowedUser'));
      }
    } catch (error: any) {
      setIsFollowing(!next);
      toast.error(error.message || t('errors.failedToUpdate'));
    } finally {
      setLoading(false);
    }
  }, [user, targetUserId, isFollowing, t, collectBill]);

  return { isFollowing, loading, toggleFollow };
}


