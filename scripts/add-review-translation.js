/**
 * Add review submitted translation to all language files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LANGUAGES = ['zh', 'es', 'ru', 'de', 'fr', 'pl'];
const LOCALES_DIR = path.join(__dirname, '..', 'src', 'locales');

const translations = {
  zh: '评价已提交审核',
  es: 'Reseña enviada para moderación',
  ru: 'Отзыв отправлен на модерацию',
  de: 'Bewertung zur Moderation eingereicht',
  fr: 'Avis soumis pour modération',
  pl: 'Recenzja przesłana do moderacji'
};

for (const lang of LANGUAGES) {
  const filePath = path.join(LOCALES_DIR, lang, 'ui.json');
  const content = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(content);
  
  if (!data.toast) {
    data.toast = {};
  }
  
  if (!data.toast.reviewSubmittedForModeration) {
    data.toast.reviewSubmittedForModeration = translations[lang];
  }
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`Added reviewSubmittedForModeration to ${lang}/ui.json`);
}

console.log('Done!');

