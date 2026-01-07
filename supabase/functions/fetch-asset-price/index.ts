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

// Symbol mapping for indices and commodities
const INDEX_SYMBOL_MAP: Record<string, { yahoo: string; finnhub?: string }> = {
  'DAX': { yahoo: '^GDAXI', finnhub: 'EWG' },
  'SPX': { yahoo: '^GSPC', finnhub: 'SPY' },
  'DJI': { yahoo: '^DJI', finnhub: 'DIA' },
  'IXIC': { yahoo: '^IXIC', finnhub: 'QQQ' },
  'RUT': { yahoo: '^RUT', finnhub: 'IWM' },
  'FTSE': { yahoo: '^FTSE', finnhub: 'EWU' },
  'CAC40': { yahoo: '^FCHI', finnhub: 'EWQ' },
  'N225': { yahoo: '^N225', finnhub: 'EWJ' },
  'HSI': { yahoo: '^HSI', finnhub: 'EWH' },
};

const COMMODITY_SYMBOL_MAP: Record<string, { yahoo: string; finnhub?: string }> = {
  'GC': { yahoo: 'GC=F', finnhub: 'GLD' },
  'SI': { yahoo: 'SI=F', finnhub: 'SLV' },
  'CL': { yahoo: 'CL=F', finnhub: 'USO' },
  'NG': { yahoo: 'NG=F', finnhub: 'UNG' },
  'HG': { yahoo: 'HG=F', finnhub: 'CPER' },
  'PL': { yahoo: 'PL=F', finnhub: 'PPLT' },
  'PA': { yahoo: 'PA=F', finnhub: 'PALL' },
  'ZW': { yahoo: 'ZW=F', finnhub: 'WEAT' },
  'ZC': { yahoo: 'ZC=F', finnhub: 'CORN' },
  'KC': { yahoo: 'KC=F', finnhub: 'JO' },
};

async function fetchFinnhubPrice(symbol: string, marketType: string): Promise<PriceData | null> {
  const apiKey = Deno.env.get('FINNHUB_API_KEY');
  if (!apiKey) {
    console.log('No Finnhub API key found');
    return null;
  }

  try {
    let finnhubSymbol = symbol;
    
    // Map symbols for indices and commodities
    if (marketType === 'indices' && INDEX_SYMBOL_MAP[symbol]) {
      finnhubSymbol = INDEX_SYMBOL_MAP[symbol].finnhub || symbol;
    } else if (marketType === 'commodities' && COMMODITY_SYMBOL_MAP[symbol]) {
      finnhubSymbol = COMMODITY_SYMBOL_MAP[symbol].finnhub || symbol;
    }
    
    console.log(`Trying Finnhub for ${symbol} (as ${finnhubSymbol})`);
    
    const response = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${finnhubSymbol}&token=${apiKey}`
    );
    
    if (!response.ok) {
      console.log(`Finnhub returned ${response.status} for ${symbol}`);
      return null;
    }
    
    const data = await response.json();
    console.log(`Finnhub response for ${symbol}:`, JSON.stringify(data));
    
    // Check if we have valid data (c = current price)
    if (data && data.c && data.c > 0) {
      const prevClose = data.pc || data.c;
      const change = data.c - prevClose;
      const changePercent = prevClose > 0 ? (change / prevClose) * 100 : 0;
      
      return {
        symbol,
        price: data.c,
        change: change,
        changePercent: changePercent,
      };
    }
    
    console.log(`Finnhub returned no price data for ${symbol} (c=${data?.c})`);
    return null;
  } catch (error) {
    console.error(`Finnhub error for ${symbol}:`, error);
    return null;
  }
}

async function fetchYahooFinancePrice(symbol: string, marketType: string): Promise<PriceData | null> {
  try {
    let yahooSymbol = symbol;
    
    // Map symbols to Yahoo Finance format
    if (marketType === 'indices' && INDEX_SYMBOL_MAP[symbol]) {
      yahooSymbol = INDEX_SYMBOL_MAP[symbol].yahoo;
    } else if (marketType === 'commodities' && COMMODITY_SYMBOL_MAP[symbol]) {
      yahooSymbol = COMMODITY_SYMBOL_MAP[symbol].yahoo;
    } else if (marketType === 'currencies') {
      // Format currency pairs for Yahoo Finance
      if (symbol.includes('/')) {
        yahooSymbol = symbol.replace('/', '') + '=X';
      } else if (symbol.length === 6) {
        yahooSymbol = symbol + '=X';
      }
    }
    
    const response = await fetch(
      `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(yahooSymbol)}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      }
    );
    
    if (!response.ok) {
      console.log(`Yahoo Finance returned ${response.status} for ${symbol}`);
      return null;
    }
    
    const data = await response.json();
    const quote = data?.quoteResponse?.result?.[0];
    
    if (quote && quote.regularMarketPrice) {
      return {
        symbol,
        price: quote.regularMarketPrice || 0,
        change: quote.regularMarketChange || 0,
        changePercent: quote.regularMarketChangePercent || 0,
      };
    }
    
    console.log(`Yahoo Finance returned no data for ${symbol}`);
    return null;
  } catch (error) {
    console.error(`Yahoo Finance error for ${symbol}:`, error);
    return null;
  }
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
      
      // Check for Alpha Vantage error messages
      if (data['Note'] || data['Error Message'] || data['Information']) {
        console.log(`Alpha Vantage API error for ${symbol}:`, data['Note'] || data['Error Message'] || data['Information']);
        return null;
      }
      
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
      
      // Check for Alpha Vantage error messages
      if (data['Note'] || data['Error Message'] || data['Information']) {
        console.log(`Alpha Vantage API error for ${symbol}:`, data['Note'] || data['Error Message'] || data['Information']);
        return null;
      }
      
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
      // Note: Alpha Vantage doesn't support indices directly, so we skip them
      if (marketType === 'indices') {
        return null; // Will fallback to Yahoo Finance
      }
      
      endpoint = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      
      // Check for Alpha Vantage error messages (rate limiting, invalid API call, etc.)
      if (data['Note'] || data['Error Message'] || data['Information']) {
        console.log(`Alpha Vantage API error for ${symbol}:`, data['Note'] || data['Error Message'] || data['Information']);
        return null;
      }
      
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

    // Try Finnhub first for stocks (more reliable than Alpha Vantage free tier)
    if (!priceData && (marketType === 'stocks' || marketType === 'indices')) {
      priceData = await fetchFinnhubPrice(symbol, marketType);
    }

    // Try Alpha Vantage (but skip indices as it doesn't support them well)
    if (!priceData && marketType !== 'indices') {
      priceData = await fetchAlphaVantagePrice(symbol, marketType);
    }

    // Fallback to Yahoo Finance (works for all types including indices)
    if (!priceData) {
      priceData = await fetchYahooFinancePrice(symbol, marketType);
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
