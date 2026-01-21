import { useEffect, useRef } from 'react';
import { logger } from '@/lib/logger';

// Global set to track prefetched routes across hook instances
const globalPrefetchedRoutes = new Set<string>();

/**
 * Hook to prefetch route chunks on link hover
 * Improves perceived performance by loading pages before user clicks
 */
export function useRoutePrefetch() {
  const prefetchTimeoutRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  useEffect(() => {
    const handleMouseEnter = (event: MouseEvent) => {
      const target = event.target;
      
      // Check if target is an Element (not a text node or other non-element)
      if (!target || !(target instanceof Element)) {
        return;
      }
      
      const link = target.closest('a[href]') as HTMLAnchorElement;
      
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return;
      }

      // Only prefetch internal routes
      if (href.startsWith('http') && !href.startsWith(window.location.origin)) {
        return;
      }

      // Extract route path
      const routePath = href.startsWith('/') ? href : new URL(href, window.location.origin).pathname;
      
      // Skip if already prefetched or currently prefetching
      if (globalPrefetchedRoutes.has(routePath)) {
        return;
      }

      // Debounce prefetch to avoid excessive requests
      const existingTimeout = prefetchTimeoutRef.current.get(routePath);
      if (existingTimeout) {
        clearTimeout(existingTimeout);
      }

      const timeoutId = setTimeout(() => {
        prefetchRoute(routePath);
        prefetchTimeoutRef.current.delete(routePath);
      }, 100); // 100ms delay to avoid prefetching on accidental hovers

      prefetchTimeoutRef.current.set(routePath, timeoutId);
    };

    const handleMouseLeave = (event: MouseEvent) => {
      const target = event.target;
      
      // Check if target is an Element (not a text node or other non-element)
      if (!target || !(target instanceof Element)) {
        return;
      }
      
      const link = target.closest('a[href]') as HTMLAnchorElement;
      
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      const routePath = href.startsWith('/') ? href : new URL(href, window.location.origin).pathname;
      
      // Cancel prefetch if user moves away quickly
      const timeoutId = prefetchTimeoutRef.current.get(routePath);
      if (timeoutId) {
        clearTimeout(timeoutId);
        prefetchTimeoutRef.current.delete(routePath);
      }
    };

    // Add event listeners to document for event delegation
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      
      // Clear all pending timeouts
      prefetchTimeoutRef.current.forEach(timeoutId => clearTimeout(timeoutId));
      prefetchTimeoutRef.current.clear();
    };
  }, []);

  return { prefetchedRoutes: globalPrefetchedRoutes };
}

/**
 * Prefetch a route by creating a link element with prefetch
 * This works with Vite's code splitting and React.lazy
 */
function prefetchRoute(routePath: string) {
  if (globalPrefetchedRoutes.has(routePath)) {
    return;
  }

  try {
    // Map route paths to their corresponding page imports
    const routeMap: Record<string, () => Promise<any>> = {
      '/news': () => import('../pages/NewsPage'),
      '/markets': () => import('../pages/MarketsPage'),
      '/analytics': () => import('../pages/AnalyticsPage'),
      '/forum': () => import('../pages/ForumPage'),
      '/community': () => import('../pages/CommunityPage'),
      '/companies': () => import('../pages/CompaniesPage'),
      '/learning': () => import('../pages/education/LearningPage'),
      '/academy': () => import('../pages/course/CourseListingPage'),
      '/profile': () => import('../pages/auth/ProfilePage'),
      '/settings': () => import('../pages/SettingsPage'),
      '/watchlists': () => import('../pages/WatchlistPage'),
      '/bookmarks': () => import('../pages/BookmarksPage'),
      '/about': () => import('../pages/AboutPage'),
      '/contact': () => import('../pages/ContactPage'),
    };

    // Check if route matches a known lazy-loaded page
    const matchedRoute = Object.keys(routeMap).find(route => 
      routePath === route || routePath.startsWith(route + '/')
    );

    if (matchedRoute && routeMap[matchedRoute]) {
      // Prefetch the page chunk
      routeMap[matchedRoute]().catch((error) => {
        logger.warn(`Failed to prefetch route ${routePath}:`, error);
      });
      
      globalPrefetchedRoutes.add(routePath);
    } else {
      // For unknown routes, use HTML prefetch as fallback
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = routePath;
      document.head.appendChild(link);
      globalPrefetchedRoutes.add(routePath);
    }
  } catch (error) {
    logger.warn(`Error prefetching route ${routePath}:`, error);
  }
}

export { globalPrefetchedRoutes as prefetchedRoutes };

