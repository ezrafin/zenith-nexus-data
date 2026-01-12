/**
 * Translation completeness audit script
 * Compares all language files against English baseline
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LANGUAGES = ['en', 'zh', 'es', 'ru', 'de', 'fr', 'pl'];
const NAMESPACES = ['ui', 'forum', 'profile', 'analytics', 'education', 'common'];
const LOCALES_DIR = path.join(__dirname, '..', 'src', 'locales');

/**
 * Recursively extract all keys from an object
 */
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

/**
 * Get nested value from object using dot notation
 */
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

/**
 * Load JSON file
 */
function loadJSON(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
}

/**
 * Audit a single namespace
 */
function auditNamespace(namespace, baselineKeys) {
  const results = {
    namespace,
    languages: {},
    summary: {
      totalKeys: baselineKeys.length,
      missingKeys: {},
      emptyStrings: {},
      orphanedKeys: {},
      identicalToEnglish: {}
    }
  };

  const baselineFile = path.join(LOCALES_DIR, 'en', `${namespace}.json`);
  const baseline = loadJSON(baselineFile);

  if (!baseline) {
    console.warn(`Warning: Baseline file not found: ${baselineFile}`);
    return results;
  }

  for (const lang of LANGUAGES) {
    if (lang === 'en') continue; // Skip English baseline

    const langFile = path.join(LOCALES_DIR, lang, `${namespace}.json`);
    const langData = loadJSON(langFile);

    if (!langData) {
      results.languages[lang] = {
        exists: false,
        missingKeys: [...baselineKeys],
        emptyStrings: [],
        orphanedKeys: [],
        identicalToEnglish: []
      };
      results.summary.missingKeys[lang] = baselineKeys.length;
      continue;
    }

    const langKeys = getAllKeys(langData);
    const missingKeys = [];
    const emptyStrings = [];
    const identicalToEnglish = [];
    const orphanedKeys = langKeys.filter(key => !baselineKeys.includes(key));

    for (const key of baselineKeys) {
      const value = getNestedValue(langData, key);
      const baselineValue = getNestedValue(baseline, key);

      if (value === undefined) {
        missingKeys.push(key);
      } else if (value === '') {
        emptyStrings.push(key);
      } else if (value === baselineValue && typeof baselineValue === 'string' && baselineValue.length > 0) {
        // Check if it's intentionally the same (like brand names, technical terms)
        // For now, flag all identical strings
        identicalToEnglish.push(key);
      }
    }

    results.languages[lang] = {
      exists: true,
      missingKeys,
      emptyStrings,
      orphanedKeys,
      identicalToEnglish
    };

    if (missingKeys.length > 0) {
      results.summary.missingKeys[lang] = missingKeys.length;
    }
    if (emptyStrings.length > 0) {
      results.summary.emptyStrings[lang] = emptyStrings.length;
    }
    if (orphanedKeys.length > 0) {
      results.summary.orphanedKeys[lang] = orphanedKeys.length;
    }
    if (identicalToEnglish.length > 0) {
      results.summary.identicalToEnglish[lang] = identicalToEnglish.length;
    }
  }

  return results;
}

/**
 * Main audit function
 */
function auditTranslations() {
  console.log('Starting translation audit...\n');
  const allResults = {};

  for (const namespace of NAMESPACES) {
    const baselineFile = path.join(LOCALES_DIR, 'en', `${namespace}.json`);
    const baseline = loadJSON(baselineFile);

    if (!baseline) {
      console.warn(`Warning: Baseline file not found for namespace: ${namespace}`);
      continue;
    }

    const baselineKeys = getAllKeys(baseline);
    console.log(`Auditing namespace: ${namespace} (${baselineKeys.length} keys)`);
    
    allResults[namespace] = auditNamespace(namespace, baselineKeys);
  }

  // Generate report
  console.log('\n=== AUDIT RESULTS ===\n');

  let totalIssues = 0;

  for (const namespace of NAMESPACES) {
    const result = allResults[namespace];
    if (!result) continue;

    console.log(`\n## ${namespace.toUpperCase()} (${result.summary.totalKeys} total keys)`);

    for (const lang of LANGUAGES) {
      if (lang === 'en') continue;
      
      const langResult = result.languages[lang];
      if (!langResult) continue;

      const issues = [];
      if (!langResult.exists) {
        issues.push(`FILE MISSING`);
        totalIssues += result.summary.totalKeys;
      } else {
        if (langResult.missingKeys.length > 0) {
          issues.push(`${langResult.missingKeys.length} missing keys`);
          totalIssues += langResult.missingKeys.length;
        }
        if (langResult.emptyStrings.length > 0) {
          issues.push(`${langResult.emptyStrings.length} empty strings`);
          totalIssues += langResult.emptyStrings.length;
        }
        if (langResult.orphanedKeys.length > 0) {
          issues.push(`${langResult.orphanedKeys.length} orphaned keys`);
        }
        if (langResult.identicalToEnglish.length > 0) {
          issues.push(`${langResult.identicalToEnglish.length} identical to English`);
        }
      }

      if (issues.length > 0) {
        console.log(`  ${lang}: ${issues.join(', ')}`);
      } else {
        console.log(`  ${lang}: ✓ Complete`);
      }
    }
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Total issues found: ${totalIssues}`);
  console.log(`\nAudit complete. Check details above for specific missing keys.`);

  // Write detailed report to file
  const reportPath = path.join(__dirname, '..', 'translation-audit-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(allResults, null, 2));
  console.log(`\nDetailed report saved to: ${reportPath}`);

  return allResults;
}

// Run if called directly
const isMainModule = import.meta.url === `file://${process.argv[1]}` || 
                     process.argv[1] && import.meta.url.includes(process.argv[1].replace(/\\/g, '/'));

if (isMainModule || process.argv[1]?.includes('audit-translations.js')) {
  auditTranslations();
}

export { auditTranslations, getAllKeys };

