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
    if (preferencesLoading) return;

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

    // Если есть явно сохраненный язык в localStorage - используем его
    if (storedLanguage) {
      initialLanguage = storedLanguage;
    } else if (preferences.language && preferences.language !== 'en' && ['en', 'zh', 'es', 'ru', 'de', 'fr', 'pl'].includes(preferences.language)) {
      // Если язык не дефолтный и есть в preferences (для авторизованных пользователей из БД)
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
  }, [preferences.language, preferencesLoading, loadTranslationsForLanguage, updatePreferences]);

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

