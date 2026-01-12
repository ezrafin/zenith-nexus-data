/**
 * Hardcoded string detector
 * Finds potential untranslated English strings in codebase
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.join(__dirname, '..', 'src');
const EXCLUDE_DIRS = ['node_modules', '.next', 'dist', 'build', 'locales'];
const EXCLUDE_FILES = ['.test.', '.spec.', '.d.ts'];

// Common English words/phrases that should be translated
const ENGLISH_PATTERNS = [
  /["'](Please|Error|Success|Loading|Failed|Cancel|Save|Delete|Edit|Create|Update|Submit|Close|Back|Next|Previous|Search|Filter|Clear|Apply|Reset|Confirm|Sign in|Sign out|Register|Login|Profile|Settings|View|Menu|Retry)[^"']*["']/gi,
  /["'](An error occurred|Operation completed|Please sign in|Please enter|Please select|Please wait|Try again|Not found|No data available)[^"']*["']/gi,
  /aria-label=["']([A-Z][a-z]+ [a-z]+[^"']*)["']/gi,
  /placeholder=["']([A-Z][a-z]+[^"']*)["']/gi,
  /title=["']([A-Z][a-z]+ [a-z]+[^"']*)["']/gi,
];

// Known exceptions (brand names, technical terms, etc.)
const EXCEPTIONS = [
  'INVESTOPATRONUS',
  'Google',
  'Supabase',
  'Vercel',
  'React',
  'TypeScript',
  'JavaScript',
  'HTML',
  'CSS',
  'API',
  'URL',
  'PDF',
  'DOC',
  'DOCX',
  'CPM',
  'ETF',
  'AUM',
  'P/E',
  'P/B',
  'DCF',
  'RSI',
  'MACD',
  'ESG',
  'JWT',
];

/**
 * Check if string is an exception
 */
function isException(str) {
  return EXCEPTIONS.some(exception => 
    str.includes(exception) || str.toUpperCase() === exception.toUpperCase()
  );
}

/**
 * Check if file should be excluded
 */
function shouldExclude(filePath) {
  const relativePath = path.relative(SRC_DIR, filePath);
  return EXCLUDE_DIRS.some(dir => relativePath.includes(dir)) ||
         EXCLUDE_FILES.some(pattern => filePath.includes(pattern));
}

/**
 * Find all TypeScript/TSX files
 */
function findSourceFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && !shouldExclude(filePath)) {
      findSourceFiles(filePath, fileList);
    } else if ((file.endsWith('.tsx') || file.endsWith('.ts')) && !shouldExclude(filePath)) {
      fileList.push(filePath);
    }
  }

  return fileList;
}

/**
 * Check if line uses translation function
 */
function usesTranslation(line) {
  return line.includes('t(') || 
         line.includes('useTranslation') ||
         line.includes('t(`') ||
         line.includes("t('");
}

/**
 * Scan file for hardcoded strings
 */
function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const issues = [];

  lines.forEach((line, index) => {
    // Skip comments and imports
    if (line.trim().startsWith('//') || 
        line.trim().startsWith('/*') ||
        line.trim().startsWith('*') ||
        line.includes('import ') ||
        line.includes('export ')) {
      return;
    }

    // Skip if already using translation
    if (usesTranslation(line)) {
      return;
    }

    // Check for English patterns
    for (const pattern of ENGLISH_PATTERNS) {
      const matches = line.matchAll(pattern);
      for (const match of matches) {
        const str = match[1] || match[0];
        if (str && !isException(str) && str.length > 3) {
          issues.push({
            line: index + 1,
            content: line.trim(),
            match: str,
            file: path.relative(SRC_DIR, filePath)
          });
        }
      }
    }
  });

  return issues;
}

/**
 * Main function
 */
function findHardcodedStrings() {
  console.log('Scanning for hardcoded strings...\n');
  
  const files = findSourceFiles(SRC_DIR);
  console.log(`Found ${files.length} source files to scan\n`);

  const allIssues = [];
  
  for (const file of files) {
    const issues = scanFile(file);
    if (issues.length > 0) {
      allIssues.push({
        file: path.relative(SRC_DIR, file),
        issues
      });
    }
  }

  // Group by file
  console.log('=== HARDCODED STRINGS FOUND ===\n');
  
  if (allIssues.length === 0) {
    console.log('No hardcoded strings found! ✓');
    return [];
  }

  for (const fileResult of allIssues) {
    console.log(`\n${fileResult.file}:`);
    fileResult.issues.forEach(issue => {
      console.log(`  Line ${issue.line}: ${issue.match}`);
      console.log(`    ${issue.content.substring(0, 80)}...`);
    });
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Total files with issues: ${allIssues.length}`);
  console.log(`Total issues: ${allIssues.reduce((sum, f) => sum + f.issues.length, 0)}`);

  // Write report
  const reportPath = path.join(__dirname, '..', 'hardcoded-strings-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(allIssues, null, 2));
  console.log(`\nReport saved to: ${reportPath}`);

  return allIssues;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  findHardcodedStrings();
}

export { findHardcodedStrings };

