import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Market category search queries for NewsAPI
// Trusted financial news sources
const trustedSources = 'bloomberg,reuters,the-wall-street-journal,financial-times,cnbc,business-insider,fortune,the-economist';

const marketQueries: Record<string, string> = {
  indices: '(S&P 500 OR dow jones OR nasdaq OR russell 2000 OR FTSE) AND (market OR trading OR stocks)',
  stocks: '(earnings OR IPO OR stock price OR shares OR quarterly results) AND (company OR corporation)',
  crypto: '(bitcoin OR ethereum OR cryptocurrency OR blockchain OR DeFi) AND (price OR trading OR market)',
  commodities: '(gold OR oil OR silver OR copper OR natural gas) AND (price OR trading OR commodities)',
  political: '(federal reserve OR interest rates OR inflation OR monetary policy OR economic growth) AND (economy OR markets)',
  forex: '(USD OR EUR OR GBP OR currency) AND (exchange rate OR forex OR trading)',
};

interface NewsAPIArticle {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: NewsAPIArticle[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const NEWSAPI_KEY = Deno.env.get('NEWSAPI_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!NEWSAPI_KEY) {
      console.error('NEWSAPI_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'News API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Parse request body
    const { market = 'all', forceRefresh = false } = await req.json().catch(() => ({}));
    
    console.log(`Fetching news for market: ${market}, forceRefresh: ${forceRefresh}`);

    // Check if we need to fetch new data (every 30 minutes)
    const { data: fetchLog } = await supabase
      .from('news_fetch_log')
      .select('last_fetched_at')
      .eq('market', market === 'all' ? 'general' : market)
      .maybeSingle();

    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    const lastFetched = fetchLog?.last_fetched_at ? new Date(fetchLog.last_fetched_at) : null;
    const needsRefresh = forceRefresh || !lastFetched || lastFetched < thirtyMinutesAgo;

    if (needsRefresh) {
      console.log('Fetching fresh news from NewsAPI...');
      
      // Determine which markets to fetch
      const marketsToFetch = market === 'all' 
        ? Object.keys(marketQueries) 
        : [market];

      for (const currentMarket of marketsToFetch) {
        const query = marketQueries[currentMarket] || marketQueries.general;
        
        try {
          const newsApiUrl = `https://newsapi.org/v2/everything?` + new URLSearchParams({
            q: query,
            sources: trustedSources,
            language: 'en',
            sortBy: 'publishedAt',
            pageSize: '20',
            apiKey: NEWSAPI_KEY,
          });

          console.log(`Fetching news for ${currentMarket}...`);
          const response = await fetch(newsApiUrl);
          const data: NewsAPIResponse = await response.json();

          if (data.status === 'ok' && data.articles?.length > 0) {
            console.log(`Got ${data.articles.length} articles for ${currentMarket}`);
            
            // Transform and upsert articles
            const articles = data.articles
              .filter(article => article.title && article.title !== '[Removed]')
              .map(article => ({
                external_id: `${article.source.id || article.source.name}-${new Date(article.publishedAt).getTime()}-${article.title.substring(0, 50)}`,
                title: article.title,
                excerpt: article.description || '',
                content: article.content || article.description || '',
                url: article.url,
                image_url: article.urlToImage,
                source_name: article.source.name,
                source_id: article.source.id,
                author: article.author,
                published_at: article.publishedAt,
                market: currentMarket,
                fetched_at: new Date().toISOString(),
              }));

            if (articles.length > 0) {
              const { error: upsertError } = await supabase
                .from('news_articles')
                .upsert(articles, { 
                  onConflict: 'external_id',
                  ignoreDuplicates: false 
                });

              if (upsertError) {
                console.error(`Error upserting articles for ${currentMarket}:`, upsertError);
              }
            }
          } else {
            console.log(`No articles or error for ${currentMarket}:`, data);
          }
        } catch (fetchError) {
          console.error(`Error fetching ${currentMarket}:`, fetchError);
        }
      }

      // Update fetch log
      await supabase
        .from('news_fetch_log')
        .upsert({ 
          market: market === 'all' ? 'general' : market, 
          last_fetched_at: new Date().toISOString() 
        }, { onConflict: 'market' });
    } else {
      console.log('Using cached news data');
    }

    // Fetch articles from database
    let query = supabase
      .from('news_articles')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(50);

    if (market !== 'all') {
      query = query.eq('market', market);
    }

    const { data: articles, error: selectError } = await query;

    if (selectError) {
      console.error('Error fetching articles from database:', selectError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch news' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get last fetch time
    const { data: latestFetchLog } = await supabase
      .from('news_fetch_log')
      .select('last_fetched_at')
      .order('last_fetched_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    console.log(`Returning ${articles?.length || 0} articles`);

    return new Response(
      JSON.stringify({ 
        articles: articles || [],
        lastUpdated: latestFetchLog?.last_fetched_at || new Date().toISOString(),
        cached: !needsRefresh
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in fetch-news function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
