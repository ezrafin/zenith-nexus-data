import { Link, useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { MarketTable } from '@/components/MarketTable';
import { SimpleChart } from '@/components/SimpleChart';
import { SkeletonTable } from '@/components/ui/skeleton-card';
import { LastUpdated } from '@/components/LastUpdated';
import { useMarketData } from '@/hooks/useMarketData';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

type MarketType = 'indices' | 'stocks' | 'commodities' | 'crypto' | 'currencies';

const marketInfo: Record<MarketType, { title: string; description: string; showVolume: boolean }> = {
  indices: {
    title: 'Indices',
    description: 'Leading global stock indices in real-time',
    showVolume: false,
  },
  stocks: {
    title: 'Stocks',
    description: 'Stock quotes from major companies',
    showVolume: true,
  },
  commodities: {
    title: 'Commodities',
    description: 'Prices for gold, oil, silver, and other commodities',
    showVolume: false,
  },
  crypto: {
    title: 'Cryptocurrencies',
    description: 'Leading cryptocurrency quotes',
    showVolume: true,
  },
  currencies: {
    title: 'Currencies',
    description: 'Major currency pair rates',
    showVolume: false,
  },
};

const marketTabs: { type: MarketType; label: string }[] = [
  { type: 'indices', label: 'Indices' },
  { type: 'stocks', label: 'Stocks' },
  { type: 'commodities', label: 'Commodities' },
  { type: 'crypto', label: 'Crypto' },
  { type: 'currencies', label: 'Currencies' },
];

export default function MarketsPage() {
  const { type } = useParams<{ type: MarketType }>();
  const marketType = (type as MarketType) || 'indices';
  
  const { data, loading, error, lastUpdated, refresh } = useMarketData({
    type: marketType,
    refreshInterval: marketType === 'crypto' ? 120000 : 60000,
  });

  const info = marketInfo[marketType] || marketInfo.indices;
  const isPositive = data.length > 0 && data[0].changePercent >= 0;

  return (
    <Layout>
      <section className="section-spacing">
        <div className="container-wide">
          <div className="mb-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <h1 className="heading-lg">{info.title}</h1>
              <LastUpdated timestamp={lastUpdated} onRefresh={refresh} loading={loading} />
            </div>
            <p className="body-md max-w-2xl">{info.description}</p>
          </div>

          {/* Market Tabs */}
          <div className="flex flex-wrap gap-2 mb-10 border-b border-border pb-4">
            {marketTabs.map((tab) => (
              <Link
                key={tab.type}
                to={`/markets/${tab.type}`}
                className={cn(
                  'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                  marketType === tab.type
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                )}
              >
                {tab.label}
              </Link>
            ))}
          </div>

          {/* Error State */}
          {error && (
            <div className="mb-6 p-4 rounded-lg border border-destructive/50 bg-destructive/10 flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <div>
                <p className="text-sm font-medium text-destructive">Failed to load data</p>
                <p className="text-xs text-muted-foreground">{error}</p>
              </div>
            </div>
          )}

          {/* Chart */}
          <div className="p-6 rounded-lg border border-border bg-card mb-10">
            <h3 className="font-heading font-semibold mb-4">Market Overview</h3>
            <SimpleChart positive={isPositive} />
          </div>

          {/* Market Table */}
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            {loading && data.length === 0 ? (
              <div className="p-6">
                <SkeletonTable rows={10} />
              </div>
            ) : (
              <MarketTable data={data} showVolume={info.showVolume} marketType={marketType} />
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
