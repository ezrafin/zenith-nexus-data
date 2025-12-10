import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Star, Plus } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface WatchlistButtonProps {
  symbol: string;
  marketType: 'indices' | 'stocks' | 'crypto' | 'commodities' | 'currencies';
}

export function WatchlistButton({ symbol, marketType }: WatchlistButtonProps) {
  const { user } = useUser();
  const [watchlists, setWatchlists] = useState<Array<{ id: string; name: string }>>([]);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadWatchlists();
      checkIfInWatchlist();
    }
  }, [user, symbol, marketType]);

  const loadWatchlists = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('watchlists')
        .select('id, name')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false });

      if (error) throw error;
      setWatchlists(data || []);
    } catch (error) {
      console.error('Error loading watchlists:', error);
    }
  };

  const checkIfInWatchlist = async () => {
    if (!user) return;

    try {
      const { data: watchlistsData } = await supabase
        .from('watchlists')
        .select('id')
        .eq('user_id', user.id);

      if (!watchlistsData || watchlistsData.length === 0) {
        setIsInWatchlist(false);
        return;
      }

      const watchlistIds = watchlistsData.map((w) => w.id);

      const { data: itemsData } = await supabase
        .from('watchlist_items')
        .select('id')
        .in('watchlist_id', watchlistIds)
        .eq('symbol', symbol)
        .eq('market_type', marketType)
        .limit(1);

      setIsInWatchlist((itemsData?.length || 0) > 0);
    } catch (error) {
      console.error('Error checking watchlist:', error);
    }
  };

  const addToWatchlist = async (watchlistId: string) => {
    if (!user) {
      toast.error('Please sign in to add to watchlist');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from('watchlist_items').insert({
        watchlist_id: watchlistId,
        symbol,
        market_type: marketType,
      });

      if (error) throw error;

      toast.success('Added to watchlist');
      checkIfInWatchlist();
    } catch (error: any) {
      if (error.code === '23505') {
        toast.error('Already in watchlist');
      } else {
        toast.error('Failed to add to watchlist');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  if (watchlists.length === 0) {
    return (
      <Button variant="outline" size="sm" disabled>
        <Star className="h-4 w-4 mr-2" />
        Sign in to add
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={isInWatchlist ? 'default' : 'outline'}
          size="sm"
          disabled={loading}
        >
          <Star className={`h-4 w-4 mr-2 ${isInWatchlist ? 'fill-current' : ''}`} />
          {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Add to Watchlist</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {watchlists.map((watchlist) => (
          <DropdownMenuItem
            key={watchlist.id}
            onClick={() => addToWatchlist(watchlist.id)}
          >
            <Plus className="mr-2 h-4 w-4" />
            {watchlist.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

