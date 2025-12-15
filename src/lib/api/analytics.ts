import { AnalyticsArticle } from './types';
import { getAuthorAvatar, categoryImages } from './utils';

// Simplified analytics data for fast loading
const quickAnalytics: AnalyticsArticle[] = [
  {
    slug: 'etf-strategies-wealth-building',
    title: 'ETF Strategies for Long-Term Wealth Building',
    excerpt: 'Comprehensive guide to building a diversified ETF portfolio that grows over time.',
    content: 'Exchange-traded funds (ETFs) have revolutionized investing...',
    date: '2024-12-10',
    author: 'Sarah Chen, CFA',
    authorAvatar: getAuthorAvatar('Sarah Chen, CFA'),
    type: 'longterm',
    readTime: '14 min',
    imageUrl: categoryImages.longterm[0],
    tags: ['ETF', 'Portfolio', 'Diversification'],
  },
  {
    slug: 'dividend-investing-passive-income',
    title: 'Dividend Investing: Building Passive Income Streams',
    excerpt: 'How to identify and invest in quality dividend-paying stocks for steady income.',
    content: 'Dividend investing remains one of the most reliable strategies...',
    date: '2024-12-09',
    author: 'Michael Torres',
    authorAvatar: getAuthorAvatar('Michael Torres'),
    type: 'expert',
    readTime: '12 min',
    imageUrl: categoryImages.expert[0],
    tags: ['Dividends', 'Income', 'Stocks'],
  },
  {
    slug: 'technical-analysis-fundamentals',
    title: 'Technical Analysis: Chart Patterns and Indicators',
    excerpt: 'Master the essential technical analysis tools used by professional traders.',
    content: 'Technical analysis involves analyzing statistical trends...',
    date: '2024-12-08',
    author: 'David Park',
    authorAvatar: getAuthorAvatar('David Park'),
    type: 'technical',
    readTime: '15 min',
    imageUrl: categoryImages.technical[0],
    tags: ['Technical Analysis', 'Charts', 'Trading'],
  },
  {
    slug: 'market-outlook-2025',
    title: 'Market Outlook 2025: What Investors Should Expect',
    excerpt: 'Expert predictions and analysis for the coming year in global markets.',
    content: 'As we approach 2025, several key trends are shaping the investment landscape...',
    date: '2024-12-07',
    author: 'Lisa Wang',
    authorAvatar: getAuthorAvatar('Lisa Wang'),
    type: 'markets',
    readTime: '10 min',
    imageUrl: categoryImages.markets[0],
    tags: ['Markets', 'Outlook', '2025'],
  },
  {
    slug: 'risk-management-portfolio',
    title: 'Risk Management Strategies for Your Portfolio',
    excerpt: 'Learn how to protect your investments while maximizing returns.',
    content: 'Effective risk management is the cornerstone of successful investing...',
    date: '2024-12-06',
    author: 'James Mitchell',
    authorAvatar: getAuthorAvatar('James Mitchell'),
    type: 'expert',
    readTime: '11 min',
    imageUrl: categoryImages.expert[1],
    tags: ['Risk', 'Portfolio', 'Strategy'],
  },
  {
    slug: 'cryptocurrency-fundamentals',
    title: 'Cryptocurrency Fundamentals: Beyond Bitcoin',
    excerpt: 'Understanding the diverse world of digital assets and blockchain technology.',
    content: 'The cryptocurrency ecosystem has evolved far beyond Bitcoin...',
    date: '2024-12-05',
    author: 'Emily Rodriguez',
    authorAvatar: getAuthorAvatar('Emily Rodriguez'),
    type: 'markets',
    readTime: '13 min',
    imageUrl: categoryImages.markets[1],
    tags: ['Crypto', 'Bitcoin', 'Blockchain'],
  },
];

export async function fetchAnalytics(type?: string): Promise<AnalyticsArticle[]> {
  let result = [...quickAnalytics];
  
  if (type && type !== 'all') {
    result = result.filter(item => item.type === type);
  }
  
  return result;
}

export async function fetchAnalyticsBySlug(slug: string): Promise<AnalyticsArticle | null> {
  // Try to find in quick analytics first
  const found = quickAnalytics.find(item => item.slug === slug);
  if (found) return found;
  
  // If not found, dynamically import full analytics from api.ts
  try {
    const { fetchAnalyticsBySlug: fullFetch } = await import('../api');
    return fullFetch(slug);
  } catch {
    return null;
  }
}
