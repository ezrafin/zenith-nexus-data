import type { SupportedLanguage } from '@/lib/i18n';
import { logger } from '@/lib/logger';

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  nofollow?: boolean;
  canonical?: string;
  locale?: string;
  alternateLanguages?: Record<SupportedLanguage, string>;
  siteName?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite?: string;
  twitterCreator?: string;
}

const defaultSEO = {
  title: 'INVESTOPATRONUS — Your Guardian in Global Markets',
  description: 'Professional financial market analytics, real-time data, and expert insights for informed investment decisions.',
  keywords: 'financial markets, stock market analysis, crypto trading, investment insights, market data, financial analytics, trading platform, investment education, market news, financial news',
  image: 'https://investopatronus.com/investo.png',
  url: 'https://investopatronus.com',
  type: 'website',
  siteName: 'INVESTOPATRONUS',
  locale: 'en_US',
  twitterCard: 'summary_large_image' as const,
};

export function generateSEOTags(data: SEOData = {}) {
  const title = data.title 
    ? `${data.title} | INVESTOPATRONUS`
    : defaultSEO.title;
  
  const description = data.description || defaultSEO.description;
  const keywords = data.keywords || defaultSEO.keywords;
  const image = data.image || defaultSEO.image;
  const url = data.url || defaultSEO.url;
  const type = data.type || defaultSEO.type;
  // Ensure canonical URL is absolute and has no trailing slash (except for root)
  let canonical = data.canonical || url;
  if (canonical && canonical !== 'https://investopatronus.com' && canonical !== 'https://investopatronus.com/' && canonical.endsWith('/')) {
    canonical = canonical.slice(0, -1);
  }
  const locale = data.locale || defaultSEO.locale;
  const siteName = data.siteName || defaultSEO.siteName;
  const twitterCard = data.twitterCard || defaultSEO.twitterCard;

  const robots = [
    data.noindex ? 'noindex' : 'index',
    data.nofollow ? 'nofollow' : 'follow',
  ].join(', ');

  return {
    title,
    description,
    keywords,
    image,
    url,
    type,
    author: data.author,
    publishedTime: data.publishedTime,
    modifiedTime: data.modifiedTime,
    robots,
    canonical,
    locale,
    siteName,
    twitterCard,
    alternateLanguages: data.alternateLanguages,
    twitterSite: data.twitterSite,
    twitterCreator: data.twitterCreator,
  };
}

export function updateDocumentHead(seoData: SEOData) {
  try {
    const tags = generateSEOTags(seoData);

    // Update title
    if (document.title !== tags.title) {
      document.title = tags.title;
    }

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
      try {
        let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
        if (!element) {
          element = document.createElement('meta');
          element.setAttribute(attribute, name);
          document.head.appendChild(element);
        }
        element.setAttribute('content', content);
      } catch (error) {
        logger.error(`Error updating meta tag ${name}:`, error);
      }
    };

    // Basic meta tags
    updateMetaTag('description', tags.description);
    if (tags.keywords) {
      updateMetaTag('keywords', tags.keywords);
    }
    updateMetaTag('robots', tags.robots);

    // Open Graph tags
    updateMetaTag('og:title', tags.title, 'property');
    updateMetaTag('og:description', tags.description, 'property');
    updateMetaTag('og:image', tags.image, 'property');
    updateMetaTag('og:url', tags.url, 'property');
    updateMetaTag('og:type', tags.type, 'property');
    updateMetaTag('og:locale', tags.locale, 'property');
    updateMetaTag('og:site_name', tags.siteName, 'property');
    
    if (tags.type === 'article') {
      if (tags.author) {
        updateMetaTag('article:author', tags.author, 'property');
      }
      if (tags.publishedTime) {
        updateMetaTag('article:published_time', tags.publishedTime, 'property');
      }
      if (tags.modifiedTime) {
        updateMetaTag('article:modified_time', tags.modifiedTime, 'property');
      }
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', tags.twitterCard);
    updateMetaTag('twitter:title', tags.title);
    updateMetaTag('twitter:description', tags.description);
    updateMetaTag('twitter:image', tags.image);
    if (tags.twitterSite) {
      updateMetaTag('twitter:site', tags.twitterSite);
    }
    if (tags.twitterCreator) {
      updateMetaTag('twitter:creator', tags.twitterCreator);
    }

    // Hreflang tags for alternate languages
    // Only add hreflang if alternate language versions actually exist
    // Remove any existing hreflang tags that point to the same URL (incorrect implementation)
    if (tags.alternateLanguages && Object.keys(tags.alternateLanguages).length > 0) {
      // Remove existing incorrect hreflang tags first
      const existingHreflang = document.querySelectorAll('link[rel="alternate"][hreflang]');
      existingHreflang.forEach((link) => {
        const href = link.getAttribute('href');
        const hreflang = link.getAttribute('hreflang');
        // Remove if it points to the same URL as current page (incorrect)
        if (href === tags.url && hreflang !== 'x-default') {
          link.remove();
        }
      });

      // Add x-default hreflang
      try {
        let defaultHreflang = document.querySelector('link[rel="alternate"][hreflang="x-default"]') as HTMLLinkElement;
        if (!defaultHreflang) {
          defaultHreflang = document.createElement('link');
          defaultHreflang.setAttribute('rel', 'alternate');
          defaultHreflang.setAttribute('hreflang', 'x-default');
          document.head.appendChild(defaultHreflang);
        }
        defaultHreflang.setAttribute('href', tags.url);
      } catch (error) {
        logger.error('Error updating x-default hreflang:', error);
      }

      // Add language-specific hreflang tags only if URLs are different
      Object.entries(tags.alternateLanguages).forEach(([lang, langUrl]) => {
        // Only add if URL is different from current page
        if (langUrl !== tags.url) {
          try {
            let hreflangLink = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`) as HTMLLinkElement;
            if (!hreflangLink) {
              hreflangLink = document.createElement('link');
              hreflangLink.setAttribute('rel', 'alternate');
              hreflangLink.setAttribute('hreflang', lang);
              document.head.appendChild(hreflangLink);
            }
            hreflangLink.setAttribute('href', langUrl);
          } catch (error) {
            logger.error(`Error updating hreflang for ${lang}:`, error);
          }
        }
      });
    } else {
      // Remove all hreflang tags if no alternate languages are provided
      const existingHreflang = document.querySelectorAll('link[rel="alternate"][hreflang]');
      existingHreflang.forEach((link) => link.remove());
    }

    // Canonical URL
    try {
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', tags.canonical);
    } catch (error) {
      logger.error('Error updating canonical URL:', error);
    }
  } catch (error) {
    logger.error('Error updating document head:', error);
  }
}

