import { motion } from 'framer-motion';
import { SkeletonCard } from '@/components/ui/skeleton-card';

/**
 * Lightweight skeleton screen for page loading
 * Shows layout structure while content loads
 */
export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header skeleton */}
      <div className="border-b border-border">
        <div className="container-wide py-4">
          <div className="flex items-center justify-between">
            <div className="h-8 w-32 bg-muted animate-pulse rounded" />
            <div className="flex gap-4">
              <div className="h-8 w-20 bg-muted animate-pulse rounded" />
              <div className="h-8 w-20 bg-muted animate-pulse rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="container-wide py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {/* Hero section skeleton */}
          <div className="space-y-4">
            <div className="h-12 w-3/4 bg-muted animate-pulse rounded" />
            <div className="h-6 w-1/2 bg-muted animate-pulse rounded" />
            <div className="flex gap-4 mt-6">
              <div className="h-10 w-24 bg-muted animate-pulse rounded" />
              <div className="h-10 w-24 bg-muted animate-pulse rounded" />
            </div>
          </div>

          {/* Content grid skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} lines={4} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

