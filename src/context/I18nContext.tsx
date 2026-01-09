import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { detectBrowserLanguage, loadTranslation, type SupportedLanguage } from '@/lib/i18n';

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

  const loadTranslationsForLanguage = useCallback(async (lang: SupportedLanguage) => {
    setLoading(true);
    try {
      const [common, ui] = await Promise.all([
        loadTranslation(lang, 'common'),
        loadTranslation(lang, 'ui'),
      ]);

      setTranslations({
        common,
        ui,
      });
    } catch (error) {
      console.error('Error loading translations:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize language on mount
  useEffect(() => {
    if (preferencesLoading || isInitialized) return;

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
        console.error('Error parsing stored preferences:', e);
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
        updatePreferences({ language: initialLanguage }).catch(console.error);
      }
    }

    setLanguage(initialLanguage);
    loadTranslationsForLanguage(initialLanguage);
    setIsInitialized(true);
  }, [preferences.language, preferencesLoading, loadTranslationsForLanguage, updatePreferences, isInitialized]);

  const changeLanguage = useCallback(async (lang: SupportedLanguage) => {
    if (lang === language) return;

    setLanguage(lang);
    await loadTranslationsForLanguage(lang);

    // Update user preferences
    await updatePreferences({ language: lang });
  }, [language, loadTranslationsForLanguage, updatePreferences]);

  return (
    <I18nContext.Provider value={{ language, changeLanguage, translations, loading }}>
      {children}
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

