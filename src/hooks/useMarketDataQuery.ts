import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { MarketData } from '@/lib/api/types';
import { fetchMarketData } from '@/lib/api/market';

interface UseMarketDataQueryOptions {
  type: 'crypto' | 'stocks' | 'indices' | 'commodities' | 'currencies';
  refreshInterval?: number; // in milliseconds
  staleTime?: number; // in milliseconds, defaults to 30-60 seconds
}

interface UseMarketDataQueryReturn {
  data: MarketData[];
  isLoading: boolean;
  error: Error | null;
  lastUpdated: Date | null;
  isDemo: boolean;
  refetch: () => void;
}

interface CachedMarketData {
  data: MarketData[];
  timestamp: string;
  isDemo: boolean;
  cachedAt: number;
}

const CACHE_KEY_PREFIX = 'market_data_cache_';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Get cached data from localStorage
function getCachedData(type: string): CachedMarketData | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY_PREFIX + type);
    if (!cached) return null;
    
    const parsed: CachedMarketData = JSON.parse(cached);
    const now = Date.now();
    
    // Return cached data if it's still fresh
    if (now - parsed.cachedAt < CACHE_DURATION) {
      return parsed;
    }
    
    // Return stale data (will be used as placeholder while fetching fresh data)
    return parsed;
  } catch {
    return null;
  }
}

// Save data to localStorage cache
function setCachedData(type: string, data: MarketData[], timestamp: string, isDemo: boolean): void {
  try {
    const cacheEntry: CachedMarketData = {
      data,
      timestamp,
      isDemo,
      cachedAt: Date.now(),
    };
    localStorage.setItem(CACHE_KEY_PREFIX + type, JSON.stringify(cacheEntry));
  } catch {
    // Ignore localStorage errors (e.g., quota exceeded)
  }
}

async function fetchMarketDataFromAPI(type: 'crypto' | 'stocks' | 'indices' | 'commodities' | 'currencies'): Promise<{ data: MarketData[]; timestamp: string; isDemo: boolean }> {
  if (type === 'crypto') {
    const { data: responseData, error: fetchError } = await supabase.functions.invoke('fetch-crypto');
    
    if (fetchError) throw fetchError;

    if (responseData?.data && responseData.data.length > 0) {
      const result = {
        data: responseData.data,
        timestamp: responseData.timestamp,
        isDemo: false,
      };
      setCachedData(type, result.data, result.timestamp, result.isDemo);
      return result;
    } else {
      // Fallback to local mock data
      const fallback = await fetchMarketData('crypto');
      const result = {
        data: fallback,
        timestamp: new Date().toISOString(),
        isDemo: true,
      };
      setCachedData(type, result.data, result.timestamp, result.isDemo);
      return result;
    }
  } else {
    // For non-crypto types, use fetch-stocks with type parameter
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase configuration missing');
    }
    
    const response = await fetch(
      `${supabaseUrl}/functions/v1/fetch-stocks?type=${type}`,
      {
        headers: {
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch ${type} data: ${response.status} ${errorText}`);
    }
    
    const result = await response.json();
    if (result?.data) {
      const data = {
        data: result.data,
        timestamp: result.timestamp,
        isDemo: false,
      };
      setCachedData(type, data.data, data.timestamp, data.isDemo);
      return data;
    } else if (result?.error) {
      throw new Error(result.error);
    }
    
    throw new Error(`No data returned for ${type}`);
  }
}

export function useMarketDataQuery({ 
  type, 
  refreshInterval = 120000,
  staleTime = 30000, // 30 seconds default, align with server cache
}: UseMarketDataQueryOptions): UseMarketDataQueryReturn {
  // Get initial cached data for immediate display
  const cachedData = getCachedData(type);
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['marketData', type],
    queryFn: async () => {
      const result = await fetchMarketDataFromAPI(type);
      return result;
    },
    staleTime,
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: refreshInterval,
    refetchIntervalInBackground: true,
    // Use cached data as initial data for instant display
    initialData: cachedData ? {
      data: cachedData.data,
      timestamp: cachedData.timestamp,
      isDemo: cachedData.isDemo,
    } : undefined,
    // Don't show loading state if we have cached data
    placeholderData: cachedData ? {
      data: cachedData.data,
      timestamp: cachedData.timestamp,
      isDemo: cachedData.isDemo,
    } : undefined,
  });

  return {
    data: data?.data || [],
    isLoading: isLoading && !cachedData, // Only show loading if no cached data
    error: error as Error | null,
    lastUpdated: data ? new Date(data.timestamp) : null,
    isDemo: data?.isDemo || false,
    refetch: () => {
      void refetch();
    },
  };
}
