import { useCallback } from 'react';
import { toast } from 'sonner';
import { errorHandler, handleErrorWithToast, ErrorContext, retryWithBackoff, ErrorType } from '@/lib/errorHandler';
import { useTranslation } from './useTranslation';

/**
 * Hook for error handling with automatic toast notifications
 */
export function useErrorHandler() {
  const { t } = useTranslation({ namespace: 'ui' });

  const handleError = useCallback((error: unknown, context?: Record<string, unknown>) => {
    return handleErrorWithToast(error, context, (message) => {
      // Try to translate the message if it matches a known error key
      const translatedMessage = translateErrorMessage(message, t);
      toast.error(translatedMessage);
    });
  }, [t]);

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
    const message = errorHandler.getUserMessage(error);
    return translateErrorMessage(message, t);
  }, [t]);

  /**
   * Translate error message if it matches a known error key
   */
  function translateErrorMessage(message: string, t: (key: string) => string): string {
    // Map hardcoded error messages to translation keys
    const errorMap: Record<string, string> = {
      'Unable to connect to the server. Please check your internet connection and try again.': 'errors.system.networkError',
      'The information you provided is invalid. Please check and try again.': 'errors.system.validationError',
      'Please sign in to continue.': 'errors.system.authenticationError',
      'You do not have permission to perform this action.': 'errors.system.authorizationError',
      'The requested resource could not be found.': 'errors.system.notFoundError',
      'A server error occurred. Please try again later.': 'errors.system.serverError',
      'An unexpected error occurred. Please try again.': 'errors.system.unexpectedError',
      'Something went wrong. Please try again.': 'errors.system.unknownError',
    };

    const key = errorMap[message];
    if (key) {
      const translated = t(key);
      // If translation returns the key, the translation doesn't exist, use original message
      return translated !== key ? translated : message;
    }
    return message;
  }

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

