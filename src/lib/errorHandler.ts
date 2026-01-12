/**
 * Centralized error handling system
 * Provides consistent error handling, logging, and user feedback
 */

export enum ErrorType {
  NETWORK = 'NETWORK',
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  NOT_FOUND = 'NOT_FOUND',
  SERVER = 'SERVER',
  UNKNOWN = 'UNKNOWN',
}

export interface ErrorContext {
  type: ErrorType;
  message: string;
  originalError?: Error | unknown;
  context?: Record<string, unknown>;
  retryable?: boolean;
  userMessage?: string;
}

export class AppError extends Error {
  constructor(
    public type: ErrorType,
    message: string,
    public originalError?: Error | unknown,
    public context?: Record<string, unknown>,
    public retryable: boolean = false,
    public userMessage?: string
  ) {
    super(message);
    this.name = 'AppError';
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

/**
 * Error handler class for centralized error management
 */
class ErrorHandler {
  private errorLog: ErrorContext[] = [];
  private maxLogSize = 100;

  /**
   * Handle and categorize an error
   */
  handleError(error: unknown, context?: Record<string, unknown>): ErrorContext {
    const errorContext = this.categorizeError(error, context);
    
    // Log error
    this.logError(errorContext);
    
    // In production, send to error reporting service
    if (process.env.NODE_ENV === 'production') {
      this.reportError(errorContext);
    }
    
    return errorContext;
  }

  /**
   * Categorize error by type
   */
  private categorizeError(error: unknown, context?: Record<string, unknown>): ErrorContext {
    // Network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return {
        type: ErrorType.NETWORK,
        message: 'Network request failed',
        originalError: error,
        context,
        retryable: true,
        userMessage: 'errors.system.networkError', // Translation key - will be translated by useErrorHandler
      };
    }

    // Supabase/API errors
    if (error && typeof error === 'object' && 'code' in error) {
      const apiError = error as { code?: string; message?: string };
      
      if (apiError.code === 'PGRST116' || apiError.code === '23505') {
        return {
          type: ErrorType.VALIDATION,
          message: apiError.message || 'Validation error',
          originalError: error,
          context,
          retryable: false,
          userMessage: 'errors.system.validationError', // Translation key
        };
      }

      if (apiError.code === '401' || apiError.message?.includes('JWT')) {
        return {
          type: ErrorType.AUTHENTICATION,
          message: 'Authentication required',
          originalError: error,
          context,
          retryable: false,
          userMessage: 'errors.system.authenticationError', // Translation key
        };
      }

      if (apiError.code === '403' || apiError.message?.includes('permission')) {
        return {
          type: ErrorType.AUTHORIZATION,
          message: 'Access denied',
          originalError: error,
          context,
          retryable: false,
          userMessage: 'errors.system.authorizationError', // Translation key
        };
      }

      if (apiError.code === '404' || apiError.message?.includes('not found')) {
        return {
          type: ErrorType.NOT_FOUND,
          message: 'Resource not found',
          originalError: error,
          context,
          retryable: false,
          userMessage: 'errors.system.notFoundError', // Translation key
        };
      }

      if (apiError.code?.startsWith('5') || apiError.message?.includes('server')) {
        return {
          type: ErrorType.SERVER,
          message: 'Server error',
          originalError: error,
          context,
          retryable: true,
          userMessage: 'errors.system.serverError', // Translation key
        };
      }
    }

    // Standard Error objects
    if (error instanceof Error) {
      return {
        type: ErrorType.UNKNOWN,
        message: error.message,
        originalError: error,
        context,
        retryable: false,
        userMessage: 'errors.system.unexpectedError', // Translation key
      };
    }

    // Unknown error type
    return {
      type: ErrorType.UNKNOWN,
      message: 'An unknown error occurred',
      originalError: error,
      context,
      retryable: false,
      userMessage: 'errors.system.unknownError', // Translation key
    };
  }

  /**
   * Log error to console and internal log
   */
  private logError(errorContext: ErrorContext): void {
    // Add to internal log
    this.errorLog.push(errorContext);
    if (this.errorLog.length > this.maxLogSize) {
      this.errorLog.shift();
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorHandler:', {
        type: errorContext.type,
        message: errorContext.message,
        context: errorContext.context,
        originalError: errorContext.originalError,
      });
    }
  }

  /**
   * Report error to external service (e.g., Sentry)
   */
  private reportError(errorContext: ErrorContext): void {
    // In production, integrate with error reporting service
    // Example: Sentry.captureException(errorContext.originalError, { extra: errorContext.context });
    
    // For now, we'll just log it
    if (process.env.NODE_ENV === 'production') {
      // You can send to your analytics/error tracking service here
      console.error('Production error:', errorContext);
    }
  }

  /**
   * Get error log (for debugging)
   */
  getErrorLog(): ErrorContext[] {
    return [...this.errorLog];
  }

  /**
   * Clear error log
   */
  clearErrorLog(): void {
    this.errorLog = [];
  }

  /**
   * Check if error is retryable
   */
  isRetryable(error: unknown): boolean {
    const errorContext = this.categorizeError(error);
    return errorContext.retryable ?? false;
  }

  /**
   * Get user-friendly error message
   */
  getUserMessage(error: unknown): string {
    const errorContext = this.categorizeError(error);
    return errorContext.userMessage || errorContext.message;
  }
}

// Singleton instance
export const errorHandler = new ErrorHandler();

/**
 * Helper function to handle errors with automatic user notification
 */
export function handleErrorWithToast(
  error: unknown,
  context?: Record<string, unknown>,
  showToast?: (message: string) => void
): ErrorContext {
  const errorContext = errorHandler.handleError(error, context);
  
  if (showToast && errorContext.userMessage) {
    showToast(errorContext.userMessage);
  }
  
  return errorContext;
}

/**
 * Retry function with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> {
  let lastError: unknown;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // Don't retry if error is not retryable
      if (!errorHandler.isRetryable(error)) {
        throw error;
      }
      
      // Wait before retrying (exponential backoff)
      if (attempt < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, attempt);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
}

