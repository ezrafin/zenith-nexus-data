import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PriceData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

async function fetchAlphaVantagePrice(symbol: string, marketType: string): Promise<PriceData | null> {
  const apiKey = Deno.env.get('VANTAGEAPI_KEY');
  if (!apiKey) {
    console.log('No Alpha Vantage API key found');
    return null;
  }

  try {
    let endpoint = '';
    
    if (marketType === 'crypto') {
      endpoint = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${symbol}&to_currency=USD&apikey=${apiKey}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      
      if (data['Realtime Currency Exchange Rate']) {
        const rate = data['Realtime Currency Exchange Rate'];
        const price = parseFloat(rate['5. Exchange Rate']);
        return {
          symbol,
          price,
          change: 0,
          changePercent: 0,
        };
      }
    } else if (marketType === 'currencies') {
      const [from, to] = symbol.includes('/') ? symbol.split('/') : [symbol.slice(0, 3), symbol.slice(3)];
      endpoint = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from}&to_currency=${to || 'USD'}&apikey=${apiKey}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      
      if (data['Realtime Currency Exchange Rate']) {
        const rate = data['Realtime Currency Exchange Rate'];
        const price = parseFloat(rate['5. Exchange Rate']);
        return {
          symbol,
          price,
          change: 0,
          changePercent: 0,
        };
      }
    } else {
      // Stocks, indices, commodities - use GLOBAL_QUOTE
      endpoint = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      
      if (data['Global Quote'] && data['Global Quote']['05. price']) {
        const quote = data['Global Quote'];
        return {
          symbol,
          price: parseFloat(quote['05. price']),
          change: parseFloat(quote['09. change'] || '0'),
          changePercent: parseFloat((quote['10. change percent'] || '0').replace('%', '')),
        };
      }
    }
    
    console.log(`Alpha Vantage returned no data for ${symbol}`);
    return null;
  } catch (error) {
    console.error(`Alpha Vantage error for ${symbol}:`, error);
    return null;
  }
}

async function fetchCoinGeckoPrice(symbol: string): Promise<PriceData | null> {
  try {
    // Map common crypto symbols to CoinGecko IDs
    const symbolToId: Record<string, string> = {
      'BTC': 'bitcoin',
      'ETH': 'ethereum',
      'XRP': 'ripple',
      'SOL': 'solana',
      'ADA': 'cardano',
      'DOGE': 'dogecoin',
      'DOT': 'polkadot',
      'MATIC': 'matic-network',
      'LINK': 'chainlink',
      'AVAX': 'avalanche-2',
      'UNI': 'uniswap',
      'LTC': 'litecoin',
      'BNB': 'binancecoin',
    };
    
    const coinId = symbolToId[symbol.toUpperCase()] || symbol.toLowerCase();
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true`
    );
    
    if (!response.ok) {
      console.log(`CoinGecko API returned ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    
    if (data[coinId]) {
      return {
        symbol,
        price: data[coinId].usd,
        change: 0,
        changePercent: data[coinId].usd_24h_change || 0,
      };
    }
    
    return null;
  } catch (error) {
    console.error(`CoinGecko error for ${symbol}:`, error);
    return null;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { symbol, marketType } = await req.json();
    
    if (!symbol || !marketType) {
      return new Response(
        JSON.stringify({ error: 'symbol and marketType are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Fetching price for ${symbol} (${marketType})`);

    let priceData: PriceData | null = null;

    // For crypto, try CoinGecko first (free, no key needed)
    if (marketType === 'crypto') {
      priceData = await fetchCoinGeckoPrice(symbol);
    }

    // If not crypto or CoinGecko failed, try Alpha Vantage
    if (!priceData) {
      priceData = await fetchAlphaVantagePrice(symbol, marketType);
    }

    if (!priceData) {
      return new Response(
        JSON.stringify({ error: 'Could not fetch price data', symbol }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Price for ${symbol}: $${priceData.price}`);

    return new Response(
      JSON.stringify(priceData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in fetch-asset-price:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
