import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { SEOData, updateDocumentHead } from '@/utils/seo';
import { useI18n } from '@/context/I18nContext';
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '@/lib/i18n';
import { logger } from '@/lib/logger';
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateArticleSchema,
  generateCourseSchema,
  generateForumPostingSchema,
} from '@/utils/structuredData';

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
  locale?: string;
  alternateLanguages?: Record<SupportedLanguage, string>;
  siteName?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite?: string;
  twitterCreator?: string;
  structuredData?: object | object[];
  isHomepage?: boolean;
  isNewsPage?: boolean;
  isCoursePage?: boolean;
  isForumPage?: boolean;
}

const LOCALE_MAP: Record<SupportedLanguage, string> = {
  en: 'en_US',
  zh: 'zh_CN',
  es: 'es_ES',
  ru: 'ru_RU',
  de: 'de_DE',
  fr: 'fr_FR',
  pl: 'pl_PL',
};

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
  locale,
  alternateLanguages,
  siteName,
  twitterCard,
  twitterSite,
  twitterCreator,
  structuredData,
  isHomepage,
  isNewsPage,
  isCoursePage,
  isForumPage,
}: SEOHeadProps) {
  const { language } = useI18n();
  const structuredDataScriptIdRef = useRef<string | null>(null);
  
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
      const baseUrl = 'https://investopatronus.com';
      // Remove trailing slash for canonical URL
      const cleanPathname = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
      const fullUrl = `${baseUrl}${cleanPathname}`;
      
      // Only add hreflang if alternate language versions actually exist
      // For now, we don't have language-specific URLs, so we'll skip hreflang
      let generatedAlternateLanguages: Record<SupportedLanguage, string> | undefined;
      if (alternateLanguages && Object.keys(alternateLanguages).length > 0) {
        generatedAlternateLanguages = alternateLanguages;
      }
      
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
        locale: locale || LOCALE_MAP[language] || LOCALE_MAP.en,
        alternateLanguages: generatedAlternateLanguages,
        siteName,
        twitterCard,
        twitterSite,
        twitterCreator,
      });
    } catch (error) {
      logger.error('SEOHead update error:', error);
    }
  }, [
    location?.pathname,
    language,
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
    locale,
    alternateLanguages,
    siteName,
    twitterCard,
    twitterSite,
    twitterCreator,
  ]);

  // Inject structured data (JSON-LD)
  useEffect(() => {
    try {
      // Generate stable ID only once
      if (!structuredDataScriptIdRef.current) {
        structuredDataScriptIdRef.current = `structured-data-${Math.random().toString(36).substring(2, 11)}`;
      }

      const scriptId = structuredDataScriptIdRef.current;
      const pathname = location?.pathname || (typeof window !== 'undefined' ? window.location.pathname : '/');
      const baseUrl = 'https://investopatronus.com';
      const fullUrl = `${baseUrl}${pathname}`;

      // Build structured data array
      const schemas: object[] = [];

      // Always include Organization schema
      schemas.push(generateOrganizationSchema());

      // Add WebSite schema on homepage
      if (isHomepage || pathname === '/') {
        schemas.push(generateWebSiteSchema());
      }

      // Add custom structured data if provided
      if (structuredData) {
        const customData = Array.isArray(structuredData) ? structuredData : [structuredData];
        schemas.push(...customData);
      }

      // Inject JSON-LD script
      let script = document.getElementById(scriptId) as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }

      script.textContent = JSON.stringify(schemas);
    } catch (error) {
      logger.error('StructuredData injection error:', error);
    }
  }, [
    location?.pathname,
    structuredData,
    isHomepage,
    isNewsPage,
    isCoursePage,
    isForumPage,
  ]);

  return null;
}

