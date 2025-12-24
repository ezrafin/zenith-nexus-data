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

/**
 * Optimized lazy loading image component with WebP support and CLS prevention
 * Features:
 * - Intersection Observer for lazy loading
 * - WebP format with fallback
 * - Responsive images with srcset
 * - Aspect ratio preservation to prevent CLS
 * - Skeleton loading state
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
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) return; // Skip observer for priority images

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Generate WebP src with fallback
  const getImageSrc = () => {
    if (error) return fallback;
    
    // Try WebP first if supported
    if (src && !src.includes('.svg') && !src.includes('.gif')) {
      const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      return webpSrc;
    }
    
    return src;
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
      
      {/* Actual image */}
      {isInView && (
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
            onLoad={() => setIsLoaded(true)}
            onError={() => {
              setError(true);
              setIsLoaded(true);
            }}
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
