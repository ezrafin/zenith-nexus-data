/**
 * Add skipToMainContent translation to all language files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LANGUAGES = ['zh', 'es', 'ru', 'de', 'fr', 'pl'];
const LOCALES_DIR = path.join(__dirname, '..', 'src', 'locales');

const translations = {
  zh: '跳转到主要内容',
  es: 'Saltar al contenido principal',
  ru: 'Перейти к основному содержимому',
  de: 'Zum Hauptinhalt springen',
  fr: 'Aller au contenu principal',
  pl: 'Przejdź do treści głównej'
};

for (const lang of LANGUAGES) {
  const filePath = path.join(LOCALES_DIR, lang, 'ui.json');
  const content = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(content);
  
  if (!data.common) {
    data.common = {};
  }
  
  if (!data.common.skipToMainContent) {
    data.common.skipToMainContent = translations[lang];
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log(`Added skipToMainContent to ${lang}/ui.json`);
  }
}

console.log('Done!');


