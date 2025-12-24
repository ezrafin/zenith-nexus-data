import { useState, useMemo, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { MarketTable } from '@/components/MarketTable';

import { SkeletonTable } from '@/components/ui/skeleton-card';
import { LastUpdated } from '@/components/LastUpdated';
import { useMarketDataQuery } from '@/hooks/useMarketDataQuery';
import { cn } from '@/lib/utils';
import { AlertCircle, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/hooks/useTranslation';
import { usePageBillCollection } from '@/hooks/usePageBillCollection';

type MarketType = 'indices' | 'stocks' | 'commodities' | 'crypto' | 'currencies';

export default function MarketsPage() {
  const { type } = useParams<{ type: MarketType }>();
  const marketType = (type as MarketType) || 'indices';
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation({ namespace: 'ui' });
  
  const marketInfo: Record<MarketType, { title: string; description: string; showVolume: boolean }> = useMemo(
    () => ({
      indices: {
        title: t('marketsPage.indicesTitle'),
        description: t('marketsPage.indicesDescription'),
        showVolume: false,
      },
      stocks: {
        title: t('marketsPage.stocksTitle'),
        description: t('marketsPage.stocksDescription'),
        showVolume: true,
      },
      commodities: {
        title: t('marketsPage.commoditiesTitle'),
        description: t('marketsPage.commoditiesDescription'),
        showVolume: false,
      },
      crypto: {
        title: t('marketsPage.cryptoTitle'),
        description: t('marketsPage.cryptoDescription'),
        showVolume: true,
      },
      currencies: {
        title: t('marketsPage.currenciesTitle'),
        description: t('marketsPage.currenciesDescription'),
        showVolume: false,
      },
    }),
    [t]
  );

  const marketTabs: { type: MarketType; label: string }[] = useMemo(
    () => [
      { type: 'indices', label: t('marketsPage.indicesTitle') },
      { type: 'stocks', label: t('marketsPage.stocksTitle') },
      { type: 'commodities', label: t('marketsPage.commoditiesTitle') },
      { type: 'crypto', label: t('marketsPage.cryptoTitle') },
      { type: 'currencies', label: t('marketsPage.currenciesTitle') },
    ],
    [t]
  );

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

  // Memoize market cap calculation function
  const getMarketCap = useCallback((item: typeof data[0]) => {
    if (item.volume) {
      const volumeNum = parseFloat(item.volume.replace(/[^0-9.]/g, ''));
      return item.price * volumeNum;
    }
    return item.price;
  }, []);

  // Combine current market data with search results from other markets
  const allAssets = useMemo(() => {
    if (!shouldLoadAll) return [];
    // For search, we only use current market data - no extra API calls
    return data.map(item => ({ ...item, marketType }));
  }, [shouldLoadAll, data, marketType]);

  // Get top 20 by market cap (default view) - memoize with pre-computed market caps
  const top50Data = useMemo(() => {
    if (data.length === 0) return [];
    
    // Pre-compute market caps to avoid recalculating during sort
    const dataWithMarketCap = data.map(item => ({
      ...item,
      marketCap: getMarketCap(item),
    }));
    
    const sorted = dataWithMarketCap.sort((a, b) => b.marketCap - a.marketCap);
    return sorted.slice(0, 20);
  }, [data, getMarketCap]);

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
          <div className="mb-6 border-b border-border pb-4">
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 sm:flex-wrap sm:overflow-visible">
              {marketTabs.map((tab) => (
                <Link
                  key={tab.type}
                  to={`/markets/${tab.type}`}
                  className={cn(
                    'px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap',
                    marketType === tab.type
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  )}
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Search Filter */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('marketsPage.searchPlaceholder')}
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
                  ? t('marketsPage.searchResults', {
                      count: filteredData.length,
                      label: filteredData.length === 1 ? t('marketsPage.searchResultOne') : t('marketsPage.searchResultMany'),
                      query: searchQuery,
                    })
                  : t('marketsPage.searchNoResults', { query: searchQuery })
                }
              </p>
            )}
            {!searchQuery && (
              <p className="mt-2 text-sm text-muted-foreground">
                {t('marketsPage.showingTop')}
              </p>
            )}
          </div>

          {/* Error State */}
          {error && (
              <div className="mb-6 p-4 rounded-lg border border-destructive/50 bg-destructive/10 flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <div>
                  <p className="text-sm font-medium text-destructive">{t('marketsPage.loadErrorTitle')}</p>
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
                  // Remove marketType if it exists (added for search)
                  const { marketType: _, marketCap: __, ...rest } = item;
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
