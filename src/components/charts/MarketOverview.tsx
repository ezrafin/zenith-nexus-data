import { useAllMarkets } from '@/hooks/useAllMarkets';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { MarketData } from '@/lib/api/types';
import { useTranslation } from '@/hooks/useTranslation';

// Get the top gainer from a market dataset
const getTopGainer = (data: MarketData[] | undefined): MarketData | null => {
  if (!data || data.length === 0) return null;
  const gainers = data.filter(item => item.changePercent > 0);
  if (gainers.length === 0) return null;
  return gainers.sort((a, b) => b.changePercent - a.changePercent)[0];
};

// Get the top loser from a market dataset
const getTopLoser = (data: MarketData[] | undefined): MarketData | null => {
  if (!data || data.length === 0) return null;
  const losers = data.filter(item => item.changePercent < 0);
  if (losers.length === 0) return null;
  return losers.sort((a, b) => a.changePercent - b.changePercent)[0];
};

// Map market type to URL segment
const getMarketUrl = (item: MarketData, marketType: string): string => {
  return `/markets/${marketType}`;
};

interface MarketItemProps {
  item: MarketData;
  marketType: string;
  isGainer: boolean;
}

function MarketItem({ item, marketType, isGainer }: MarketItemProps) {
  return (
    <Link
      to={getMarketUrl(item, marketType)}
      className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 transition-colors"
    >
      <div className="flex items-center gap-2">
        <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-secondary/50 text-muted-foreground">
          {marketType}
        </span>
        <div>
          <div className="font-medium text-sm">{item.symbol}</div>
          <div className="text-xs text-muted-foreground truncate max-w-[120px]">{item.name}</div>
        </div>
      </div>
      <div className="text-right">
        <div className={`font-semibold text-sm ${isGainer ? 'text-green-500' : 'text-red-500'}`}>
          {isGainer ? '+' : ''}{item.changePercent.toFixed(2)}%
        </div>
        <div className="text-xs text-muted-foreground">${item.price.toFixed(2)}</div>
      </div>
    </Link>
  );
}

export function MarketOverview() {
  const { t } = useTranslation({ namespace: 'ui' });
  const { indices, stocks, crypto, commodities, currencies } = useAllMarkets();

  // Get top gainer from each market type
  const topGainers = [
    { item: getTopGainer(indices.data), type: 'indices' },
    { item: getTopGainer(stocks.data), type: 'stocks' },
    { item: getTopGainer(crypto.data), type: 'crypto' },
    { item: getTopGainer(commodities.data), type: 'commodities' },
    { item: getTopGainer(currencies.data), type: 'currencies' },
  ].filter((entry): entry is { item: MarketData; type: string } => entry.item !== null);

  // Get top loser from each market type
  const topLosers = [
    { item: getTopLoser(indices.data), type: 'indices' },
    { item: getTopLoser(stocks.data), type: 'stocks' },
    { item: getTopLoser(crypto.data), type: 'crypto' },
    { item: getTopLoser(commodities.data), type: 'commodities' },
    { item: getTopLoser(currencies.data), type: 'currencies' },
  ].filter((entry): entry is { item: MarketData; type: string } => entry.item !== null);

  const isDemo = indices.isDemo || stocks.isDemo || crypto.isDemo || commodities.isDemo || currencies.isDemo;

  return (
    <div className="premium-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-semibold text-lg">{t('marketOverview.title')}</h2>
        {isDemo && (
          <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400">
            {t('marketOverview.demoData')}
          </span>
        )}
      </div>

      {/* Summary Stats - Only Gainers and Losers */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-4 rounded-lg bg-green-500/10">
          <div className="text-2xl font-bold text-green-500">{topGainers.length}</div>
          <div className="text-xs text-muted-foreground">{t('marketOverview.gainers')}</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-red-500/10">
          <div className="text-2xl font-bold text-red-500">{topLosers.length}</div>
          <div className="text-xs text-muted-foreground">{t('marketOverview.losers')}</div>
        </div>
      </div>

      {/* Top Gainers - 1 from each market */}
      <div className="mb-6">
        <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-green-500" />
          {t('marketOverview.topGainers')}
        </h3>
        <div className="space-y-2">
          {topGainers.map(({ item, type }) => (
            <MarketItem key={`${type}-${item.symbol}`} item={item} marketType={type} isGainer={true} />
          ))}
          {topGainers.length === 0 && (
            <div className="text-sm text-muted-foreground text-center py-2">{t('marketOverview.noGainersToday')}</div>
          )}
        </div>
      </div>

      {/* Top Losers - 1 from each market */}
      <div>
        <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
          <TrendingDown className="h-4 w-4 text-red-500" />
          {t('marketOverview.topLosers')}
        </h3>
        <div className="space-y-2">
          {topLosers.map(({ item, type }) => (
            <MarketItem key={`${type}-${item.symbol}`} item={item} marketType={type} isGainer={false} />
          ))}
          {topLosers.length === 0 && (
            <div className="text-sm text-muted-foreground text-center py-2">{t('marketOverview.noLosersToday')}</div>
          )}
        </div>
      </div>
    </div>
  );
}
