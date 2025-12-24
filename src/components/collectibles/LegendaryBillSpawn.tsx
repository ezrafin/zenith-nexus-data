import { useEffect, useState } from 'react';
import { useCollectibleBills } from '@/hooks/useCollectibleBills';
import { BillVisual } from './BillVisual';
import { useLocation } from 'react-router-dom';
import { showBillCollectionToast } from './BillCollectionToast';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';

interface LegendaryBillSpawnProps {
  articleId: string;
  articleType: 'news' | 'analytics' | 'basic_article' | 'advanced_article';
}

export function LegendaryBillSpawn({ articleId, articleType }: LegendaryBillSpawnProps) {
  const { checkLegendarySpawn, collectBill, progress, hasAllRegularBills, legendarySpawn } = useCollectibleBills();
  const { user } = useUser();
  const location = useLocation();
  const [shouldShow, setShouldShow] = useState(false);

  // Check if spawn should be assigned to this article if it's pending
  useEffect(() => {
    const assignPendingSpawn = async () => {
      if (!user || !hasAllRegularBills) return;

      // Check if there's a pending spawn
      const { data: spawn } = await supabase
        .from('user_legendary_spawns')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (spawn && spawn.article_id === 'pending' && !spawn.collected_at) {
        // Assign this article as the spawn location
        await supabase
          .from('user_legendary_spawns')
          .update({ article_id: articleId, article_type: articleType })
          .eq('user_id', user.id);
      }
    };

    assignPendingSpawn();
  }, [user, articleId, articleType, hasAllRegularBills]);

  useEffect(() => {
    const check = checkLegendarySpawn(articleId, articleType);
    setShouldShow(check);
  }, [checkLegendarySpawn, articleId, articleType, legendarySpawn]);

  if (!shouldShow) {
    return null;
  }

  const handleCollect = async () => {
    const response = await collectBill('legendary_hidden_treasure', {
      page: location.pathname,
      action: 'legendary_collect',
      metadata: {
        articleId,
        articleType,
      },
    });

    if (response.success && response.collected) {
      showBillCollectionToast(
        response.bill?.name || 'Hidden Treasure',
        'legendary',
        response.progress
      );
    }
  };

  // Random position on the page (but not too close to edges)
  const randomTop = Math.random() * 60 + 20; // 20% to 80% from top
  const randomRight = Math.random() * 15 + 5; // 5% to 20% from right

  return (
    <BillVisual
      billId="legendary_hidden_treasure"
      rarity="legendary"
      onCollect={handleCollect}
      size="lg"
      position={{
        top: `${randomTop}%`,
        right: `${randomRight}%`,
      }}
    />
  );
}

