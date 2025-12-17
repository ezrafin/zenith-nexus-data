import { logger } from '@/lib/logger';

export type RateLimitAction = 'create_discussion' | 'create_reply' | 'create_reaction' | 'create_bookmark';

/**
 * Check if user can perform an action based on rate limits
 * @param actionType The type of action being performed
 * @param maxAttempts Maximum attempts allowed in the time window (default: 10)
 * @param windowSeconds Time window in seconds (default: 60)
 * @returns true if action is allowed, false if rate limited
 */
export async function checkRateLimit(
  actionType: RateLimitAction,
  maxAttempts: number = 10,
  windowSeconds: number = 60
): Promise<{ allowed: boolean; message?: string }> {
  try {
    // Simple client-side rate limiting using localStorage
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

