/**
 * i18n core module
 * Handles loading and caching translations with fallback to English
 */

export type SupportedLanguage = 'en' | 'zh' | 'es' | 'ru' | 'de' | 'fr' | 'pl';

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = ['en', 'zh', 'es', 'ru', 'de', 'fr', 'pl'];

export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  en: 'English',
  zh: '中文',
  es: 'Español',
  ru: 'Русский',
  de: 'Deutsch',
  fr: 'Français',
  pl: 'Polski',
};

// Cache for loaded translations
const translationCache: Record<string, Record<string, any>> = {};

/**
 * Detect browser language and return supported language code
 */
export function detectBrowserLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const supportedLanguages = SUPPORTED_LANGUAGES;
  
  // Try navigator.language first
  if (navigator.language) {
    const browserLang = navigator.language.split('-')[0].toLowerCase(); // 'en-US' → 'en'
    if (supportedLanguages.includes(browserLang as SupportedLanguage)) {
      return browserLang as SupportedLanguage;
    }
  }

  // Try navigator.languages array
  if (navigator.languages && navigator.languages.length > 0) {
    for (const lang of navigator.languages) {
      const langCode = lang.split('-')[0].toLowerCase();
      if (supportedLanguages.includes(langCode as SupportedLanguage)) {
        return langCode as SupportedLanguage;
      }
    }
  }

  // Fallback to English
  return 'en';
}

/**
 * Load translation file for a specific language and namespace
 */
export async function loadTranslation(
  language: SupportedLanguage,
  namespace: string
): Promise<Record<string, any>> {
  const cacheKey = `${language}:${namespace}`;

  // Return from cache if available
  if (translationCache[cacheKey]) {
    return translationCache[cacheKey];
  }

  try {
    // Dynamic import of translation file
    const translation = await import(`../locales/${language}/${namespace}.json`);
    const data = translation.default || translation;

    // Cache the translation
    translationCache[cacheKey] = data;

    return data;
  } catch (error) {
    // If translation file doesn't exist, try to load English fallback
    if (language !== 'en') {
      try {
        const fallback = await import(`../locales/en/${namespace}.json`);
        const data = fallback.default || fallback;
        translationCache[cacheKey] = data;
        return data;
      } catch {
        // If even English doesn't exist, return empty object
        console.warn(`Translation file not found: ${namespace} for ${language} or en`);
        return {};
      }
    }

    console.warn(`Translation file not found: ${namespace} for ${language}`);
    return {};
  }
}

/**
 * Get translation value with fallback
 */
export function getTranslation(
  translations: Record<string, any>,
  key: string,
  fallbackTranslations?: Record<string, any>
): string {
  const keys = key.split('.');
  let value: any = translations;

  // Navigate through nested keys
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Try fallback if available
      if (fallbackTranslations) {
        let fallbackValue: any = fallbackTranslations;
        for (const fk of keys) {
          if (fallbackValue && typeof fallbackValue === 'object' && fk in fallbackValue) {
            fallbackValue = fallbackValue[fk];
          } else {
            // Return key if not found in fallback either
            return key;
          }
        }
        return typeof fallbackValue === 'string' ? fallbackValue : key;
      }
      // Return key if not found
      return key;
    }
  }

  return typeof value === 'string' ? value : key;
}

/**
 * Clear translation cache (useful for development)
 */
export function clearTranslationCache(): void {
  Object.keys(translationCache).forEach((key) => {
    delete translationCache[key];
  });
}

/**
 * Map app language code to browser locale string
 */
export function getLocaleForLanguage(lang: SupportedLanguage): string {
  switch (lang) {
    case 'en':
      return 'en-US';
    case 'de':
      return 'de-DE';
    case 'fr':
      return 'fr-FR';
    case 'es':
      return 'es-ES';
    case 'pl':
      return 'pl-PL';
    case 'ru':
      return 'ru-RU';
    case 'zh':
      return 'zh-CN';
    default:
      return 'en-US';
  }
}

