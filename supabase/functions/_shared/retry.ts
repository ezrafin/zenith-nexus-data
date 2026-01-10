// Shared retry utilities with exponential backoff and timeout

/**
 * Wraps a promise with a timeout
 */
export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number
): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Operation timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });

  return Promise.race([promise, timeoutPromise]);
}

/**
 * Retries a function with exponential backoff
 * @param fn - Function to retry
 * @param maxRetries - Maximum number of retry attempts (default: 3)
 * @param baseDelay - Base delay in milliseconds (default: 1000)
 * @param timeoutMs - Timeout for each attempt in milliseconds (default: 10000)
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000,
  timeoutMs: number = 10000
): Promise<T> {
  let lastError: Error | unknown;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await withTimeout(fn(), timeoutMs);
    } catch (error) {
      lastError = error;

      // Don't retry on the last attempt
      if (attempt === maxRetries - 1) {
        throw error;
      }

      // Calculate delay with exponential backoff
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError || new Error('Max retries exceeded');
}

/**
 * Retries a function with exponential backoff, but only for specific error types
 * @param fn - Function to retry
 * @param shouldRetry - Function that determines if an error should be retried
 * @param maxRetries - Maximum number of retry attempts (default: 3)
 * @param baseDelay - Base delay in milliseconds (default: 1000)
 * @param timeoutMs - Timeout for each attempt in milliseconds (default: 10000)
 */
export async function retryWithBackoffConditional<T>(
  fn: () => Promise<T>,
  shouldRetry: (error: unknown) => boolean,
  maxRetries: number = 3,
  baseDelay: number = 1000,
  timeoutMs: number = 10000
): Promise<T> {
  let lastError: Error | unknown;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await withTimeout(fn(), timeoutMs);
    } catch (error) {
      lastError = error;

      // Don't retry if error is not retryable
      if (!shouldRetry(error)) {
        throw error;
      }

      // Don't retry on the last attempt
      if (attempt === maxRetries - 1) {
        throw error;
      }

      // Calculate delay with exponential backoff
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError || new Error('Max retries exceeded');
}

/**
 * Checks if an error is retryable (network errors, 5xx, 429, 503)
 */
export function isRetryableError(error: unknown): boolean {
  if (error instanceof Error) {
    // Network errors
    if (
      error.message.includes('fetch') ||
      error.message.includes('network') ||
      error.message.includes('timeout')
    ) {
      return true;
    }
  }

  // Check for HTTP status codes
  if (error && typeof error === 'object') {
    const err = error as { status?: number; code?: string };
    if (err.status === 429 || err.status === 503 || err.status === 502 || err.status === 504) {
      return true;
    }
  }

  return false;
}

