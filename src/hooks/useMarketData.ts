import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { MarketData } from '@/lib/api/types';

interface UseMarketDataOptions {
  type: 'crypto' | 'stocks' | 'indices' | 'commodities' | 'currencies';
  refreshInterval?: number; // in milliseconds
}

interface UseMarketDataReturn {
  data: MarketData[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refresh: () => Promise<void>;
}

export function useMarketData({ type, refreshInterval = 60000 }: UseMarketDataOptions): UseMarketDataReturn {
  const [data, setData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      
      if (type === 'crypto') {
        const { data: responseData, error: fetchError } = await supabase.functions.invoke('fetch-crypto');
        
        if (fetchError) throw fetchError;
        if (responseData?.data) {
          setData(responseData.data);
          setLastUpdated(new Date(responseData.timestamp));
        }
      } else {
        // For non-crypto types (indices, stocks, commodities, currencies), use fetch-stocks with type parameter
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
          setData(result.data);
          setLastUpdated(new Date(result.timestamp));
        } else if (result?.error) {
          throw new Error(result.error);
        }
      }
    } catch (err) {
      console.error(`Error fetching ${type} data:`, err);
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    fetchData();
    
    // Set up auto-refresh
    const interval = setInterval(fetchData, refreshInterval);
    
    return () => clearInterval(interval);
  }, [fetchData, refreshInterval]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refresh: fetchData,
  };
}
