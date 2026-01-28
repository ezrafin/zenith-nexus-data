import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { logger } from '@/lib/logger';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';

type MarketType = 'indices' | 'stocks' | 'crypto' | 'commodities' | 'currencies';

interface Watchlist {
  id: string;
  name: string;
}

interface UseWatchlistsReturn {
  watchlists: Watchlist[];
  loading: boolean;
  isInWatchlist: (symbol: string, marketType: MarketType) => boolean;
  addToWatchlist: (watchlistId: string, params: { symbol: string; marketType: MarketType }) => Promise<void>;
}

export function useWatchlists(): UseWatchlistsReturn {
  const { user } = useUser();
  const { t } = useTranslation({ namespace: 'ui' });
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const [loading, setLoading] = useState(false);
  const [itemsIndex, setItemsIndex] = useState<Set<string>>(new Set());

  const buildKey = (symbol: string, marketType: MarketType) => `${marketType}:${symbol}`;

  useEffect(() => {
    const load = async () => {
      if (!user) {
        setWatchlists([]);
        setItemsIndex(new Set());
        return;
      }

      setLoading(true);
      try {
        const { data: watchlistsData, error: watchlistsError } = await (supabase
          .from('watchlists' as any)
          .select('id, name')
          .eq('user_id', user.id)
          .order('is_default', { ascending: false }) as any);

        if (watchlistsError) throw watchlistsError;
        const lists = (watchlistsData || []) as Watchlist[];
        setWatchlists(lists);

        if (lists.length === 0) {
          setItemsIndex(new Set());
          return;
        }

        const watchlistIds = lists.map((w) => w.id);
        const { data: itemsData, error: itemsError } = await (supabase
          .from('watchlist_items' as any)
          .select('watchlist_id, symbol, market_type')
          .in('watchlist_id', watchlistIds) as any);

        if (itemsError) throw itemsError;

        const index = new Set<string>();
        (itemsData || []).forEach((item: any) => {
          if (item.symbol && item.market_type) {
            index.add(buildKey(item.symbol, item.market_type as MarketType));
          }
        });
        setItemsIndex(index);
      } catch (error) {
        logger.error('Error loading watchlists:', error);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [user]);

  const isInWatchlist = useCallback(
    (symbol: string, marketType: MarketType) => {
      if (!user) return false;
      return itemsIndex.has(buildKey(symbol, marketType));
    },
    [itemsIndex, user],
  );

  const addToWatchlist = useCallback(
    async (watchlistId: string, params: { symbol: string; marketType: MarketType }) => {
      const { symbol, marketType } = params;

      if (!user) {
        toast.error(t('toast.pleaseSignInToWatchlist'));
        return;
      }

      const key = buildKey(symbol, marketType);

      // Optimistic update
      setItemsIndex((prev) => new Set(prev).add(key));

      try {
        const { error } = await (supabase.from('watchlist_items' as any).insert({
          watchlist_id: watchlistId,
          symbol,
          market_type: marketType,
        }) as any);

        if (error) {
          // Revert optimistic update on error
          setItemsIndex((prev) => {
            const next = new Set(prev);
            next.delete(key);
            return next;
          });

          if ((error as any).code === '23505') {
            toast.error(t('toast.alreadyInWatchlist'));
          } else {
            toast.error(t('toast.failedToAddToWatchlist'));
          }
          return;
        }

        toast.success(t('toast.addedToWatchlist'));
      } catch (error) {
        logger.error('Error adding to watchlist:', error);
        toast.error(t('toast.failedToAddToWatchlist'));
        // Revert optimistic update
        setItemsIndex((prev) => {
          const next = new Set(prev);
          next.delete(key);
          return next;
        });
      }
    },
    [t, user],
  );

  return {
    watchlists,
    loading,
    isInWatchlist,
    addToWatchlist,
  };
}


