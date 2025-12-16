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

async function fetchMarketDataFromAPI(type: 'crypto' | 'stocks' | 'indices' | 'commodities' | 'currencies'): Promise<{ data: MarketData[]; timestamp: string; isDemo: boolean }> {
  if (type === 'crypto') {
    const { data: responseData, error: fetchError } = await supabase.functions.invoke('fetch-crypto');
    
    if (fetchError) throw fetchError;

    if (responseData?.data && responseData.data.length > 0) {
      return {
        data: responseData.data,
        timestamp: responseData.timestamp,
        isDemo: false,
      };
    } else {
      // Fallback to local mock data
      const fallback = await fetchMarketData('crypto');
      return {
        data: fallback,
        timestamp: new Date().toISOString(),
        isDemo: true,
      };
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
      return {
        data: result.data,
        timestamp: result.timestamp,
        isDemo: false,
      };
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
  const { data, isLoading, error, dataUpdatedAt, refetch } = useQuery({
    queryKey: ['marketData', type],
    queryFn: async () => {
      const result = await fetchMarketDataFromAPI(type);
      return result;
    },
    staleTime,
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: refreshInterval,
    refetchIntervalInBackground: true,
  });

  return {
    data: data?.data || [],
    isLoading,
    error: error as Error | null,
    lastUpdated: data ? new Date(data.timestamp) : null,
    isDemo: data?.isDemo || false,
    refetch: () => {
      void refetch();
    },
  };
}

