import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ErrorInfo } from 'react';

interface ErrorFallbackProps {
  error: Error | null;
  errorInfo: ErrorInfo | null;
  onReset?: () => void;
  showDetails?: boolean;
}

/**
 * Error Fallback UI component
 * Displays user-friendly error message with options to recover
 */
export function ErrorFallback({
  error,
  errorInfo,
  onReset,
  showDetails = process.env.NODE_ENV === 'development',
}: ErrorFallbackProps) {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Something went wrong</CardTitle>
          <CardDescription>
            We're sorry, but something unexpected happened. Please try again.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-sm font-medium text-destructive mb-2">Error:</p>
              <p className="text-sm text-destructive/80 font-mono break-all">
                {error.message || 'An unknown error occurred'}
              </p>
          </div>
          )}

          {showDetails && errorInfo && (
            <details className="p-4 rounded-lg bg-muted border border-border">
              <summary className="text-sm font-medium cursor-pointer mb-2">
                Technical Details (Development Only)
              </summary>
              <pre className="text-xs overflow-auto max-h-64 mt-2">
                {errorInfo.componentStack}
              </pre>
            </details>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {onReset && (
              <Button onClick={onReset} variant="default" className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            )}
            <Button onClick={handleReload} variant="outline" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Reload Page
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => window.location.href = '/'}
            >
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-4">
            If this problem persists, please{' '}
            <a href="/contact" className="text-primary hover:underline">
              contact support
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

