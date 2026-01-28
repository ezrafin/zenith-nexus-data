import { Button } from '@/components/ui/button';
import { Star, Plus } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from '@/hooks/useTranslation';
import { useWatchlists } from '@/hooks/useWatchlists';

interface WatchlistButtonProps {
  symbol: string;
  marketType: 'indices' | 'stocks' | 'crypto' | 'commodities' | 'currencies';
}

export function WatchlistButton({ symbol, marketType }: WatchlistButtonProps) {
  const { user } = useUser();
  const { t } = useTranslation({ namespace: 'ui' });
  const { watchlists, loading, isInWatchlist, addToWatchlist } = useWatchlists();

  if (!user) {
    return null;
  }

  if (watchlists.length === 0) {
    return (
      <Button variant="outline" size="sm" disabled>
        <Star className="h-4 w-4 mr-2" />
        {t('watchlist.noWatchlists')}
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
          {isInWatchlist ? t('watchlist.inWatchlist') : t('watchlist.addToWatchlist')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t('watchlist.addToWatchlistLabel')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {watchlists.map((watchlist) => (
          <DropdownMenuItem
            key={watchlist.id}
            onClick={() => addToWatchlist(watchlist.id, { symbol, marketType })}
          >
            <Plus className="mr-2 h-4 w-4" />
            {watchlist.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
