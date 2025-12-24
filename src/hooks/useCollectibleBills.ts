import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';

interface Bill {
  id: string;
  name: string;
  rarity: 'regular' | 'legendary';
}

interface CollectionProgress {
  collected: number;
  total: number;
}

interface LegendarySpawn {
  articleId: string;
  articleType: 'news' | 'analytics' | 'basic_article' | 'advanced_article';
  articleUrl: string;
}

interface CollectBillContext {
  page?: string;
  action?: string;
  metadata?: Record<string, any>;
}

interface CollectBillResponse {
  success: boolean;
  collected: boolean;
  bill?: Bill;
  progress?: CollectionProgress;
  legendarySpawn?: LegendarySpawn;
  error?: string;
}

export function useCollectibleBills() {
  const { user } = useUser();
  const [collectedBills, setCollectedBills] = useState<string[]>([]);
  const [progress, setProgress] = useState<CollectionProgress>({ collected: 0, total: 31 });
  const [legendarySpawn, setLegendarySpawn] = useState<LegendarySpawn | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user's collected bills and progress
  const loadCollectionData = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setError(null);

      // Load collected bills
      const { data: collectedData, error: collectedError } = await supabase
        .from('user_collected_bills')
        .select('bill_id')
        .eq('user_id', user.id);

      if (collectedError) throw collectedError;

      const billIds = collectedData?.map(item => item.bill_id) || [];
      setCollectedBills(billIds);

      // Calculate progress
      const collectedCount = billIds.length;
      setProgress({
        collected: collectedCount,
        total: 31, // 30 regular + 1 legendary
      });

      // Load legendary spawn if exists
      const { data: spawnData, error: spawnError } = await supabase
        .from('user_legendary_spawns')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (!spawnError && spawnData) {
        let articleUrl = '';
        switch (spawnData.article_type) {
          case 'news':
            articleUrl = `/news/${spawnData.article_id}`;
            break;
          case 'analytics':
            articleUrl = `/analytics/${spawnData.article_id}`;
            break;
          case 'basic_article':
            articleUrl = `/learning/basics/${spawnData.article_id}`;
            break;
          case 'advanced_article':
            articleUrl = `/learning/advanced/${spawnData.article_id}`;
            break;
        }

        setLegendarySpawn({
          articleId: spawnData.article_id,
          articleType: spawnData.article_type,
          articleUrl,
        });
      } else {
        setLegendarySpawn(null);
      }
    } catch (err) {
      console.error('Error loading collection data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load collection data');
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Load on mount and when user changes
  useEffect(() => {
    loadCollectionData();
  }, [loadCollectionData]);

  // Attempt to collect a bill
  const collectBill = useCallback(async (
    billId: string,
    context?: CollectBillContext
  ): Promise<CollectBillResponse> => {
    if (!user) {
      return {
        success: false,
        collected: false,
        error: 'You must be signed in to collect bills',
      };
    }

    try {
      setError(null);

      // Get auth token
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        return {
          success: false,
          collected: false,
          error: 'Session expired. Please sign in again.',
        };
      }

      // Call Edge Function
      const { data, error: functionError } = await supabase.functions.invoke('collect-bill', {
        body: {
          billId,
          context,
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (functionError) throw functionError;

      const response = data as CollectBillResponse;

      if (response.success && response.collected) {
        // Update local state
        if (response.bill) {
          setCollectedBills(prev => [...prev, billId]);
        }
        if (response.progress) {
          setProgress(response.progress);
        }
        if (response.legendarySpawn) {
          setLegendarySpawn(response.legendarySpawn);
        }

        // Reload collection data to ensure consistency
        await loadCollectionData();
      }

      return response;
    } catch (err) {
      console.error('Error collecting bill:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to collect bill';
      setError(errorMessage);
      return {
        success: false,
        collected: false,
        error: errorMessage,
      };
    }
  }, [user, loadCollectionData]);

  // Check if bill is collected
  const isCollected = useCallback((billId: string): boolean => {
    return collectedBills.includes(billId);
  }, [collectedBills]);

  // Check if user has all regular bills
  const hasAllRegularBills = useCallback((): boolean => {
    // Count regular bills collected (excluding legendary)
    const regularBillsCollected = collectedBills.filter(billId => billId !== 'legendary_hidden_treasure').length;
    return regularBillsCollected >= 30;
  }, [collectedBills]);

  // Check if legendary bill should appear on current article
  const checkLegendarySpawn = useCallback((
    articleId: string,
    articleType: 'news' | 'analytics' | 'basic_article' | 'advanced_article'
  ): boolean => {
    if (!hasAllRegularBills()) return false;
    if (isCollected('legendary_hidden_treasure')) return false;
    if (!legendarySpawn) return false;

    return (
      legendarySpawn.articleId === articleId &&
      legendarySpawn.articleType === articleType
    );
  }, [hasAllRegularBills, isCollected, legendarySpawn]);

  return {
    collectBill,
    collectedBills,
    progress,
    legendarySpawn,
    hasAllRegularBills: hasAllRegularBills(),
    isCollected,
    checkLegendarySpawn,
    loading,
    error,
    refetch: loadCollectionData,
  };
}

