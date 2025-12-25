import { formatDistanceToNow } from 'date-fns';
import { enUS, ru, de, fr, es, pl, zhCN } from 'date-fns/locale';

const locales: Record<string, Locale> = {
  en: enUS,
  ru: ru,
  de: de,
  fr: fr,
  es: es,
  pl: pl,
  zh: zhCN,
};

export function formatRelativeTime(date: Date, language: string = 'en'): string {
  const locale = locales[language] || locales.en;
  return formatDistanceToNow(date, { addSuffix: true, locale });
}

