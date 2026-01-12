/**
 * Add GlobalSearch translation keys to all language files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LANGUAGES = ['zh', 'es', 'ru', 'de', 'fr', 'pl'];
const LOCALES_DIR = path.join(__dirname, '..', 'src', 'locales');

const translations = {
  zh: {
    openAriaLabel: '打开全局搜索 (Cmd+K 或 Ctrl+K)',
    closeAriaLabel: '关闭搜索',
    inputAriaLabel: '搜索输入框',
    dialogTitle: '全局搜索',
    dialogDescription: '搜索公司、新闻文章、论坛讨论、市场代码和作者。使用筛选器缩小结果范围。',
    dialogAriaLabel: '全局搜索对话框',
    clearAriaLabel: '清除搜索'
  },
  es: {
    openAriaLabel: 'Abrir búsqueda global (Cmd+K o Ctrl+K)',
    closeAriaLabel: 'Cerrar búsqueda',
    inputAriaLabel: 'Campo de búsqueda',
    dialogTitle: 'Búsqueda Global',
    dialogDescription: 'Buscar en empresas, artículos de noticias, discusiones del foro, símbolos de mercado y autores. Use filtros para reducir los resultados.',
    dialogAriaLabel: 'Diálogo de búsqueda global',
    clearAriaLabel: 'Limpiar búsqueda'
  },
  ru: {
    openAriaLabel: 'Открыть глобальный поиск (Cmd+K или Ctrl+K)',
    closeAriaLabel: 'Закрыть поиск',
    inputAriaLabel: 'Поле поиска',
    dialogTitle: 'Глобальный поиск',
    dialogDescription: 'Поиск по компаниям, новостным статьям, обсуждениям на форуме, тикерам рынка и авторам. Используйте фильтры для сужения результатов.',
    dialogAriaLabel: 'Диалог глобального поиска',
    clearAriaLabel: 'Очистить поиск'
  },
  de: {
    openAriaLabel: 'Globale Suche öffnen (Cmd+K oder Strg+K)',
    closeAriaLabel: 'Suche schließen',
    inputAriaLabel: 'Suchfeld',
    dialogTitle: 'Globale Suche',
    dialogDescription: 'Durchsuchen Sie Unternehmen, Nachrichtenartikel, Forumsdiskussionen, Marktticker und Autoren. Verwenden Sie Filter, um die Ergebnisse einzugrenzen.',
    dialogAriaLabel: 'Dialog für globale Suche',
    clearAriaLabel: 'Suche löschen'
  },
  fr: {
    openAriaLabel: 'Ouvrir la recherche globale (Cmd+K ou Ctrl+K)',
    closeAriaLabel: 'Fermer la recherche',
    inputAriaLabel: 'Champ de recherche',
    dialogTitle: 'Recherche Globale',
    dialogDescription: 'Rechercher parmi les entreprises, articles de presse, discussions du forum, tickers de marché et auteurs. Utilisez les filtres pour affiner les résultats.',
    dialogAriaLabel: 'Dialogue de recherche globale',
    clearAriaLabel: 'Effacer la recherche'
  },
  pl: {
    openAriaLabel: 'Otwórz wyszukiwanie globalne (Cmd+K lub Ctrl+K)',
    closeAriaLabel: 'Zamknij wyszukiwanie',
    inputAriaLabel: 'Pole wyszukiwania',
    dialogTitle: 'Wyszukiwanie Globalne',
    dialogDescription: 'Wyszukaj w firmach, artykułach prasowych, dyskusjach na forum, tickerach rynkowych i autorach. Użyj filtrów, aby zawęzić wyniki.',
    dialogAriaLabel: 'Okno dialogowe wyszukiwania globalnego',
    clearAriaLabel: 'Wyczyść wyszukiwanie'
  }
};

function setNestedValue(obj, key, value) {
  const keys = key.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    if (!(k in current) || typeof current[k] !== 'object' || current[k] === null) {
      current[k] = {};
    }
    current = current[k];
  }
  current[keys[keys.length - 1]] = value;
}

for (const lang of LANGUAGES) {
  const filePath = path.join(LOCALES_DIR, lang, 'ui.json');
  const content = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(content);
  
  if (!data.globalSearch) {
    data.globalSearch = {};
  }
  
  const langTranslations = translations[lang];
  for (const [key, value] of Object.entries(langTranslations)) {
    if (!data.globalSearch[key]) {
      data.globalSearch[key] = value;
    }
  }
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`Added GlobalSearch translations to ${lang}/ui.json`);
}

console.log('Done!');

