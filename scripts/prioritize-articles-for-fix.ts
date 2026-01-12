/**
 * Script to generate detailed prioritized list of articles that need fixing
 * Includes distribution analysis by author and source file
 * Run with: npx tsx scripts/prioritize-articles-for-fix.ts
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface ArticleReport {
  id: string;
  type: 'analytics' | 'education';
  title: string;
  author?: string;
  source: string;
  issues: Array<{
    category: 'placeholder' | 'wordCount' | 'structure' | 'aiStyle';
    severity: 'critical' | 'warning' | 'info';
    description: string;
  }>;
  metrics: {
    wordCount: number;
    headingLevels: number;
    listCount: number;
    paragraphCount: number;
  };
}

interface QualityReport {
  summary: any;
  articles: ArticleReport[];
}

interface PrioritizedOutput {
  summary: {
    totalArticles: number;
    critical: {
      placeholder: number;
      wordCount: {
        veryLow: number;
        low: number;
        medium: number;
        total: number;
      };
    };
    warning: {
      structure: number;
    };
    distribution: {
      byAuthor: Record<string, {
        placeholder: number;
        wordCount: number;
        structure: number;
        total: number;
      }>;
      bySource: Record<string, {
        placeholder: number;
        wordCount: number;
        structure: number;
        total: number;
      }>;
    };
    multipleIssues: number;
  };
  prioritized: {
    critical: {
      placeholder: ArticleReport[];
      wordCount: {
        veryLow: ArticleReport[];
        low: ArticleReport[];
        medium: ArticleReport[];
      };
    };
    warning: {
      structure: ArticleReport[];
    };
  };
}

function prioritizeArticlesForFix() {
  console.log('📋 Generating detailed prioritized article list for fixing...\n');

  const reportPath = join(process.cwd(), 'article-quality-report.json');
  const report: QualityReport = JSON.parse(readFileSync(reportPath, 'utf-8'));

  // Categorize articles by priority
  const prioritized = {
    critical: {
      placeholder: [] as ArticleReport[],
      wordCount: {
        veryLow: [] as ArticleReport[], // < 800 words
        low: [] as ArticleReport[], // 800-1200 words
        medium: [] as ArticleReport[], // 1200-1499 words
      },
    },
    warning: {
      structure: [] as ArticleReport[],
    },
  };

  // Distribution tracking
  const byAuthor: Record<string, {
    placeholder: number;
    wordCount: number;
    structure: number;
    total: number;
  }> = {};

  const bySource: Record<string, {
    placeholder: number;
    wordCount: number;
    structure: number;
    total: number;
  }> = {};

  let multipleIssuesCount = 0;

  for (const article of report.articles) {
    const author = article.author || 'Unknown';
    const source = article.source;

    // Initialize counters if needed
    if (!byAuthor[author]) {
      byAuthor[author] = { placeholder: 0, wordCount: 0, structure: 0, total: 0 };
    }
    if (!bySource[source]) {
      bySource[source] = { placeholder: 0, wordCount: 0, structure: 0, total: 0 };
    }

    let hasPlaceholder = false;
    let hasWordCount = false;
    let hasStructure = false;

    // Check for placeholder (highest priority)
    const placeholderIssue = article.issues.find(i => i.category === 'placeholder' && i.severity === 'critical');
    if (placeholderIssue) {
      hasPlaceholder = true;
      prioritized.critical.placeholder.push(article);
      byAuthor[author].placeholder++;
      byAuthor[author].total++;
      bySource[source].placeholder++;
      bySource[source].total++;
    }

    // Check for word count issues
    const wordCountIssue = article.issues.find(i => i.category === 'wordCount' && i.severity === 'critical');
    if (wordCountIssue) {
      hasWordCount = true;
      const wordCount = article.metrics.wordCount;
      if (wordCount < 800) {
        prioritized.critical.wordCount.veryLow.push(article);
      } else if (wordCount < 1200) {
        prioritized.critical.wordCount.low.push(article);
      } else {
        prioritized.critical.wordCount.medium.push(article);
      }
      
      if (!hasPlaceholder) {
        byAuthor[author].wordCount++;
        byAuthor[author].total++;
        bySource[source].wordCount++;
        bySource[source].total++;
      }
    }

    // Check for structure issues
    const structureIssue = article.issues.find(i => i.category === 'structure');
    if (structureIssue) {
      hasStructure = true;
      prioritized.warning.structure.push(article);
      
      if (!hasPlaceholder && !hasWordCount) {
        byAuthor[author].structure++;
        byAuthor[author].total++;
        bySource[source].structure++;
        bySource[source].total++;
      }
    }

    // Count articles with multiple issues
    const issueCount = [hasPlaceholder, hasWordCount, hasStructure].filter(Boolean).length;
    if (issueCount > 1) {
      multipleIssuesCount++;
    }
  }

  // Generate output
  const output: PrioritizedOutput = {
    summary: {
      totalArticles: report.articles.length,
      critical: {
        placeholder: prioritized.critical.placeholder.length,
        wordCount: {
          veryLow: prioritized.critical.wordCount.veryLow.length,
          low: prioritized.critical.wordCount.low.length,
          medium: prioritized.critical.wordCount.medium.length,
          total: prioritized.critical.wordCount.veryLow.length + 
                 prioritized.critical.wordCount.low.length + 
                 prioritized.critical.wordCount.medium.length,
        },
      },
      warning: {
        structure: prioritized.warning.structure.length,
      },
      distribution: {
        byAuthor,
        bySource,
      },
      multipleIssues: multipleIssuesCount,
    },
    prioritized,
  };

  // Write prioritized list
  const outputPath = join(process.cwd(), 'article-fix-priorities.json');
  writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');

  console.log('✅ Detailed prioritized article list generated!\n');
  console.log('═══════════════════════════════════════════════════════');
  console.log('📊 SUMMARY');
  console.log('═══════════════════════════════════════════════════════\n');
  console.log(`Total articles: ${output.summary.totalArticles}`);
  console.log(`Articles with multiple issues: ${output.summary.multipleIssues}\n`);

  console.log('🔴 CRITICAL ISSUES:');
  console.log(`   📝 Placeholder text: ${output.summary.critical.placeholder} articles`);
  console.log(`   📊 Word Count issues: ${output.summary.critical.wordCount.total} articles`);
  console.log(`      - Very Low (< 800 words): ${output.summary.critical.wordCount.veryLow}`);
  console.log(`      - Low (800-1200 words): ${output.summary.critical.wordCount.low}`);
  console.log(`      - Medium (1200-1499 words): ${output.summary.critical.wordCount.medium}\n`);

  console.log('⚠️  WARNING ISSUES:');
  console.log(`   📋 Structure problems: ${output.summary.warning.structure} articles\n`);

  console.log('═══════════════════════════════════════════════════════');
  console.log('📈 DISTRIBUTION BY AUTHOR');
  console.log('═══════════════════════════════════════════════════════\n');
  for (const [author, stats] of Object.entries(byAuthor).sort((a, b) => b[1].total - a[1].total)) {
    if (stats.total > 0) {
      console.log(`${author}:`);
      console.log(`   Placeholder: ${stats.placeholder}`);
      console.log(`   Word Count: ${stats.wordCount}`);
      console.log(`   Structure: ${stats.structure}`);
      console.log(`   Total: ${stats.total}\n`);
    }
  }

  console.log('═══════════════════════════════════════════════════════');
  console.log('📁 DISTRIBUTION BY SOURCE FILE');
  console.log('═══════════════════════════════════════════════════════\n');
  for (const [source, stats] of Object.entries(bySource).sort((a, b) => b[1].total - a[1].total)) {
    if (stats.total > 0) {
      console.log(`${source}:`);
      console.log(`   Placeholder: ${stats.placeholder}`);
      console.log(`   Word Count: ${stats.wordCount}`);
      console.log(`   Structure: ${stats.structure}`);
      console.log(`   Total: ${stats.total}\n`);
    }
  }

  console.log(`\n📄 Full prioritized list saved to: ${outputPath}`);
}

prioritizeArticlesForFix();


