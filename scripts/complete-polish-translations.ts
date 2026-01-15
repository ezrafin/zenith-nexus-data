import { getAllCourses } from '../src/data/courses';
import type { Course, ArticleContent } from '../src/data/courseTypes';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read Russian translations
function loadRussianTranslations(): any {
  const ruPath = path.join(__dirname, '../src/locales/ru/education.json');
  if (fs.existsSync(ruPath)) {
    const content = fs.readFileSync(ruPath, 'utf-8');
    return JSON.parse(content);
  }
  return {};
}

// Simple translation function - for production use professional translation API
function translateRuToPl(text: string): string {
  // Common economic terms dictionary
  const terms: Record<string, string> = {
    'Соокупный': 'zagregowany',
    'совокупный': 'zagregowany',
    'Предложение': 'Podaż',
    'предложение': 'podaż',
    'Мультипликаторы': 'Mnożniki',
    'мультипликаторы': 'mnożniki',
    'Краткосрочное': 'Krótkoterminowa',
    'краткосрочное': 'krótkoterminowa',
    'Долгосрочное': 'Długoterminowa',
    'долгосрочное': 'długoterminowa',
    'Равновесие': 'Równowaga',
    'равновесие': 'równowaga',
    'Изменения': 'Zmiany',
    'изменения': 'zmiany',
    'Саморегуляция': 'Samoregulacja',
    'саморегуляция': 'samoregulacja',
    'Автоматические': 'Automatyczne',
    'автоматические': 'automatyczne',
    'стабилизаторы': 'stabilizatory',
    'Стабилизаторы': 'Stabilizatory',
    'Финансовые': 'Finansowe',
    'финансовые': 'finansowe',
    'активы': 'aktywa',
    'Активы': 'Aktywa',
  };

  let translated = text;
  
  // Replace common terms
  for (const [ru, pl] of Object.entries(terms)) {
    translated = translated.replace(new RegExp(ru, 'g'), pl);
  }
  
  // If still contains Cyrillic, return original (needs manual translation)
  if (/[А-Яа-яЁё]/.test(translated)) {
    return text; // Return original to mark as needing translation
  }
  
  return translated;
}

function main() {
  const courses = getAllCourses();
  const plEducationPath = path.join(__dirname, '../src/locales/pl/education.json');
  const ruTranslations = loadRussianTranslations();
  
  // Read existing Polish education.json
  let plTranslations: any = {};
  if (fs.existsSync(plEducationPath)) {
    const existingContent = fs.readFileSync(plEducationPath, 'utf-8');
    plTranslations = JSON.parse(existingContent);
  }
  
  let fixedCount = 0;
  let needsManualCount = 0;
  
  courses.forEach(course => {
    if (!plTranslations.course[course.id]?.unit) return;
    
    course.units.forEach(unit => {
      if (!plTranslations.course[course.id].unit[unit.id]?.lesson) return;
      
      unit.lessons.forEach(lesson => {
        if (!plTranslations.course[course.id].unit[unit.id].lesson[lesson.id]?.contentItem) return;
        
        lesson.contentItems.forEach(contentItem => {
          const plItem = plTranslations.course[course.id].unit[unit.id].lesson[lesson.id].contentItem[contentItem.id];
          const ruItem = ruTranslations.course?.[course.id]?.unit?.[unit.id]?.lesson?.[lesson.id]?.contentItem?.[contentItem.id];
          
          if (!plItem || !ruItem) return;
          
          // Fix title if contains Cyrillic
          if (plItem.title && /[А-Яа-яЁё]/.test(plItem.title) && ruItem.title) {
            // Use Russian translation as base and translate
            const translated = translateRuToPl(ruItem.title);
            if (translated !== ruItem.title) {
              plItem.title = translated;
              fixedCount++;
            } else {
              needsManualCount++;
            }
          }
          
          // Fix importantPoints if contains Cyrillic
          if (contentItem.type === 'article' && plItem.importantPoints && Array.isArray(plItem.importantPoints)) {
            const hasCyrillic = plItem.importantPoints.some((point: string) => /[А-Яа-яЁё]/.test(point));
            if (hasCyrillic && ruItem.importantPoints && Array.isArray(ruItem.importantPoints)) {
              plItem.importantPoints = ruItem.importantPoints.map((point: string) => {
                const translated = translateRuToPl(point);
                if (translated !== point) {
                  fixedCount++;
                  return translated;
                } else {
                  needsManualCount++;
                  return point; // Keep original, needs manual translation
                }
              });
            }
          }
        });
      });
    });
  });
  
  // Write updated translations
  fs.writeFileSync(plEducationPath, JSON.stringify(plTranslations, null, 2), 'utf-8');
  console.log(`✅ Polish translations updated!`);
  console.log(`   Fixed: ${fixedCount} items`);
  console.log(`   Needs manual review: ${needsManualCount} items`);
}

main();


