/**
 * Generate comprehensive translation coverage report
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LANGUAGES = ['en', 'zh', 'es', 'ru', 'de', 'fr', 'pl'];
const NAMESPACES = ['ui', 'forum', 'profile', 'analytics', 'education', 'common'];
const LOCALES_DIR = path.join(__dirname, '..', 'src', 'locales');

function getAllKeys(obj, prefix = '') {
  const keys = [];
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys.push(...getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

function loadJSON(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
}

function getNestedValue(obj, key) {
  const keys = key.split('.');
  let value = obj;
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return undefined;
    }
  }
  return value;
}

// Load audit report if exists
const auditReportPath = path.join(__dirname, '..', 'translation-audit-report.json');
let auditReport = null;
if (fs.existsSync(auditReportPath)) {
  auditReport = JSON.parse(fs.readFileSync(auditReportPath, 'utf8'));
}

const report = {
  generatedAt: new Date().toISOString(),
  summary: {
    totalNamespaces: NAMESPACES.length,
    totalLanguages: LANGUAGES.length - 1, // Exclude English
    totalKeys: 0,
    totalTranslations: 0,
    coverage: {}
  },
  namespaces: {},
  recommendations: []
};

let totalKeys = 0;
let totalTranslations = 0;

for (const namespace of NAMESPACES) {
  const baselineFile = path.join(LOCALES_DIR, 'en', `${namespace}.json`);
  const baseline = loadJSON(baselineFile);
  
  if (!baseline) continue;
  
  const baselineKeys = getAllKeys(baseline);
  totalKeys += baselineKeys.length;
  
  const namespaceReport = {
    namespace,
    totalKeys: baselineKeys.length,
    languages: {},
    coverage: {}
  };
  
  let namespaceTranslations = 0;
  
  for (const lang of LANGUAGES) {
    if (lang === 'en') continue;
    
    const langFile = path.join(LOCALES_DIR, lang, `${namespace}.json`);
    const langData = loadJSON(langFile);
    
    if (!langData) {
      namespaceReport.languages[lang] = {
        exists: false,
        translatedKeys: 0,
        missingKeys: baselineKeys.length,
        coverage: 0
      };
      continue;
    }
    
    const langKeys = getAllKeys(langData);
    let translatedCount = 0;
    const missingKeys = [];
    
    for (const key of baselineKeys) {
      const value = getNestedValue(langData, key);
      if (value !== undefined && value !== '') {
        translatedCount++;
        namespaceTranslations++;
        totalTranslations++;
      } else {
        missingKeys.push(key);
      }
    }
    
    const coverage = baselineKeys.length > 0 
      ? (translatedCount / baselineKeys.length) * 100 
      : 100;
    
    namespaceReport.languages[lang] = {
      exists: true,
      translatedKeys: translatedCount,
      missingKeys: missingKeys.length,
      coverage: Math.round(coverage * 100) / 100,
      orphanedKeys: langKeys.filter(k => !baselineKeys.includes(k)).length
    };
  }
  
  // Calculate namespace coverage
  const namespaceCoverage = baselineKeys.length > 0
    ? (namespaceTranslations / (baselineKeys.length * (LANGUAGES.length - 1))) * 100
    : 100;
  
  namespaceReport.coverage = Math.round(namespaceCoverage * 100) / 100;
  report.namespaces[namespace] = namespaceReport;
}

// Overall coverage
report.summary.totalKeys = totalKeys;
report.summary.totalTranslations = totalTranslations;
report.summary.overallCoverage = totalKeys > 0 && LANGUAGES.length > 1
  ? Math.round((totalTranslations / (totalKeys * (LANGUAGES.length - 1))) * 10000) / 100
  : 100;

// Generate recommendations
if (auditReport) {
  for (const [namespace, data] of Object.entries(auditReport)) {
    if (data.summary?.missingKeys) {
      for (const [lang, count] of Object.entries(data.summary.missingKeys)) {
        if (count > 0) {
          report.recommendations.push({
            priority: 'high',
            namespace,
            language: lang,
            issue: `Missing ${count} translation keys`,
            action: `Add missing keys to ${lang}/${namespace}.json`
          });
        }
      }
    }
  }
}

// Language-specific coverage
for (const lang of LANGUAGES) {
  if (lang === 'en') continue;
  
  let langTotalKeys = 0;
  let langTranslatedKeys = 0;
  
  for (const namespace of NAMESPACES) {
    const nsReport = report.namespaces[namespace];
    if (nsReport && nsReport.languages[lang]) {
      langTotalKeys += nsReport.totalKeys;
      langTranslatedKeys += nsReport.languages[lang].translatedKeys;
    }
  }
  
  const langCoverage = langTotalKeys > 0
    ? Math.round((langTranslatedKeys / langTotalKeys) * 10000) / 100
    : 100;
  
  report.summary.coverage[lang] = langCoverage;
}

// Write report
const reportPath = path.join(__dirname, '..', 'translation-coverage-report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

// Generate markdown report
const mdReport = `# Translation Coverage Report

Generated: ${new Date(report.generatedAt).toLocaleString()}

## Summary

- **Total Namespaces**: ${report.summary.totalNamespaces}
- **Total Languages**: ${report.summary.totalLanguages}
- **Total Keys**: ${report.summary.totalKeys}
- **Overall Coverage**: ${report.summary.overallCoverage}%

## Language Coverage

${LANGUAGES.filter(l => l !== 'en').map(lang => 
  `- **${lang.toUpperCase()}**: ${report.summary.coverage[lang] || 0}%`
).join('\n')}

## Namespace Details

${NAMESPACES.map(ns => {
  const nsData = report.namespaces[ns];
  if (!nsData) return '';
  return `### ${ns.toUpperCase()}

- **Total Keys**: ${nsData.totalKeys}
- **Namespace Coverage**: ${nsData.coverage}%

#### Language Breakdown

${LANGUAGES.filter(l => l !== 'en').map(lang => {
  const langData = nsData.languages[lang];
  if (!langData) return '';
  return `- **${lang.toUpperCase()}**: ${langData.translatedKeys}/${nsData.totalKeys} (${langData.coverage}%)${langData.missingKeys > 0 ? ` - ${langData.missingKeys} missing` : ''}`;
}).filter(Boolean).join('\n')}
`;
}).filter(Boolean).join('\n')}

## Recommendations

${report.recommendations.length > 0 
  ? report.recommendations.map((rec, i) => 
    `${i + 1}. **[${rec.priority.toUpperCase()}]** ${rec.issue} in ${rec.namespace}/${rec.language}\n   - Action: ${rec.action}`
  ).join('\n\n')
  : 'No critical issues found. All translations are complete! ✅'
}

## Next Steps

1. Review and address high-priority recommendations
2. Test translations in UI for each language
3. Verify placeholder variables ({{count}}, {{author}}, etc.) are preserved
4. Check for text overflow issues in different languages
5. Validate date/time formatting per language

---

*Report generated by translation audit system*
`;

const mdReportPath = path.join(__dirname, '..', 'TRANSLATION_COVERAGE_REPORT.md');
fs.writeFileSync(mdReportPath, mdReport);

console.log('\n=== TRANSLATION COVERAGE REPORT ===\n');
console.log(`Overall Coverage: ${report.summary.overallCoverage}%`);
console.log(`\nLanguage Coverage:`);
for (const lang of LANGUAGES) {
  if (lang === 'en') continue;
  console.log(`  ${lang.toUpperCase()}: ${report.summary.coverage[lang] || 0}%`);
}
console.log(`\nDetailed reports saved to:`);
console.log(`  - ${reportPath}`);
console.log(`  - ${mdReportPath}`);
console.log(`\nRecommendations: ${report.recommendations.length}`);

