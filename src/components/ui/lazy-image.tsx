import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'onError'> {
  src: string;
  alt: string;
  fallback?: string;
  aspectRatio?: 'square' | 'video' | 'wide' | 'auto';
  priority?: boolean; // For above-the-fold images
  srcSet?: string;
  sizes?: string;
  onError?: () => void;
}

// Simplified approach: rely on browser's native lazy loading and IntersectionObserver
// No global queue needed - browser handles concurrent connections efficiently

/**
 * Optimized lazy loading image component with WebP support and CLS prevention
 * Features:
 * - Intersection Observer for lazy loading
 * - WebP format with fallback
 * - Responsive images with srcset
 * - Aspect ratio preservation to prevent CLS
 * - Skeleton loading state
 * - Concurrent load limiting for better performance
 */
export function LazyImage({ 
  src, 
  alt, 
  fallback = '/placeholder.svg',
  aspectRatio = 'auto',
  priority = false,
  srcSet,
  sizes,
  className,
  width,
  height,
  onError: onErrorProp,
  ...props 
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(priority); // Load immediately if priority
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) {
      // Priority images load immediately
      setShouldLoad(true);
      return;
    }

    // Use IntersectionObserver to trigger load when in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { 
        rootMargin: '50px', // Start loading slightly before in view (reduced for more conservative loading)
        threshold: 0.01
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, src]); // Add src dependency to reset on page change

  // Reset state when src changes (important for pagination)
  useEffect(() => {
    setIsLoaded(false);
    setError(false);
    if (!priority) {
      setShouldLoad(false);
    }
  }, [src, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setError(true);
    setIsLoaded(true);
    onErrorProp?.();
  };

  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[21/9]',
    auto: '',
  };

  // Preserve aspect ratio to prevent CLS
  const containerStyle: React.CSSProperties = {};
  if (width && height && aspectRatio === 'auto') {
    containerStyle.aspectRatio = `${width} / ${height}`;
  }

  return (
    <div 
      ref={imgRef}
      className={cn(
        'relative overflow-hidden bg-muted',
        aspectClasses[aspectRatio],
        className
      )}
      style={containerStyle}
    >
      {/* Placeholder/skeleton - prevents CLS */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-skeleton bg-muted" />
      )}
      
      {/* Actual image - only load when queued */}
      {shouldLoad && (
        <picture>
          {/* WebP source */}
          {src && !src.includes('.svg') && !src.includes('.gif') && (
            <source
              srcSet={srcSet || src.replace(/\.(jpg|jpeg|png)$/i, '.webp')}
              type="image/webp"
              sizes={sizes}
            />
          )}
          {/* Fallback image */}
          <img
            src={error ? fallback : src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            width={width}
            height={height}
            srcSet={srcSet}
            sizes={sizes}
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              'w-full h-full object-cover transition-opacity duration-300',
              isLoaded ? 'opacity-100' : 'opacity-0'
            )}
            {...props}
          />
        </picture>
      )}
    </div>
  );
}
