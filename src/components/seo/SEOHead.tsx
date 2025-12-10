import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SEOData, updateDocumentHead } from '@/utils/seo';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

export function SEOHead({
  title,
  description,
  keywords,
  image,
  type,
  author,
  publishedTime,
  modifiedTime,
  noindex,
  nofollow,
}: SEOHeadProps) {
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
      const fullUrl = `https://investopatronus.com${pathname}`;
      
      updateDocumentHead({
        title,
        description,
        keywords,
        image,
        url: fullUrl,
        canonical: fullUrl,
        type: type || 'website',
        author,
        publishedTime,
        modifiedTime,
        noindex,
        nofollow,
      });
    } catch (error) {
      console.error('SEOHead update error:', error);
    }
  }, [
    location?.pathname,
    title,
    description,
    keywords,
    image,
    type,
    author,
    publishedTime,
    modifiedTime,
    noindex,
    nofollow,
  ]);

  return null;
}

