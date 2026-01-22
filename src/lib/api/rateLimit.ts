import { logger } from '@/lib/logger';
import { supabase } from '@/integrations/supabase/client';

export type RateLimitAction = 'create_discussion' | 'create_reply' | 'create_reaction' | 'create_bookmark';

/**
 * Check if user can perform an action based on rate limits
 * Uses SERVER-SIDE rate limiting via database RPC function for security
 * Client-side check is maintained only for UX (showing wait time)
 * 
 * @param actionType The type of action being performed
 * @param userId The authenticated user's ID (required for server-side check)
 * @param maxAttempts Maximum attempts allowed in the time window (default: 10)
 * @param windowSeconds Time window in seconds (default: 60)
 * @returns true if action is allowed, false if rate limited
 */
export async function checkRateLimit(
  actionType: RateLimitAction,
  maxAttempts: number = 10,
  windowSeconds: number = 60,
  userId?: string
): Promise<{ allowed: boolean; message?: string }> {
  try {
    // If we have a userId, use server-side rate limiting (SECURE)
    if (userId) {
      // Use type assertion because check_rate_limit function exists in DB but not in generated types
      const { data: allowed, error } = await (supabase.rpc as any)('check_rate_limit', {
        p_user_id: userId,
        p_ip_address: null, // Browser doesn't have access to IP
        p_action_type: actionType,
        p_max_attempts: maxAttempts,
        p_window_seconds: windowSeconds,
      });

      if (error) {
        logger.error('Server-side rate limit check failed:', error);
        // Fall through to client-side check as fallback
      } else if (allowed === false) {
        return {
          allowed: false,
          message: `Rate limit exceeded. Please wait ${windowSeconds} seconds before trying again.`,
        };
      } else if (allowed === true) {
        // Server approved, update client-side cache for UX
        updateClientSideCache(actionType);
        return { allowed: true };
      }
    }

    // Client-side rate limiting fallback (for UX only - NOT secure!)
    // This runs if server-side check fails or userId is not provided
    const key = `rate_limit_${actionType}`;
    const now = Date.now();
    const storedData = localStorage.getItem(key);
    
    let attempts: number[] = [];
    if (storedData) {
      attempts = JSON.parse(storedData);
    }
    
    // Filter to only attempts within the window
    const windowMs = windowSeconds * 1000;
    attempts = attempts.filter(timestamp => now - timestamp < windowMs);
    
    if (attempts.length >= maxAttempts) {
      const oldestAttempt = Math.min(...attempts);
      const waitTime = Math.ceil((windowMs - (now - oldestAttempt)) / 1000);
      return {
        allowed: false,
        message: `Rate limit exceeded. Please wait ${waitTime} seconds before trying again.`,
      };
    }
    
    // Add current attempt
    attempts.push(now);
    localStorage.setItem(key, JSON.stringify(attempts));
    
    return { allowed: true };
  } catch (error) {
    logger.error('Rate limit check failed:', error);
    // Fail open - allow action if check fails
    return { allowed: true };
  }
}

/**
 * Update client-side cache after successful server-side check
 * Used purely for UX to show accurate wait times
 */
function updateClientSideCache(actionType: RateLimitAction): void {
  try {
    const key = `rate_limit_${actionType}`;
    const now = Date.now();
    const storedData = localStorage.getItem(key);
    
    let attempts: number[] = [];
    if (storedData) {
      attempts = JSON.parse(storedData);
    }
    
    // Keep recent attempts and add new one
    const windowMs = 60 * 1000; // 60 seconds default window
    attempts = attempts.filter(timestamp => now - timestamp < windowMs);
    attempts.push(now);
    localStorage.setItem(key, JSON.stringify(attempts));
  } catch {
    // Ignore localStorage errors
  }
}
