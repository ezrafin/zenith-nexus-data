import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CollectBillRequest {
  billId: string;
  context?: {
    page?: string;
    action?: string;
    metadata?: Record<string, any>;
  };
}

interface CollectBillResponse {
  success: boolean;
  collected: boolean;
  bill?: {
    id: string;
    name: string;
    rarity: 'regular' | 'legendary';
  };
  progress?: {
    collected: number;
    total: number;
  };
  legendarySpawn?: {
    articleId: string;
    articleType: 'news' | 'analytics' | 'basic_article' | 'advanced_article';
    articleUrl: string;
  };
  error?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing Supabase environment variables');
    }

    // Get auth token from request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ success: false, error: 'Unauthorized' } as CollectBillResponse),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Create Supabase client with service role for admin operations
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    
    // Create client with user's auth token for RLS
    const supabaseUser = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      global: {
        headers: { Authorization: authHeader },
      },
    });

    // Get user from token
    const { data: { user }, error: authError } = await supabaseUser.auth.getUser();
    if (authError || !user) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid authentication' } as CollectBillResponse),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const request: CollectBillRequest = await req.json();
    const { billId, context } = request;

    if (!billId) {
      return new Response(
        JSON.stringify({ success: false, error: 'billId is required' } as CollectBillResponse),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Rate limiting: Check attempts in last minute
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000).toISOString();
    const { count: recentAttempts } = await supabaseAdmin
      .from('user_collected_bills')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('collected_at', oneMinuteAgo);

    if (recentAttempts && recentAttempts >= 10) {
      return new Response(
        JSON.stringify({ success: false, error: 'Rate limit exceeded. Please wait before trying again.' } as CollectBillResponse),
        {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Get bill information
    const { data: bill, error: billError } = await supabaseAdmin
      .from('collectible_bills')
      .select('*')
      .eq('bill_id', billId)
      .single();

    if (billError || !bill) {
      return new Response(
        JSON.stringify({ success: false, error: 'Bill not found' } as CollectBillResponse),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Check if already collected
    const { data: existingCollection } = await supabaseAdmin
      .from('user_collected_bills')
      .select('*')
      .eq('user_id', user.id)
      .eq('bill_id', billId)
      .single();

    if (existingCollection) {
      // Already collected, return progress
      const { data: progressData } = await supabaseAdmin.rpc('get_user_collection_progress', {
        p_user_id: user.id,
      });

      return new Response(
        JSON.stringify({
          success: true,
          collected: false,
          progress: progressData?.[0] ? {
            collected: Number(progressData[0].collected_count),
            total: Number(progressData[0].total_count),
          } : undefined,
        } as CollectBillResponse),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Special handling for legendary bill
    if (bill.rarity === 'legendary') {
      // Check if user has all 30 regular bills
      const { data: progressData } = await supabaseAdmin.rpc('get_user_collection_progress', {
        p_user_id: user.id,
      });

      if (!progressData || !progressData[0] || !progressData[0].has_all_regular) {
        return new Response(
          JSON.stringify({ success: false, error: 'You must collect all 30 regular bills first' } as CollectBillResponse),
          {
            status: 403,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // Check if legendary spawn exists
      let spawn = (await supabaseAdmin
        .from('user_legendary_spawns')
        .select('*')
        .eq('user_id', user.id)
        .single()).data;

      if (!spawn) {
        return new Response(
          JSON.stringify({ success: false, error: 'Legendary bill has not spawned yet' } as CollectBillResponse),
          {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // If spawn is pending, assign it to current article
      if (spawn.article_id === 'pending' && context?.metadata?.articleId && context?.metadata?.articleType) {
        const { error: updateError } = await supabaseAdmin
          .from('user_legendary_spawns')
          .update({
            article_id: context.metadata.articleId,
            article_type: context.metadata.articleType,
          })
          .eq('user_id', user.id);

        if (!updateError) {
          spawn.article_id = context.metadata.articleId;
          spawn.article_type = context.metadata.articleType;
        }
      }

      // Validate that current page matches spawn location
      if (context?.page && spawn.article_id !== 'pending') {
        const pageMatches = 
          (spawn.article_type === 'news' && context.page.includes('/news/') && context.metadata?.articleId === spawn.article_id) ||
          (spawn.article_type === 'analytics' && context.page.includes('/analytics/') && context.metadata?.articleId === spawn.article_id) ||
          (spawn.article_type === 'basic_article' && context.page.includes('/learning/basics/') && context.metadata?.articleId === spawn.article_id) ||
          (spawn.article_type === 'advanced_article' && context.page.includes('/learning/advanced/') && context.metadata?.articleId === spawn.article_id);

        if (!pageMatches) {
          return new Response(
            JSON.stringify({ success: false, error: 'Legendary bill is not on this page' } as CollectBillResponse),
            {
              status: 403,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }
      }
    }

    // For regular bills, check if this is the 30th one (to trigger legendary spawn)
    let is30thRegular = false;
    if (bill.rarity === 'regular') {
      const { data: progressData } = await supabaseAdmin.rpc('get_user_collection_progress', {
        p_user_id: user.id,
      });

      if (progressData && progressData[0]) {
        const collectedCount = Number(progressData[0].collected_count);
        // This will be the 30th if currently at 29
        is30thRegular = collectedCount === 29;
      }
    }

    // Insert collection record
    const { error: insertError } = await supabaseAdmin
      .from('user_collected_bills')
      .insert({
        user_id: user.id,
        bill_id: billId,
        collection_context: context || {},
      });

    if (insertError) {
      console.error('Error inserting collection:', insertError);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to collect bill' } as CollectBillResponse),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // If this is the legendary bill, mark the spawn as collected
    if (bill.rarity === 'legendary') {
      await supabaseAdmin
        .from('user_legendary_spawns')
        .update({ collected_at: new Date().toISOString() })
        .eq('user_id', user.id);
    }

    // If this is the 30th regular bill, create legendary spawn
    let legendarySpawn: CollectBillResponse['legendarySpawn'] = undefined;
    if (is30thRegular) {
      // Query news articles from database to get a random one
      const { data: newsArticles, error: newsError } = await supabaseAdmin
        .from('news_articles')
        .select('id')
        .limit(100); // Get up to 100 articles

      let selectedArticleId: string | null = null;
      let selectedType: 'news' | 'analytics' | 'basic_article' | 'advanced_article' = 'news';

      if (!newsError && newsArticles && newsArticles.length > 0) {
        // Randomly select a news article
        const randomIndex = Math.floor(Math.random() * newsArticles.length);
        selectedArticleId = newsArticles[randomIndex].id;
        selectedType = 'news';
      } else {
        // Fallback: Use a placeholder that will be set when user visits next article
        // The spawn will be assigned to the next eligible article page they visit
        selectedArticleId = null; // Will be set dynamically
        selectedType = 'news'; // Default type
      }

      // Create spawn record (article_id can be null initially, will be set on first article visit)
      const { error: spawnError } = await supabaseAdmin
        .from('user_legendary_spawns')
        .insert({
          user_id: user.id,
          article_id: selectedArticleId || 'pending',
          article_type: selectedType,
        });

      if (!spawnError && selectedArticleId) {
        // Build article URL
        const articleUrl = `/news/${selectedArticleId}`;

        legendarySpawn = {
          articleId: selectedArticleId,
          articleType: selectedType,
          articleUrl,
        };
      } else if (!spawnError) {
        // Spawn created but article will be assigned on next visit
        legendarySpawn = {
          articleId: 'pending',
          articleType: selectedType,
          articleUrl: '/news',
        };
      }
    }

    // Get updated progress
    const { data: progressData } = await supabaseAdmin.rpc('get_user_collection_progress', {
      p_user_id: user.id,
    });

    const response: CollectBillResponse = {
      success: true,
      collected: true,
      bill: {
        id: bill.bill_id,
        name: bill.name,
        rarity: bill.rarity as 'regular' | 'legendary',
      },
      progress: progressData?.[0] ? {
        collected: Number(progressData[0].collected_count),
        total: Number(progressData[0].total_count) + 1, // +1 for legendary
      } : undefined,
      legendarySpawn,
    };

    return new Response(
      JSON.stringify(response),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: unknown) {
    console.error('Error collecting bill:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: message } as CollectBillResponse),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

