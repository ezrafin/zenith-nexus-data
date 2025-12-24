import type { SupportedLanguage } from '@/lib/i18n';

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
  const image = data.image || defaultSEO.image;
  const url = data.url || defaultSEO.url;
  const type = data.type || defaultSEO.type;
  const canonical = data.canonical || url;
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
    keywords: data.keywords,
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
        console.error(`Error updating meta tag ${name}:`, error);
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
    if (tags.alternateLanguages) {
      Object.entries(tags.alternateLanguages).forEach(([lang, langUrl]) => {
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
          console.error(`Error updating hreflang for ${lang}:`, error);
        }
      });
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
      console.error('Error updating canonical URL:', error);
    }
  } catch (error) {
    console.error('Error updating document head:', error);
  }
}

