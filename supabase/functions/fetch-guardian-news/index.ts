import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface GuardianArticle {
  id: string;
  webTitle: string;
  webPublicationDate: string;
  webUrl: string;
  sectionId: string;
  sectionName: string;
  fields?: {
    trailText?: string;
    thumbnail?: string;
    byline?: string;
    bodyText?: string;
  };
}

interface GuardianResponse {
  response: {
    status: string;
    total: number;
    pages: number;
    currentPage: number;
    results: GuardianArticle[];
  };
}

// Map Guardian sections to our market categories
function mapSectionToMarket(sectionId: string): string {
  const mapping: Record<string, string> = {
    'business': 'stocks',
    'money': 'stocks',
    'technology': 'stocks',
    'world': 'political',
    'politics': 'political',
    'us-news': 'political',
    'uk-news': 'political',
    'australia-news': 'political',
    'environment': 'commodities',
    'science': 'indices',
  };
  return mapping[sectionId] || 'general';
}

async function fetchGuardianNews(
  apiKey: string,
  fromDate: string,
  toDate: string,
  page: number = 1,
  section?: string
): Promise<GuardianResponse> {
  const baseUrl = 'https://content.guardianapis.com/search';
  const params = new URLSearchParams({
    'api-key': apiKey,
    'from-date': fromDate,
    'to-date': toDate,
    'page': page.toString(),
    'page-size': '50',
    'show-fields': 'trailText,thumbnail,byline,bodyText',
    'order-by': 'newest',
  });

  // Focus on finance/business/political news
  if (section) {
    params.append('section', section);
  } else {
    params.append('section', 'business|money|technology|world|politics|us-news');
  }

  const response = await fetch(`${baseUrl}?${params}`);
  if (!response.ok) {
    throw new Error(`Guardian API error: ${response.status}`);
  }
  return response.json();
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('GUARDIAN_API_KEY');
    if (!apiKey) {
      throw new Error('GUARDIAN_API_KEY not configured');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Parse request body for date range
    let fromDate: string;
    let toDate: string;
    let maxPages = 5; // Limit pages per request to avoid timeout

    if (req.method === 'POST') {
      const body = await req.json();
      fromDate = body.fromDate || getDateMonthsAgo(1);
      toDate = body.toDate || new Date().toISOString().split('T')[0];
      maxPages = body.maxPages || 5;
    } else {
      fromDate = getDateMonthsAgo(1);
      toDate = new Date().toISOString().split('T')[0];
    }

    console.log(`Fetching Guardian news from ${fromDate} to ${toDate}`);

    let totalInserted = 0;
    let totalSkipped = 0;
    const errors: string[] = [];

    // Fetch multiple pages
    for (let page = 1; page <= maxPages; page++) {
      try {
        const data = await fetchGuardianNews(apiKey, fromDate, toDate, page);
        
        if (data.response.status !== 'ok' || !data.response.results.length) {
          console.log(`No more results at page ${page}`);
          break;
        }

        console.log(`Processing page ${page}/${Math.min(data.response.pages, maxPages)}, ${data.response.results.length} articles`);

        const articles = data.response.results.map((article: GuardianArticle) => ({
          external_id: `guardian_${article.id}`,
          title: article.webTitle,
          excerpt: article.fields?.trailText || null,
          content: article.fields?.bodyText?.substring(0, 5000) || null,
          url: article.webUrl,
          image_url: article.fields?.thumbnail || null,
          author: article.fields?.byline || 'The Guardian',
          source_name: 'The Guardian',
          source_id: 'the-guardian',
          market: mapSectionToMarket(article.sectionId),
          published_at: article.webPublicationDate,
        }));

        // Insert with upsert to handle duplicates
        const { data: inserted, error } = await supabase
          .from('news_articles')
          .upsert(articles, { 
            onConflict: 'external_id',
            ignoreDuplicates: true 
          })
          .select();

        if (error) {
          console.error(`Error inserting page ${page}:`, error);
          errors.push(`Page ${page}: ${error.message}`);
        } else {
          const insertedCount = inserted?.length || 0;
          totalInserted += insertedCount;
          totalSkipped += articles.length - insertedCount;
          console.log(`Page ${page}: Inserted ${insertedCount}, skipped ${articles.length - insertedCount} duplicates`);
        }

        // Rate limiting - Guardian API allows 12 requests per second on free tier
        await new Promise(resolve => setTimeout(resolve, 100));

        // Stop if we've reached the last page
        if (page >= data.response.pages) break;

      } catch (pageError: unknown) {
        const errorMsg = pageError instanceof Error ? pageError.message : String(pageError);
        console.error(`Error on page ${page}:`, pageError);
        errors.push(`Page ${page}: ${errorMsg}`);
      }
    }

    // Update fetch log
    await supabase
      .from('news_fetch_log')
      .upsert({ 
        market: 'guardian_historical', 
        last_fetched_at: new Date().toISOString() 
      }, { onConflict: 'market' });

    return new Response(JSON.stringify({
      success: true,
      message: `Fetched Guardian news from ${fromDate} to ${toDate}`,
      totalInserted,
      totalSkipped,
      errors: errors.length > 0 ? errors : undefined,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('Error fetching Guardian news:', error);
    return new Response(JSON.stringify({
      success: false,
      error: errorMsg,
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function getDateMonthsAgo(months: number): string {
  const date = new Date();
  date.setMonth(date.getMonth() - months);
  return date.toISOString().split('T')[0];
}
