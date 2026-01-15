import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  aspectRatio?: 'square' | 'video' | 'wide' | 'auto';
  priority?: boolean; // For above-the-fold images
  srcSet?: string;
  sizes?: string;
}

// Image loading queue to limit concurrent downloads
let activeLoads = 0;
const MAX_CONCURRENT_LOADS = 6;
const loadQueue: Array<() => void> = [];

function processLoadQueue() {
  while (activeLoads < MAX_CONCURRENT_LOADS && loadQueue.length > 0) {
    activeLoads++;
    const loadFn = loadQueue.shift();
    if (loadFn) {
      loadFn();
    }
  }
}

function startImageLoad(onComplete: () => void) {
  if (activeLoads < MAX_CONCURRENT_LOADS) {
    activeLoads++;
    onComplete();
  } else {
    loadQueue.push(() => {
      activeLoads++;
      onComplete();
    });
  }
}

function finishImageLoad() {
  activeLoads = Math.max(0, activeLoads - 1);
  processLoadQueue();
}

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
  ...props 
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Load immediately if priority
  const [shouldLoad, setShouldLoad] = useState(priority); // Actual load trigger
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) {
      // Priority images load immediately
      startImageLoad(() => setShouldLoad(true));
      return;
    }

    // Reduced rootMargin for better performance with many images
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Queue the actual load to limit concurrent downloads
          startImageLoad(() => {
            setShouldLoad(true);
          });
          observer.disconnect();
        }
      },
      { 
        rootMargin: priority ? '200px' : '50px', // Reduced from 100px
        threshold: 0.01
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    finishImageLoad();
  };

  const handleError = () => {
    setError(true);
    setIsLoaded(true);
    finishImageLoad();
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
