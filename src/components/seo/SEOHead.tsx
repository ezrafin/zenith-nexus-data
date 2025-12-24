import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SEOData, updateDocumentHead } from '@/utils/seo';
import { useI18n } from '@/context/I18nContext';
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '@/lib/i18n';

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
}: SEOHeadProps) {
  const { language } = useI18n();
  
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
      const fullUrl = `${baseUrl}${pathname}`;
      
      // Generate alternate language URLs if not provided
      const generatedAlternateLanguages: Record<SupportedLanguage, string> = alternateLanguages || {};
      if (!alternateLanguages) {
        SUPPORTED_LANGUAGES.forEach((lang) => {
          // For now, we'll use the same URL for all languages
          // In a real implementation, you might want to add language prefixes like /en/, /ru/, etc.
          generatedAlternateLanguages[lang] = fullUrl;
        });
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
      console.error('SEOHead update error:', error);
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

  return null;
}

