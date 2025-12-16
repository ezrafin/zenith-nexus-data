import { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { MarketTable } from '@/components/MarketTable';

import { SkeletonTable } from '@/components/ui/skeleton-card';
import { LastUpdated } from '@/components/LastUpdated';
import { useMarketDataQuery } from '@/hooks/useMarketDataQuery';
import { cn } from '@/lib/utils';
import { AlertCircle, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

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
  const [searchQuery, setSearchQuery] = useState('');
  
  // Load current market type data
  const { data, isLoading: loading, error, lastUpdated, refetch } = useMarketDataQuery({
    type: marketType,
    refreshInterval: 120000,
  });
  
  const refresh = async () => {
    refetch();
  };

  // Only load additional market data when search is active and has 2+ characters
  const shouldLoadAll = searchQuery.trim().length >= 2;

  const info = marketInfo[marketType] || marketInfo.indices;

  // Combine current market data with search results from other markets
  const allAssets = useMemo(() => {
    if (!shouldLoadAll) return [];
    // For search, we only use current market data - no extra API calls
    return data.map(item => ({ ...item, marketType }));
  }, [shouldLoadAll, data, marketType]);

  // Calculate market cap (price * volume if available, otherwise use price)
  const getMarketCap = (item: typeof data[0]) => {
    if (item.volume) {
      const volumeNum = parseFloat(item.volume.replace(/[^0-9.]/g, ''));
      return item.price * volumeNum;
    }
    return item.price;
  };

  // Get top 20 by market cap (default view)
  const top50Data = useMemo(() => {
    const sorted = [...data].sort((a, b) => getMarketCap(b) - getMarketCap(a));
    return sorted.slice(0, 20);
  }, [data]);

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!searchQuery.trim() || allAssets.length === 0) {
      return [];
    }

    const query = searchQuery.toLowerCase().trim();
    return allAssets
      .filter(item => 
        item.symbol.toLowerCase().startsWith(query) || 
        item.name.toLowerCase().startsWith(query)
      )
      .slice(0, 100); // Limit search results to 100
  }, [searchQuery, allAssets]);

  // Display data: search results if searching, otherwise top 50
  const displayData = searchQuery.trim() && filteredData.length > 0 
    ? filteredData 
    : top50Data;

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
          <div className="flex flex-wrap gap-2 mb-6 border-b border-border pb-4">
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

          {/* Search Filter */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by symbol or name (e.g., AAPL, Bitcoin)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="mt-2 text-sm text-muted-foreground">
                {filteredData.length > 0 
                  ? `Found ${filteredData.length} ${filteredData.length === 1 ? 'asset' : 'assets'} matching "${searchQuery}"`
                  : `No assets found matching "${searchQuery}"`
                }
              </p>
            )}
            {!searchQuery && (
              <p className="mt-2 text-sm text-muted-foreground">
                Showing top 20 assets by market capitalization
              </p>
            )}
          </div>

          {/* Error State */}
          {error && (
            <div className="mb-6 p-4 rounded-lg border border-destructive/50 bg-destructive/10 flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <div>
                <p className="text-sm font-medium text-destructive">Failed to load data</p>
                <p className="text-xs text-muted-foreground">{error?.message || String(error)}</p>
              </div>
            </div>
          )}

          {/* Market Table */}
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            {loading && data.length === 0 ? (
              <div className="p-6">
                <SkeletonTable rows={10} />
              </div>
            ) : (
              <MarketTable 
                data={displayData.map((item) => {
                  const { marketType: _, ...rest } = item as any;
                  return rest;
                })} 
                showVolume={info.showVolume} 
                marketType={marketType} 
              />
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
