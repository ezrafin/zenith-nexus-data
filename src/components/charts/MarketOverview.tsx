import { useMarketData } from '@/hooks/useMarketData';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export function MarketOverview() {
  const { data: indices } = useMarketData({ type: 'indices', refreshInterval: 60000 });
  const { data: stocks } = useMarketData({ type: 'stocks', refreshInterval: 60000 });
  const { data: crypto } = useMarketData({ type: 'crypto', refreshInterval: 120000 });

  const topGainers = [...(stocks || []), ...(crypto || [])]
    .filter((item) => item.changePercent > 0)
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 5);

  const topLosers = [...(stocks || []), ...(crypto || [])]
    .filter((item) => item.changePercent < 0)
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, 5);

  const marketSummary = {
    totalMarkets: (indices?.length || 0) + (stocks?.length || 0) + (crypto?.length || 0),
    gainers: topGainers.length,
    losers: topLosers.length,
    avgChange: indices && indices.length > 0
      ? indices.reduce((sum, item) => sum + item.changePercent, 0) / indices.length
      : 0,
  };

  return (
    <div className="premium-card p-6">
      <h2 className="font-heading font-semibold text-lg mb-6">Market Overview</h2>

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

