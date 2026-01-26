import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-forwarded-for, x-real-ip',
};

interface RateLimitRequest {
  action_type: string;
  max_attempts?: number;
  window_seconds?: number;
}

interface RateLimitResponse {
  allowed: boolean;
  remaining?: number;
  reset_at?: string;
  message?: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP from headers (set by proxy/load balancer)
    const forwarded = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const cfConnectingIp = req.headers.get('cf-connecting-ip');
    
    // Priority: CF > X-Forwarded-For > X-Real-IP > fallback
    let clientIp = cfConnectingIp || 
                   (forwarded ? forwarded.split(',')[0].trim() : null) || 
                   realIp || 
                   '0.0.0.0';
    
    // Validate IP format (basic check)
    if (!clientIp.match(/^[\d.:a-fA-F]+$/)) {
      clientIp = '0.0.0.0';
    }

    // Parse request body
    const body: RateLimitRequest = await req.json().catch(() => ({
      action_type: 'general',
    }));

    const actionType = body.action_type || 'general';
    const maxAttempts = body.max_attempts || 10;
    const windowSeconds = body.window_seconds || 60;

    // Create Supabase client with service role for database access
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check rate limit using database function
    const { data: allowed, error } = await supabase.rpc('check_rate_limit', {
      p_user_id: null,
      p_ip_address: clientIp,
      p_action_type: actionType,
      p_max_attempts: maxAttempts,
      p_window_seconds: windowSeconds,
    });

    if (error) {
      console.error('Rate limit check error:', error);
      // Fail open on error (allow request but log issue)
      return new Response(
        JSON.stringify({
          allowed: true,
          message: 'Rate limit check failed, allowing request',
        } as RateLimitResponse),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    const response: RateLimitResponse = {
      allowed: allowed === true,
      message: allowed ? undefined : `Rate limit exceeded. Please wait ${windowSeconds} seconds.`,
    };

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: allowed ? 200 : 429,
    });
  } catch (error) {
    console.error('Rate limit edge function error:', error);
    
    // Fail open on unexpected errors
    return new Response(
      JSON.stringify({
        allowed: true,
        message: 'Rate limit service error, allowing request',
      } as RateLimitResponse),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  }
});
