import { useCallback } from 'react';
import { toast } from 'sonner';
import { errorHandler, handleErrorWithToast, ErrorContext, retryWithBackoff, ErrorType } from '@/lib/errorHandler';

/**
 * Hook for error handling with automatic toast notifications
 */
export function useErrorHandler() {
  const handleError = useCallback((error: unknown, context?: Record<string, unknown>) => {
    return handleErrorWithToast(error, context, (message) => {
      toast.error(message);
    });
  }, []);

  const handleErrorSilent = useCallback((error: unknown, context?: Record<string, unknown>): ErrorContext => {
    return errorHandler.handleError(error, context);
  }, []);

  const handleErrorWithRetry = useCallback(
    async <T>(
      fn: () => Promise<T>,
      maxRetries: number = 3,
      context?: Record<string, unknown>
    ): Promise<T> => {
      try {
        return await retryWithBackoff(fn, maxRetries);
      } catch (error) {
        handleError(error, context);
        throw error;
      }
    },
    [handleError]
  );

  const getUserMessage = useCallback((error: unknown): string => {
    return errorHandler.getUserMessage(error);
  }, []);

  const isRetryable = useCallback((error: unknown): boolean => {
    return errorHandler.isRetryable(error);
  }, []);

  return {
    handleError,
    handleErrorSilent,
    handleErrorWithRetry,
    getUserMessage,
    isRetryable,
    ErrorType,
  };
}

