import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { validateMarketData, hasMinimumData } from "../_shared/validation.ts";
import { retryWithBackoff } from "../_shared/retry.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CryptoSource {
  data: any[];
  source: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Fetching crypto data with multiple fallbacks...');
    
    let marketData: CryptoSource | null = null;
    let dataSource = 'unknown';

    // Fallback chain: CoinGecko -> Binance -> CoinCap -> Mock
    
    // 1. Try CoinGecko
    try {
      console.log('Attempting CoinGecko API...');
      marketData = await retryWithBackoff(async () => {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h',
          {
            headers: {
              'Accept': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`CoinGecko API error: ${response.status}`);
        }

        const data = await response.json();
        console.log(`Fetched ${data.length} crypto assets from CoinGecko`);

        const mapped = data.map((coin: any) => ({
          symbol: coin.symbol?.toUpperCase() || '',
          name: coin.name || '',
          price: coin.current_price || 0,
          change: coin.price_change_24h || 0,
          changePercent: coin.price_change_percentage_24h || 0,
          high: coin.high_24h || coin.current_price || 0,
          low: coin.low_24h || coin.current_price || 0,
          volume: formatVolume(coin.total_volume),
          marketCap: formatVolume(coin.market_cap),
          image: coin.image,
        }));

        const validated = validateMarketData(mapped);
        if (hasMinimumData(validated, 5)) {
          return { data: validated, source: 'coingecko' };
        }
        throw new Error('CoinGecko returned insufficient valid data');
      }, 3, 1000, 10000);

      if (marketData && hasMinimumData(marketData.data, 5)) {
        dataSource = marketData.source;
        console.log(`Successfully fetched ${marketData.data.length} valid items from CoinGecko`);
      } else {
        marketData = null;
      }
    } catch (apiError) {
      console.log('CoinGecko API failed:', apiError instanceof Error ? apiError.message : 'Unknown error');
      marketData = null;
    }

    // 2. Try Binance Public API (free, no key required)
    if (!marketData || !hasMinimumData(marketData.data, 5)) {
      try {
        console.log('Attempting Binance Public API...');
        marketData = await retryWithBackoff(async () => {
          const response = await fetch(
            'https://api.binance.com/api/v3/ticker/24hr',
            {
              headers: {
                'Accept': 'application/json',
              },
            }
          );

          if (!response.ok) {
            throw new Error(`Binance API error: ${response.status}`);
          }

          const data = await response.json();
          
          // Top 20 by volume
          const topSymbols = [
            'BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'XRPUSDT',
            'USDCUSDT', 'ADAUSDT', 'DOGEUSDT', 'TRXUSDT', 'AVAXUSDT',
            'LINKUSDT', 'DOTUSDT', 'MATICUSDT', 'SHIBUSDT', 'UNIUSDT',
            'ATOMUSDT', 'ETCUSDT', 'LTCUSDT', 'XLMUSDT', 'ALGOUSDT'
          ];

          const cryptoMap: Record<string, string> = {
            'BTCUSDT': 'Bitcoin',
            'ETHUSDT': 'Ethereum',
            'BNBUSDT': 'BNB',
            'SOLUSDT': 'Solana',
            'XRPUSDT': 'XRP',
            'USDCUSDT': 'USD Coin',
            'ADAUSDT': 'Cardano',
            'DOGEUSDT': 'Dogecoin',
            'TRXUSDT': 'TRON',
            'AVAXUSDT': 'Avalanche',
            'LINKUSDT': 'Chainlink',
            'DOTUSDT': 'Polkadot',
            'MATICUSDT': 'Polygon',
            'SHIBUSDT': 'Shiba Inu',
            'UNIUSDT': 'Uniswap',
            'ATOMUSDT': 'Cosmos',
            'ETCUSDT': 'Ethereum Classic',
            'LTCUSDT': 'Litecoin',
            'XLMUSDT': 'Stellar',
            'ALGOUSDT': 'Algorand',
          };

          const filtered = data
            .filter((ticker: any) => topSymbols.includes(ticker.symbol))
            .slice(0, 20)
            .map((ticker: any) => {
              const symbol = ticker.symbol.replace('USDT', '');
              return {
                symbol: symbol,
                name: cryptoMap[ticker.symbol] || symbol,
                price: parseFloat(ticker.lastPrice) || 0,
                change: parseFloat(ticker.priceChange) || 0,
                changePercent: parseFloat(ticker.priceChangePercent) || 0,
                high: parseFloat(ticker.highPrice) || 0,
                low: parseFloat(ticker.lowPrice) || 0,
                volume: formatVolume(parseFloat(ticker.volume) * parseFloat(ticker.lastPrice)),
                marketCap: formatVolume(parseFloat(ticker.quoteVolume)),
              };
            });

          const validated = validateMarketData(filtered);
          if (hasMinimumData(validated, 5)) {
            return { data: validated, source: 'binance' };
          }
          throw new Error('Binance returned insufficient valid data');
        }, 3, 1000, 10000);

        if (marketData && hasMinimumData(marketData.data, 5)) {
          dataSource = marketData.source;
          console.log(`Successfully fetched ${marketData.data.length} valid items from Binance`);
        } else {
          marketData = null;
        }
      } catch (apiError) {
        console.log('Binance API failed:', apiError instanceof Error ? apiError.message : 'Unknown error');
        marketData = null;
      }
    }

    // 3. Try CoinCap API (free, no key required)
    if (!marketData || !hasMinimumData(marketData.data, 5)) {
      try {
        console.log('Attempting CoinCap API...');
        marketData = await retryWithBackoff(async () => {
          const response = await fetch(
            'https://api.coincap.io/v2/assets?limit=20',
            {
              headers: {
                'Accept': 'application/json',
              },
            }
          );

          if (!response.ok) {
            throw new Error(`CoinCap API error: ${response.status}`);
          }

          const result = await response.json();
          const data = result.data || [];

          const mapped = data.map((coin: any) => ({
            symbol: coin.symbol?.toUpperCase() || '',
            name: coin.name || '',
            price: parseFloat(coin.priceUsd) || 0,
            change: parseFloat(coin.changePercent24Hr) || 0,
            changePercent: parseFloat(coin.changePercent24Hr) || 0,
            high: parseFloat(coin.priceUsd) || 0, // CoinCap doesn't provide high/low
            low: parseFloat(coin.priceUsd) || 0,
            volume: formatVolume(parseFloat(coin.volumeUsd24Hr) || 0),
            marketCap: formatVolume(parseFloat(coin.marketCapUsd) || 0),
          }));

          const validated = validateMarketData(mapped);
          if (hasMinimumData(validated, 5)) {
            return { data: validated, source: 'coincap' };
          }
          throw new Error('CoinCap returned insufficient valid data');
        }, 3, 1000, 10000);

        if (marketData && hasMinimumData(marketData.data, 5)) {
          dataSource = marketData.source;
          console.log(`Successfully fetched ${marketData.data.length} valid items from CoinCap`);
        } else {
          marketData = null;
        }
      } catch (apiError) {
        console.log('CoinCap API failed:', apiError instanceof Error ? apiError.message : 'Unknown error');
        marketData = null;
      }
    }

    // 4. Final fallback to mock data
    if (!marketData || !hasMinimumData(marketData.data, 5)) {
      console.log('All APIs failed, using mock data');
      const mockData = getMockCryptoData();
      const validated = validateMarketData(mockData);
      marketData = { data: validated, source: 'mock' };
      dataSource = 'mock';
    }

    const finalData = marketData.data;
    console.log(`Returning ${finalData.length} items from source: ${dataSource}`);

    return new Response(
      JSON.stringify({
        data: finalData,
        timestamp: new Date().toISOString(),
        source: dataSource,
        isDemo: dataSource === 'mock',
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=30',
        },
      }
    );
  } catch (error: unknown) {
    console.error('Error fetching crypto data:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    
    // Even on error, return mock data so UI doesn't break
    const mockData = validateMarketData(getMockCryptoData());
    
    return new Response(
      JSON.stringify({
        data: mockData,
        timestamp: new Date().toISOString(),
        source: 'mock',
        isDemo: true,
        error: message,
      }),
      {
        status: 200, // Return 200 with mock data instead of 500
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

function formatVolume(value: number): string {
  if (!value || value === 0) return '-';
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return `$${value.toLocaleString()}`;
}

function getMockCryptoData() {
  const addVariation = (base: number, percent: number = 3) => {
    const variation = (Math.random() - 0.5) * 2 * (base * percent / 100);
    return Number((base + variation).toFixed(base < 1 ? 6 : 2));
  };

  return [
    { symbol: 'BTC', name: 'Bitcoin', price: addVariation(97500), change: addVariation(2500, 50), changePercent: addVariation(2.5, 50), high: 99000, low: 94000, volume: '$48.2B', marketCap: '$1.92T' },
    { symbol: 'ETH', name: 'Ethereum', price: addVariation(3450), change: addVariation(125, 50), changePercent: addVariation(3.7, 50), high: 3550, low: 3350, volume: '$22.1B', marketCap: '$415B' },
    { symbol: 'USDT', name: 'Tether', price: addVariation(1.0, 0.1), change: addVariation(0.001, 100), changePercent: addVariation(0.01, 100), high: 1.001, low: 0.999, volume: '$85B', marketCap: '$139B' },
    { symbol: 'XRP', name: 'XRP', price: addVariation(2.35), change: addVariation(0.15, 50), changePercent: addVariation(6.8, 50), high: 2.45, low: 2.20, volume: '$12.5B', marketCap: '$134B' },
    { symbol: 'BNB', name: 'BNB', price: addVariation(715), change: addVariation(18, 50), changePercent: addVariation(2.6, 50), high: 730, low: 695, volume: '$1.8B', marketCap: '$106B' },
    { symbol: 'SOL', name: 'Solana', price: addVariation(225), change: addVariation(12, 50), changePercent: addVariation(5.6, 50), high: 235, low: 212, volume: '$5.2B', marketCap: '$107B' },
    { symbol: 'USDC', name: 'USD Coin', price: addVariation(1.0, 0.1), change: addVariation(0.0005, 100), changePercent: addVariation(0.005, 100), high: 1.001, low: 0.999, volume: '$8.5B', marketCap: '$42B' },
    { symbol: 'ADA', name: 'Cardano', price: addVariation(1.08), change: addVariation(0.06, 50), changePercent: addVariation(5.9, 50), high: 1.12, low: 1.02, volume: '$1.9B', marketCap: '$38B' },
    { symbol: 'DOGE', name: 'Dogecoin', price: addVariation(0.42), change: addVariation(0.025, 50), changePercent: addVariation(6.3, 50), high: 0.44, low: 0.39, volume: '$4.8B', marketCap: '$62B' },
    { symbol: 'TRX', name: 'TRON', price: addVariation(0.26), change: addVariation(0.008, 50), changePercent: addVariation(3.2, 50), high: 0.27, low: 0.25, volume: '$1.2B', marketCap: '$23B' },
    { symbol: 'AVAX', name: 'Avalanche', price: addVariation(45.50), change: addVariation(2.3, 50), changePercent: addVariation(5.3, 50), high: 47.00, low: 43.00, volume: '$850M', marketCap: '$18B' },
    { symbol: 'LINK', name: 'Chainlink', price: addVariation(24.80), change: addVariation(1.5, 50), changePercent: addVariation(6.4, 50), high: 26.00, low: 23.50, volume: '$1.4B', marketCap: '$15B' },
    { symbol: 'DOT', name: 'Polkadot', price: addVariation(9.25), change: addVariation(0.45, 50), changePercent: addVariation(5.1, 50), high: 9.60, low: 8.80, volume: '$520M', marketCap: '$14B' },
    { symbol: 'MATIC', name: 'Polygon', price: addVariation(0.62), change: addVariation(0.035, 50), changePercent: addVariation(6.0, 50), high: 0.65, low: 0.58, volume: '$680M', marketCap: '$6.2B' },
    { symbol: 'SHIB', name: 'Shiba Inu', price: addVariation(0.0000245, 5), change: addVariation(0.0000012, 50), changePercent: addVariation(5.2, 50), high: 0.0000255, low: 0.0000235, volume: '$850M', marketCap: '$14B' },
  ];
}
