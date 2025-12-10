import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SEOData, updateDocumentHead } from '@/utils/seo';

export function useSEO(data: SEOData) {
  // useLocation must be called unconditionally (React hooks rule)
  // We'll use it if available, otherwise fallback to window.location in useEffect
  let location: { pathname: string };
  try {
    location = useLocation();
  } catch (error) {
    // If useLocation fails, create a fallback location object
    // This shouldn't happen in normal usage, but handles edge cases
    location = { pathname: typeof window !== 'undefined' ? window.location.pathname : '/' };
  }

  useEffect(() => {
    try {
      // Get pathname - prefer location from hook, fallback to window
      const pathname = location?.pathname || (typeof window !== 'undefined' ? window.location.pathname : '/');
      
      // Update canonical URL with current path
      const fullUrl = `https://investopatronus.com${pathname}`;
      updateDocumentHead({
        ...data,
        url: fullUrl,
        canonical: fullUrl,
      });
    } catch (error) {
      console.error('useSEO error:', error);
    }
  }, [location?.pathname, data]);
}

