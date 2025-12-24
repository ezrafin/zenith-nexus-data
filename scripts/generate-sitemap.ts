/**
 * Script to generate sitemap.xml during build
 * Run with: tsx scripts/generate-sitemap.ts
 */

import { writeFileSync } from 'fs';
import { join } from 'path';
import { generateSitemapXML, generateStaticPages, generateMarketPages } from '../src/utils/sitemap';

async function generateSitemap() {
  try {
    console.log('Generating sitemap.xml...');

    // Generate all URLs
    const staticPages = generateStaticPages();
    const marketPages = generateMarketPages();
    
    // Combine all URLs
    const allUrls = [...staticPages, ...marketPages];

    // Generate XML
    const sitemapXML = generateSitemapXML(allUrls);

    // Write to public directory
    const outputPath = join(process.cwd(), 'public', 'sitemap.xml');
    writeFileSync(outputPath, sitemapXML, 'utf-8');

    console.log(`✅ Sitemap generated successfully at ${outputPath}`);
    console.log(`   Total URLs: ${allUrls.length}`);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();

