import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { MarketData } from '@/lib/api/types';
import { fetchMarketData } from '@/lib/api/market';

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

      // #region agent log: useMarketData fetch start
      fetch('http://127.0.0.1:7242/ingest/2b7bddaf-b9c1-43fe-9326-50f777bf1a54', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: 'debug-session',
          runId: 'pre-fix',
          hypothesisId: 'H1',
          location: 'useMarketData.ts:fetchData:start',
          message: 'fetchData called',
          data: { type },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion agent log
      
      if (type === 'crypto') {
        const { data: responseData, error: fetchError } = await supabase.functions.invoke('fetch-crypto');
        
        if (fetchError) throw fetchError;

        // #region agent log: useMarketData crypto response
        fetch('http://127.0.0.1:7242/ingest/2b7bddaf-b9c1-43fe-9326-50f777bf1a54', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: 'debug-session',
            runId: 'pre-fix',
            hypothesisId: 'H2',
            location: 'useMarketData.ts:fetchData:crypto-response',
            message: 'fetch-crypto response received',
            data: {
              hasData: Boolean(responseData?.data),
              length: responseData?.data?.length ?? 0,
            },
            timestamp: Date.now(),
          }),
        }).catch(() => {});
        // #endregion agent log

        if (responseData?.data && responseData.data.length > 0) {
          setData(responseData.data);
          setLastUpdated(new Date(responseData.timestamp));
        } else {
          // Fallback to local mock data so UI is not empty
          const fallback = await fetchMarketData('crypto');

          // #region agent log: useMarketData crypto fallback
          fetch('http://127.0.0.1:7242/ingest/2b7bddaf-b9c1-43fe-9326-50f777bf1a54', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sessionId: 'debug-session',
              runId: 'pre-fix',
              hypothesisId: 'H3',
              location: 'useMarketData.ts:fetchData:crypto-fallback',
              message: 'using fallback crypto data',
              data: { length: fallback.length },
              timestamp: Date.now(),
            }),
          }).catch(() => {});
          // #endregion agent log

          setData(fallback);
          setLastUpdated(new Date());
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

      // #region agent log: useMarketData error
      fetch('http://127.0.0.1:7242/ingest/2b7bddaf-b9c1-43fe-9326-50f777bf1a54', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: 'debug-session',
          runId: 'pre-fix',
          hypothesisId: 'H4',
          location: 'useMarketData.ts:fetchData:error',
          message: 'fetchData error',
          data: { type, error: err instanceof Error ? err.message : String(err) },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion agent log

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
