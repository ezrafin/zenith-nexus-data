import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { detectBrowserLanguage, loadTranslation, type SupportedLanguage } from '@/lib/i18n';
import { logger } from '@/lib/logger';
import { LoadingScreen } from '@/components/layout/LoadingScreen';

interface I18nContextType {
  language: SupportedLanguage;
  changeLanguage: (lang: SupportedLanguage) => Promise<void>;
  translations: Record<string, Record<string, any>>;
  loading: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const { preferences, loading: preferencesLoading, updatePreferences } = useUserPreferences();
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [translations, setTranslations] = useState<Record<string, Record<string, any>>>({});
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [loadTimeout, setLoadTimeout] = useState(false);

  const loadTranslationsForLanguage = useCallback(async (lang: SupportedLanguage) => {
    setLoading(true);
    try {
      // Load all base namespaces in parallel for better performance
      // This prevents namespace-specific translation key flashes
      const [common, ui, forum, education, analytics, profile, companies] = await Promise.all([
        loadTranslation(lang, 'common'),
        loadTranslation(lang, 'ui'),
        loadTranslation(lang, 'forum').catch(() => ({})), // Graceful fallback if namespace doesn't exist
        loadTranslation(lang, 'education').catch(() => ({})),
        loadTranslation(lang, 'analytics').catch(() => ({})),
        loadTranslation(lang, 'profile').catch(() => ({})),
        loadTranslation(lang, 'companies').catch(() => ({})),
      ]);

      setTranslations({
        common,
        ui,
        forum,
        education,
        analytics,
        profile,
        companies,
      });
      return true; // Success
    } catch (error) {
      logger.error('Error loading translations:', error);
      // Even on error, set empty translations to allow app to render with fallback keys
      setTranslations({
        common: {},
        ui: {},
        forum: {},
        education: {},
        analytics: {},
        profile: {},
        companies: {},
      });
      return false; // Failed
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize language on mount
  useEffect(() => {
    if (preferencesLoading || isInitialized) return;

    const initializeLanguage = async () => {
      let initialLanguage: SupportedLanguage = 'en';
      
      // Проверяем, есть ли реально сохраненные настройки в localStorage
      const hasStoredPreferences = localStorage.getItem('userPreferences');
      let storedLanguage: SupportedLanguage | null = null;
      
      if (hasStoredPreferences) {
        try {
          const storedPrefs = JSON.parse(hasStoredPreferences);
          if (storedPrefs?.language && ['en', 'zh', 'es', 'ru', 'de', 'fr', 'pl'].includes(storedPrefs.language)) {
            storedLanguage = storedPrefs.language as SupportedLanguage;
          }
        } catch (e) {
          logger.error('Error parsing stored preferences:', e);
        }
      }

      // Приоритет: сохраненный язык > preferences.language > определение по браузеру
      if (storedLanguage) {
        initialLanguage = storedLanguage;
      } else if (preferences.language && ['en', 'zh', 'es', 'ru', 'de', 'fr', 'pl'].includes(preferences.language)) {
        initialLanguage = preferences.language as SupportedLanguage;
      } else {
        // Если нет сохраненного языка - определяем по браузеру
        initialLanguage = detectBrowserLanguage();
        // Сохраняем определенный язык в preferences (только если нет сохраненных настроек)
        if (!hasStoredPreferences) {
          updatePreferences({ language: initialLanguage }).catch((err) => logger.error('Error updating preferences:', err));
        }
      }

      setLanguage(initialLanguage);
      
      // Set a timeout to prevent infinite loading (5 seconds)
      const timeoutId = setTimeout(() => {
        logger.warn('Translation loading timeout - rendering app with fallback');
        setLoadTimeout(true);
        setIsInitialized(true);
      }, 5000);
      
      // Wait for translations to load before marking as initialized
      await loadTranslationsForLanguage(initialLanguage);
      clearTimeout(timeoutId);
      setIsInitialized(true);
    };

    initializeLanguage();
  }, [preferences.language, preferencesLoading, loadTranslationsForLanguage, updatePreferences, isInitialized]);

  const changeLanguage = useCallback(async (lang: SupportedLanguage) => {
    if (lang === language) return;

    setLanguage(lang);
    await loadTranslationsForLanguage(lang);

    // Update user preferences
    await updatePreferences({ language: lang });
  }, [language, loadTranslationsForLanguage, updatePreferences]);

  // Determine if we should show loading screen
  // Show loading if: preferences are loading, translations are loading, or translations are not ready
  // Check that critical namespaces (common and ui) are loaded
  // Other namespaces can load in background, but we need at least common and ui
  // If timeout occurred, render anyway (with fallback keys)
  const translationsReady = translations.common && translations.ui && 
    Object.keys(translations.common).length > 0 && Object.keys(translations.ui).length > 0;
  const isLoading = !loadTimeout && (preferencesLoading || loading || !isInitialized || !translationsReady);

  return (
    <I18nContext.Provider value={{ language, changeLanguage, translations, loading }}>
      {isLoading ? <LoadingScreen /> : children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

