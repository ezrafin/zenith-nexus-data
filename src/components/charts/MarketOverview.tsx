import { useMarketData } from '@/hooks/useMarketData';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import type { MarketData } from '@/lib/api/types';

const getMarketCap = (item: MarketData) => {
  if (item.volume) {
    const volumeNum = parseFloat(String(item.volume).replace(/[^0-9.]/g, ''));
    return item.price * (isNaN(volumeNum) ? 1 : volumeNum);
  }
  return item.price;
};

const topByMarketCap = (list?: MarketData[], limit = 20): MarketData[] =>
  (list ? [...list] : []).sort((a, b) => getMarketCap(b) - getMarketCap(a)).slice(0, limit);

export function MarketOverview() {
  const { data: indices } = useMarketData({ type: 'indices', refreshInterval: 60000 });
  const { data: stocks } = useMarketData({ type: 'stocks', refreshInterval: 60000 });
  const { data: crypto, isDemo: isCryptoDemo } = useMarketData({ type: 'crypto', refreshInterval: 120000 });

  const topIndices = topByMarketCap(indices, 20);
  const topStocks = topByMarketCap(stocks, 20);
  const topCrypto = topByMarketCap(crypto, 20);

  const topGainers = [...topStocks, ...topCrypto]
    .filter((item) => item.changePercent > 0)
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 5);

  const topLosers = [...topStocks, ...topCrypto]
    .filter((item) => item.changePercent < 0)
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, 5);

  const marketSummary = {
    totalMarkets: topIndices.length + topStocks.length + topCrypto.length,
    gainers: topGainers.length,
    losers: topLosers.length,
    avgChange: indices && indices.length > 0
      ? indices.reduce((sum, item) => sum + item.changePercent, 0) / indices.length
      : 0,
  };

  return (
    <div className="premium-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-semibold text-lg">Market Overview</h2>
        {isCryptoDemo && (
          <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400">
            Demo data
          </span>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 rounded-lg bg-secondary/30">
          <div className="text-2xl font-bold">{marketSummary.totalMarkets}</div>
          <div className="text-xs text-muted-foreground">Markets</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-green-500/10">
          <div className="text-2xl font-bold text-green-500">{marketSummary.gainers}</div>
          <div className="text-xs text-muted-foreground">Gainers</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-red-500/10">
          <div className="text-2xl font-bold text-red-500">{marketSummary.losers}</div>
          <div className="text-xs text-muted-foreground">Losers</div>
        </div>
      </div>

      {/* Top Gainers */}
      <div className="mb-6">
        <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-green-500" />
          Top Gainers
        </h3>
        <div className="space-y-2">
          {topGainers.map((item) => (
            <Link
              key={item.symbol}
              to={`/markets/${item.symbol}`}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <div>
                <div className="font-medium text-sm">{item.symbol}</div>
                <div className="text-xs text-muted-foreground">{item.name}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-sm text-green-500">
                  +{item.changePercent.toFixed(2)}%
                </div>
                <div className="text-xs text-muted-foreground">${item.price.toFixed(2)}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Top Losers */}
      <div>
        <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
          <TrendingDown className="h-4 w-4 text-red-500" />
          Top Losers
        </h3>
        <div className="space-y-2">
          {topLosers.map((item) => (
            <Link
              key={item.symbol}
              to={`/markets/${item.symbol}`}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <div>
                <div className="font-medium text-sm">{item.symbol}</div>
                <div className="text-xs text-muted-foreground">{item.name}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-sm text-red-500">
                  {item.changePercent.toFixed(2)}%
                </div>
                <div className="text-xs text-muted-foreground">${item.price.toFixed(2)}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

