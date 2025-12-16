import { useMarketDataQuery } from './useMarketDataQuery';

export function useAllMarkets() {
  const indices = useMarketDataQuery({ type: 'indices', refreshInterval: 120000, staleTime: 30000 });
  const stocks = useMarketDataQuery({ type: 'stocks', refreshInterval: 120000, staleTime: 30000 });
  const crypto = useMarketDataQuery({ type: 'crypto', refreshInterval: 120000, staleTime: 60000 });
  const commodities = useMarketDataQuery({ type: 'commodities', refreshInterval: 120000, staleTime: 30000 });
  const currencies = useMarketDataQuery({ type: 'currencies', refreshInterval: 120000, staleTime: 30000 });

  return {
    indices: {
      data: indices.data,
      loading: indices.isLoading,
      error: indices.error,
      lastUpdated: indices.lastUpdated,
      isDemo: indices.isDemo,
    },
    stocks: {
      data: stocks.data,
      loading: stocks.isLoading,
      error: stocks.error,
      lastUpdated: stocks.lastUpdated,
      isDemo: stocks.isDemo,
    },
    crypto: {
      data: crypto.data,
      loading: crypto.isLoading,
      error: crypto.error,
      lastUpdated: crypto.lastUpdated,
      isDemo: crypto.isDemo,
    },
    commodities: {
      data: commodities.data,
      loading: commodities.isLoading,
      error: commodities.error,
      lastUpdated: commodities.lastUpdated,
      isDemo: commodities.isDemo,
    },
    currencies: {
      data: currencies.data,
      loading: currencies.isLoading,
      error: currencies.error,
      lastUpdated: currencies.lastUpdated,
      isDemo: currencies.isDemo,
    },
    loading: indices.isLoading || stocks.isLoading || crypto.isLoading || commodities.isLoading || currencies.isLoading,
  };
}

