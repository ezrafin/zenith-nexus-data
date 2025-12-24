import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/lib/logger';

export type AuthRateLimitAction = 'login' | 'signup' | 'password_reset' | 'email_verification';

interface RateLimitResult {
  allowed: boolean;
  message?: string;
  retryAfter?: number; // seconds
}

/**
 * Check rate limit for authentication actions
 * Uses both client-side (localStorage) and server-side (database) checks
 */
export async function checkAuthRateLimit(
  action: AuthRateLimitAction,
  identifier: string // email or user ID
): Promise<RateLimitResult> {
  try {
    // Client-side rate limiting (fast check)
    const clientCheck = checkClientRateLimit(action, identifier);
    if (!clientCheck.allowed) {
      return clientCheck;
    }

    // Server-side rate limiting (more secure)
    try {
      const { data, error } = await supabase.functions.invoke('check-auth-rate-limit', {
        body: { action, identifier },
      });

      if (error) {
        logger.warn('Rate limit check failed, allowing action:', error);
        // Fail open - allow action if check fails
        return { allowed: true };
      }

      if (data && !data.allowed) {
        // Update client-side cache
        recordClientRateLimit(action, identifier);
        return {
          allowed: false,
          message: data.message || 'Too many attempts. Please try again later.',
          retryAfter: data.retryAfter,
        };
      }

      // Record successful check on client
      recordClientRateLimit(action, identifier);
      return { allowed: true };
    } catch (error) {
      logger.error('Rate limit check error:', error);
      // Fail open - allow action if check fails
      return { allowed: true };
    }
  } catch (error) {
    logger.error('Auth rate limit check failed:', error);
    return { allowed: true };
  }
}

/**
 * Client-side rate limiting using localStorage
 */
function checkClientRateLimit(action: AuthRateLimitAction, identifier: string): RateLimitResult {
  const key = `auth_rate_limit_${action}_${identifier}`;
  const now = Date.now();
  
  // Different limits for different actions
  const limits: Record<AuthRateLimitAction, { maxAttempts: number; windowMs: number }> = {
    login: { maxAttempts: 5, windowMs: 15 * 60 * 1000 }, // 5 attempts per 15 minutes
    signup: { maxAttempts: 3, windowMs: 60 * 60 * 1000 }, // 3 attempts per hour
    password_reset: { maxAttempts: 3, windowMs: 60 * 60 * 1000 }, // 3 attempts per hour
    email_verification: { maxAttempts: 5, windowMs: 15 * 60 * 1000 }, // 5 attempts per 15 minutes
  };

  const limit = limits[action];
  const storedData = localStorage.getItem(key);
  
  let attempts: number[] = [];
  if (storedData) {
    try {
      attempts = JSON.parse(storedData);
    } catch {
      attempts = [];
    }
  }
  
  // Filter to only attempts within the window
  attempts = attempts.filter(timestamp => now - timestamp < limit.windowMs);
  
  if (attempts.length >= limit.maxAttempts) {
    const oldestAttempt = Math.min(...attempts);
    const waitTime = Math.ceil((limit.windowMs - (now - oldestAttempt)) / 1000);
    const minutes = Math.ceil(waitTime / 60);
    
    return {
      allowed: false,
      message: `Too many ${action} attempts. Please wait ${minutes} minute${minutes !== 1 ? 's' : ''} before trying again.`,
      retryAfter: waitTime,
    };
  }
  
  return { allowed: true };
}

/**
 * Record a rate limit attempt on client
 */
function recordClientRateLimit(action: AuthRateLimitAction, identifier: string): void {
  const key = `auth_rate_limit_${action}_${identifier}`;
  const now = Date.now();
  const storedData = localStorage.getItem(key);
  
  let attempts: number[] = [];
  if (storedData) {
    try {
      attempts = JSON.parse(storedData);
    } catch {
      attempts = [];
    }
  }
  
  // Add current attempt
  attempts.push(now);
  
  // Keep only last 24 hours of attempts
  const dayAgo = now - 24 * 60 * 60 * 1000;
  attempts = attempts.filter(timestamp => timestamp > dayAgo);
  
  try {
    localStorage.setItem(key, JSON.stringify(attempts));
  } catch (error) {
    // Ignore localStorage errors (quota exceeded, etc.)
    logger.warn('Failed to store rate limit data:', error);
  }
}

/**
 * Clear rate limit data for an action (e.g., after successful login)
 */
export function clearAuthRateLimit(action: AuthRateLimitAction, identifier: string): void {
  const key = `auth_rate_limit_${action}_${identifier}`;
  try {
    localStorage.removeItem(key);
  } catch (error) {
    logger.warn('Failed to clear rate limit data:', error);
  }
}

