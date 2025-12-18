import { useMemo } from 'react';
import { useI18n } from '@/context/I18nContext';
import { getTranslation, loadTranslation, type SupportedLanguage } from '@/lib/i18n';
import { useState, useEffect } from 'react';

interface UseTranslationOptions {
  namespace?: string;
}

/**
 * Hook for translations with automatic fallback to English
 */
export function useTranslation(options?: UseTranslationOptions) {
  const { language, translations, loading } = useI18n();
  const [namespaceTranslations, setNamespaceTranslations] = useState<Record<string, any>>({});
  const [namespaceLoading, setNamespaceLoading] = useState(false);

  const namespace = options?.namespace;

  // Load namespace translations if specified
  useEffect(() => {
    if (!namespace) return;

    const loadNamespace = async () => {
      setNamespaceLoading(true);
      try {
        const loaded = await loadTranslation(language, namespace);
        setNamespaceTranslations(loaded);
      } catch (error) {
        console.error(`Error loading namespace ${namespace}:`, error);
      } finally {
        setNamespaceLoading(false);
      }
    };

    loadNamespace();
  }, [namespace, language]);

  // Get fallback translations (English)
  const fallbackTranslations = useMemo(() => {
    if (language === 'en') return undefined;

    const fallback: Record<string, any> = {};
    if (translations.common) {
      fallback.common = translations.common;
    }
    if (translations.ui) {
      fallback.ui = translations.ui;
    }
    if (namespace && namespaceTranslations) {
      fallback[namespace] = namespaceTranslations;
    }

    return fallback;
  }, [language, translations, namespace, namespaceTranslations]);

  const t = (key: string, params?: string | Record<string, string | number>): string => {
    // If params is a string, treat it as namespace override (backward compatibility)
    const namespaceOverride = typeof params === 'string' ? params : undefined;
    const interpolationParams = typeof params === 'object' ? params : undefined;
    
    const targetNamespace = namespaceOverride || namespace || 'common';
    
    // Try to get from namespace translations first
    let targetTranslations: Record<string, any> | undefined;
    let fallback: Record<string, any> | undefined;

    if (targetNamespace === 'common') {
      targetTranslations = translations.common;
      fallback = fallbackTranslations?.common;
    } else if (targetNamespace === 'ui') {
      targetTranslations = translations.ui;
      fallback = fallbackTranslations?.ui;
    } else if (namespaceTranslations && Object.keys(namespaceTranslations).length > 0) {
      targetTranslations = namespaceTranslations;
      // For non-ui/common namespaces, try to load English fallback
      if (language !== 'en') {
        // Load English fallback for this namespace if needed
        // For now, we'll use the namespace translations and fallback to key
        fallback = undefined;
      }
    } else if (namespace && !namespaceTranslations) {
      // Namespace specified but not loaded yet - try to use ui/common as fallback
      if (targetNamespace.startsWith('ui.')) {
        // If key starts with 'ui.', use ui namespace
        const uiKey = targetNamespace.replace('ui.', '');
        targetTranslations = translations.ui;
        fallback = fallbackTranslations?.ui;
        return interpolate(getTranslation(targetTranslations, uiKey, fallback), interpolationParams);
      } else if (targetNamespace.startsWith('common.')) {
        const commonKey = targetNamespace.replace('common.', '');
        targetTranslations = translations.common;
        fallback = fallbackTranslations?.common;
        return interpolate(getTranslation(targetTranslations, commonKey, fallback), interpolationParams);
      }
    }

    if (!targetTranslations) {
      // If namespace not loaded yet, return key
      return interpolate(key, interpolationParams);
    }

    return interpolate(getTranslation(targetTranslations, key, fallback), interpolationParams);
  };

  // Helper function to interpolate {{variable}} placeholders
  const interpolate = (text: string, params?: Record<string, string | number>): string => {
    if (!params) return text;
    return text.replace(/\{\{(\w+)\}\}/g, (_, key) => {
      return params[key] !== undefined ? String(params[key]) : `{{${key}}}`;
    });
  };

  return {
    t,
    language,
    loading: loading || namespaceLoading,
  };
}

