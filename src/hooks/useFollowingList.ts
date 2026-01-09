import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';

export function useFollowingList() {
  const { user } = useUser();
  const [followingIds, setFollowingIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFollowing = useCallback(async () => {
    if (!user) {
      setFollowingIds([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_follows' as any)
        .select('following_id')
        .eq('follower_id', user.id);

      if (error) throw error;

      setFollowingIds(data?.map(item => item.following_id) || []);
    } catch (error) {
      console.error('Error loading following list:', error);
      setFollowingIds([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadFollowing();
  }, [loadFollowing]);

  return { followingIds, loading, refetch: loadFollowing };
}

