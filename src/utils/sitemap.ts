/**
 * Sitemap generation utilities
 * Generates sitemap.xml for all pages with proper priorities and changefreq
 */

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export interface SitemapConfig {
  baseUrl: string;
  defaultPriority?: number;
  defaultChangefreq?: SitemapUrl['changefreq'];
}

const defaultConfig: SitemapConfig = {
  baseUrl: 'https://investopatronus.com',
  defaultPriority: 0.8,
  defaultChangefreq: 'weekly',
};

/**
 * Generate sitemap XML string
 */
export function generateSitemapXML(urls: SitemapUrl[], config: SitemapConfig = defaultConfig): string {
  const { baseUrl, defaultPriority, defaultChangefreq } = config;

  const urlEntries = urls.map((url) => {
    const loc = url.loc.startsWith('http') ? url.loc : `${baseUrl}${url.loc}`;
    const lastmod = url.lastmod || new Date().toISOString().split('T')[0];
    const changefreq = url.changefreq || defaultChangefreq;
    const priority = url.priority !== undefined ? url.priority : defaultPriority;

    return `  <url>
    <loc>${escapeXML(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>`;
}

/**
 * Escape XML special characters
 */
function escapeXML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generate sitemap URLs for static pages
 */
export function generateStaticPages(): SitemapUrl[] {
  const now = new Date().toISOString().split('T')[0];
  
  return [
    { loc: '/', changefreq: 'daily', priority: 1.0, lastmod: now },
    { loc: '/news', changefreq: 'hourly', priority: 0.9, lastmod: now },
    { loc: '/analytics', changefreq: 'daily', priority: 0.9, lastmod: now },
    { loc: '/markets', changefreq: 'hourly', priority: 0.9, lastmod: now },
    { loc: '/companies', changefreq: 'daily', priority: 0.8, lastmod: now },
    { loc: '/forum', changefreq: 'hourly', priority: 0.9, lastmod: now },
    { loc: '/community', changefreq: 'daily', priority: 0.8, lastmod: now },
    { loc: '/learning', changefreq: 'weekly', priority: 0.8, lastmod: now },
    { loc: '/about', changefreq: 'monthly', priority: 0.6, lastmod: now },
    { loc: '/contact', changefreq: 'monthly', priority: 0.6, lastmod: now },
    { loc: '/careers', changefreq: 'monthly', priority: 0.6, lastmod: now },
    { loc: '/authors', changefreq: 'weekly', priority: 0.7, lastmod: now },
    { loc: '/terms', changefreq: 'yearly', priority: 0.4, lastmod: now },
    { loc: '/privacy', changefreq: 'yearly', priority: 0.4, lastmod: now },
    { loc: '/disclaimer', changefreq: 'yearly', priority: 0.4, lastmod: now },
  ];
}

/**
 * Generate sitemap URLs for market pages
 */
export function generateMarketPages(): SitemapUrl[] {
  const now = new Date().toISOString().split('T')[0];
  const markets = ['indices', 'stocks', 'crypto', 'commodities', 'currencies'];
  
  return markets.map((market) => ({
    loc: `/markets/${market}`,
    changefreq: 'hourly' as const,
    priority: 0.8,
    lastmod: now,
  }));
}

/**
 * Generate sitemap URLs with hreflang for multilingual support
 */
export function generateMultilingualSitemap(
  baseUrls: SitemapUrl[],
  languages: string[] = ['en', 'zh', 'es', 'ru', 'de', 'fr', 'pl']
): string {
  const { baseUrl } = defaultConfig;
  
  const urlEntries = baseUrls.map((url) => {
    const loc = url.loc.startsWith('http') ? url.loc : `${baseUrl}${url.loc}`;
    const lastmod = url.lastmod || new Date().toISOString().split('T')[0];
    const changefreq = url.changefreq || defaultConfig.defaultChangefreq;
    const priority = url.priority !== undefined ? url.priority : defaultConfig.defaultPriority;

    const hreflangLinks = languages.map((lang) => {
      // For now, we use the same URL for all languages
      // In a real implementation, you might want to add language prefixes
      const langUrl = `${baseUrl}${url.loc}`;
      return `    <xhtml:link rel="alternate" hreflang="${lang}" href="${escapeXML(langUrl)}" />`;
    }).join('\n');

    return `  <url>
    <loc>${escapeXML(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${hreflangLinks}
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>`;
}

