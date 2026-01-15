import { getAllCourses } from '../src/data/courses';
import type { Course, ArticleContent } from '../src/data/courseTypes';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple translation mapping for common terms (can be expanded)
const translationMap: Record<string, string> = {
  'Introduction to': 'Wprowadzenie do',
  'Introduction': 'Wprowadzenie',
  'Learn:': 'Naucz się:',
  'Quiz:': 'Quiz:',
  'Practice:': 'Praktyka:',
  'Scarcity': 'Niedobór',
  'Economics': 'Ekonomia',
  'Economic': 'Ekonomiczny',
  'Market': 'Rynek',
  'Markets': 'Rynki',
  'Demand': 'Popyt',
  'Supply': 'Podaż',
  'Production': 'Produkcja',
  'Cost': 'Koszt',
  'Costs': 'Koszty',
  'Opportunity': 'Możliwość',
  'Trade': 'Handel',
  'GDP': 'PKB',
  'Inflation': 'Inflacja',
  'Unemployment': 'Bezrobocie',
  'Fiscal': 'Fiskalny',
  'Monetary': 'Monetarny',
  'Policy': 'Polityka',
  'Interest': 'Oprocentowanie',
  'Rate': 'Stopa',
  'Rates': 'Stopy',
  'Money': 'Pieniądze',
  'Banking': 'Bankowość',
  'Financial': 'Finansowy',
  'Finance': 'Finanse',
  'Investment': 'Inwestycja',
  'Investments': 'Inwestycje',
  'Stocks': 'Akcje',
  'Bonds': 'Obligacje',
  'Taxes': 'Podatki',
  'Tax': 'Podatek',
  'Personal': 'Osobisty',
  'Corporate': 'Korporacyjny',
  'Housing': 'Mieszkaniowy',
  'Credit': 'Kredyt',
  'Debt': 'Dług',
  'Insurance': 'Ubezpieczenie',
  'Retirement': 'Emerytura',
  'Savings': 'Oszczędności',
  'Budgeting': 'Budżetowanie',
  'Bankruptcy': 'Bankructwo',
  'Options': 'Opcje',
  'Futures': 'Futures',
  'Derivatives': 'Instrumenty pochodne',
};

// Function to translate text (simplified - in production would use translation API)
function translateToPolish(text: string): string {
  // Check if translation exists in map
  for (const [en, pl] of Object.entries(translationMap)) {
    if (text.includes(en)) {
      text = text.replace(new RegExp(en, 'g'), pl);
    }
  }
  
  // For now, return a placeholder that indicates translation is needed
  // In production, this would call a translation API
  return text;
}

// Function to translate important points
function translateImportantPoints(points: string[]): string[] {
  return points.map(point => {
    // Try to translate common patterns
    let translated = point;
    
    // Common patterns
    translated = translated.replace(/Economics studies how/g, 'Ekonomia bada, jak');
    translated = translated.replace(/studies how/g, 'bada, jak');
    translated = translated.replace(/is the fundamental/g, 'jest fundamentalnym');
    translated = translated.replace(/are factual/g, 'są oparte na faktach');
    translated = translated.replace(/are value judgments/g, 'są sądami wartościującymi');
    translated = translated.replace(/simplify reality/g, 'upraszczają rzeczywistość');
    translated = translated.replace(/to help us understand/g, 'aby pomóc nam zrozumieć');
    translated = translated.replace(/complex systems/g, 'złożone systemy');
    translated = translated.replace(/centrally planned/g, 'centralnie planowane');
    translated = translated.replace(/rely on/g, 'opierają się na');
    translated = translated.replace(/individual decisions/g, 'decyzje indywidualne');
    translated = translated.replace(/societies allocate/g, 'społeczeństwa alokują');
    translated = translated.replace(/scarce resources/g, 'ograniczone zasoby');
    translated = translated.replace(/economic problem/g, 'problemem ekonomicznym');
    
    // If no translation was applied, return original with note
    if (translated === point) {
      // For now, return a basic translation structure
      // In production, would use translation API
      return point; // Placeholder - needs manual translation
    }
    
    return translated;
  });
}

function main() {
  const courses = getAllCourses();
  const plEducationPath = path.join(__dirname, '../src/locales/pl/education.json');
  
  // Read existing Polish education.json
  let plTranslations: any = {};
  if (fs.existsSync(plEducationPath)) {
    const existingContent = fs.readFileSync(plEducationPath, 'utf-8');
    plTranslations = JSON.parse(existingContent);
  }
  
  // Ensure course structure exists
  if (!plTranslations.course) {
    plTranslations.course = {};
  }
  
  courses.forEach(course => {
    if (!plTranslations.course[course.id]) {
      plTranslations.course[course.id] = {};
    }
    if (!plTranslations.course[course.id].unit) {
      plTranslations.course[course.id].unit = {};
    }
    
    course.units.forEach(unit => {
      if (!plTranslations.course[course.id].unit[unit.id]) {
        plTranslations.course[course.id].unit[unit.id] = {
          lesson: {}
        };
      }
      
      unit.lessons.forEach(lesson => {
        if (!plTranslations.course[course.id].unit[unit.id].lesson[lesson.id]) {
          plTranslations.course[course.id].unit[unit.id].lesson[lesson.id] = {
            contentItem: {}
          };
        }
        
        lesson.contentItems.forEach(contentItem => {
          const itemKey = `course.${course.id}.unit.${unit.id}.lesson.${lesson.id}.contentItem.${contentItem.id}`;
          
          // Check if translation already exists
          if (plTranslations.course[course.id].unit[unit.id].lesson[lesson.id].contentItem[contentItem.id]) {
            // Skip if already translated
            return;
          }
          
          // Initialize content item
          if (!plTranslations.course[course.id].unit[unit.id].lesson[lesson.id].contentItem[contentItem.id]) {
            plTranslations.course[course.id].unit[unit.id].lesson[lesson.id].contentItem[contentItem.id] = {};
          }
          
          // Translate title
          if (contentItem.title) {
            const translatedTitle = translateToPolish(contentItem.title);
            plTranslations.course[course.id].unit[unit.id].lesson[lesson.id].contentItem[contentItem.id].title = translatedTitle;
          }
          
          // Translate importantPoints for articles
          if (contentItem.type === 'article') {
            const articleContent = contentItem as ArticleContent;
            if (articleContent.importantPoints && articleContent.importantPoints.length > 0) {
              const translatedPoints = translateImportantPoints(articleContent.importantPoints);
              plTranslations.course[course.id].unit[unit.id].lesson[lesson.id].contentItem[contentItem.id].importantPoints = translatedPoints;
            }
          }
        });
      });
    });
  });
  
  // Write updated translations
  fs.writeFileSync(plEducationPath, JSON.stringify(plTranslations, null, 2), 'utf-8');
  console.log('Polish translations structure updated!');
  console.log('Note: Some translations may need manual review for quality.');
}

main();

