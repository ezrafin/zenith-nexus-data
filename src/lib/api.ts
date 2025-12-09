// Mock API functions - replace with real API calls later

// Simulated network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Author avatars mapping
const authorAvatars: Record<string, string> = {
  'Sarah Chen, CFA': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  'Michael Torres': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  'David Park': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  'Lisa Wang': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  'James Mitchell': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
  'Emily Rodriguez': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
  'Robert Kim': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
  'Anna Kowalski': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
  'Marcus Johnson': 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face',
  'Sofia Martinez': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
  'Alexander Wright': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
  'Catherine Lee': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
};

// Category image mapping for analytics articles
const categoryImages: Record<string, string[]> = {
  expert: [
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop',
  ],
  markets: [
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&h=400&fit=crop',
  ],
  longterm: [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1559526324-593bc073d938?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1504607798333-52a30db54a5d?w=800&h=400&fit=crop',
  ],
  technical: [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop',
  ],
};

export function getAuthorAvatar(authorName: string): string {
  return authorAvatars[authorName] || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(authorName)}`;
}

// News Types
export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  source: string;
  market: 'indices' | 'stocks' | 'crypto' | 'commodities' | 'currencies' | 'general';
  imageUrl?: string;
}

// Analytics Types
export interface AnalyticsArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  authorAvatar: string;
  type: 'expert' | 'markets' | 'longterm' | 'technical';
  readTime: string;
  imageUrl: string;
}

// Market Types
export interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume?: string;
}

// Company Types
export interface Company {
  slug: string;
  name: string;
  logo: string;
  sector: string;
  description: string;
  overview: string;
  founded: string;
  headquarters: string;
  employees: string;
  marketCap: string;
}

// Forum Types
export interface ForumCategory {
  id: string;
  name: string;
  description: string;
  topicCount: number;
  postCount: number;
}

export interface ForumTopic {
  id: string;
  categoryId: string;
  title: string;
  author: string;
  authorAvatar: string;
  date: string;
  replies: number;
  views: number;
  lastActivity: string;
}

export interface ForumComment {
  id: string;
  topicId: string;
  author: string;
  authorAvatar: string;
  content: string;
  date: string;
  rating: number;
}

// Mock News Data
const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'S&P 500 Reaches New All-Time High Amid Tech Rally',
    excerpt: 'Major indices surge as technology stocks lead the market higher, with the S&P 500 breaking through previous resistance levels.',
    content: 'The S&P 500 index reached a new all-time high today...',
    date: '2024-12-04',
    source: 'Market Watch',
    market: 'indices',
  },
];

// Mock Analytics Data with expanded articles
const mockAnalytics: AnalyticsArticle[] = [
  {
    slug: 'market-outlook-2025',
    title: '2025 Market Outlook: Key Trends and Opportunities',
    excerpt: 'A comprehensive analysis of what investors can expect in the coming year across major asset classes.',
    content: 'As we approach 2025, several key themes are emerging that will shape investment opportunities...',
    date: '2024-12-04',
    author: 'Sarah Chen, CFA',
    authorAvatar: getAuthorAvatar('Sarah Chen, CFA'),
    type: 'expert',
    readTime: '12 min',
    imageUrl: categoryImages.expert[0],
  },
  {
    slug: 'crypto-regulation-impact',
    title: 'How New Crypto Regulations Will Shape the Market',
    excerpt: 'Analysis of upcoming regulatory changes and their potential impact on cryptocurrency valuations.',
    content: 'The cryptocurrency market is entering a new era of regulatory clarity...',
    date: '2024-12-03',
    author: 'Michael Torres',
    authorAvatar: getAuthorAvatar('Michael Torres'),
    type: 'markets',
    readTime: '8 min',
    imageUrl: categoryImages.markets[0],
  },
  {
    slug: 'ai-stock-thesis',
    title: 'The Long-Term AI Investment Thesis',
    excerpt: 'Why artificial intelligence represents a generational investment opportunity.',
    content: 'Artificial intelligence is not just another technology trend...',
    date: '2024-12-02',
    author: 'David Park',
    authorAvatar: getAuthorAvatar('David Park'),
    type: 'longterm',
    readTime: '15 min',
    imageUrl: categoryImages.longterm[0],
  },
  {
    slug: 'sp500-technical-analysis',
    title: 'S&P 500 Technical Analysis: Support and Resistance Levels',
    excerpt: 'Key technical levels to watch as the index tests new highs.',
    content: 'The S&P 500 has broken through multiple resistance levels in recent weeks...',
    date: '2024-12-01',
    author: 'Lisa Wang',
    authorAvatar: getAuthorAvatar('Lisa Wang'),
    type: 'technical',
    readTime: '6 min',
    imageUrl: categoryImages.technical[0],
  },
  {
    slug: 'emerging-markets-opportunity',
    title: 'Emerging Markets: Hidden Gems for 2025',
    excerpt: 'Why developing economies could outperform in the coming year.',
    content: 'After years of underperformance, emerging markets are poised for a comeback...',
    date: '2024-11-30',
    author: 'James Mitchell',
    authorAvatar: getAuthorAvatar('James Mitchell'),
    type: 'expert',
    readTime: '10 min',
    imageUrl: categoryImages.expert[1],
  },
  {
    slug: 'bond-market-outlook',
    title: 'Fixed Income Outlook: Navigating Rate Uncertainty',
    excerpt: 'How to position your bond portfolio in a changing rate environment.',
    content: 'The fixed income market faces significant uncertainty...',
    date: '2024-11-29',
    author: 'Emily Rodriguez',
    authorAvatar: getAuthorAvatar('Emily Rodriguez'),
    type: 'markets',
    readTime: '9 min',
    imageUrl: categoryImages.markets[1],
  },
  {
    slug: 'dividend-investing-strategy',
    title: 'Building Wealth Through Dividend Investing',
    excerpt: 'A strategic approach to generating passive income from dividend stocks.',
    content: 'Dividend investing remains one of the most reliable wealth-building strategies...',
    date: '2024-11-28',
    author: 'Robert Kim',
    authorAvatar: getAuthorAvatar('Robert Kim'),
    type: 'longterm',
    readTime: '11 min',
    imageUrl: categoryImages.longterm[1],
  },
  {
    slug: 'nasdaq-chart-patterns',
    title: 'NASDAQ Technical Setup: Key Chart Patterns to Watch',
    excerpt: 'Identifying potential breakout opportunities in tech stocks.',
    content: 'The NASDAQ composite is forming several interesting chart patterns...',
    date: '2024-11-27',
    author: 'Lisa Wang',
    authorAvatar: getAuthorAvatar('Lisa Wang'),
    type: 'technical',
    readTime: '7 min',
    imageUrl: categoryImages.technical[1],
  },
  {
    slug: 'central-bank-impact',
    title: 'Central Bank Policies and Their Market Impact',
    excerpt: 'How monetary policy decisions will influence asset prices.',
    content: 'Central banks around the world are at a crossroads...',
    date: '2024-11-26',
    author: 'Anna Kowalski',
    authorAvatar: getAuthorAvatar('Anna Kowalski'),
    type: 'expert',
    readTime: '13 min',
    imageUrl: categoryImages.expert[2],
  },
  {
    slug: 'commodities-super-cycle',
    title: 'The Next Commodities Super Cycle',
    excerpt: 'Why raw materials could be the trade of the decade.',
    content: 'Historical patterns suggest we may be entering a new commodities super cycle...',
    date: '2024-11-25',
    author: 'Marcus Johnson',
    authorAvatar: getAuthorAvatar('Marcus Johnson'),
    type: 'markets',
    readTime: '14 min',
    imageUrl: categoryImages.markets[2],
  },
  {
    slug: 'real-estate-investment',
    title: 'Real Estate Investment Strategies for 2025',
    excerpt: 'Navigating the property market in a higher rate environment.',
    content: 'The real estate market has undergone significant changes...',
    date: '2024-11-24',
    author: 'Sofia Martinez',
    authorAvatar: getAuthorAvatar('Sofia Martinez'),
    type: 'longterm',
    readTime: '10 min',
    imageUrl: categoryImages.longterm[2],
  },
  {
    slug: 'gold-technical-outlook',
    title: 'Gold Technical Analysis: Bull Run Continuation?',
    excerpt: 'Analyzing gold price movements and key levels to watch.',
    content: 'Gold has been on a remarkable run, but is the momentum sustainable...',
    date: '2024-11-23',
    author: 'Alexander Wright',
    authorAvatar: getAuthorAvatar('Alexander Wright'),
    type: 'technical',
    readTime: '8 min',
    imageUrl: categoryImages.technical[2],
  },
  {
    slug: 'healthcare-sector-analysis',
    title: 'Healthcare Sector: Defensive Growth Opportunity',
    excerpt: 'Why healthcare stocks offer both safety and growth potential.',
    content: 'The healthcare sector presents a unique investment opportunity...',
    date: '2024-11-22',
    author: 'Catherine Lee',
    authorAvatar: getAuthorAvatar('Catherine Lee'),
    type: 'expert',
    readTime: '11 min',
    imageUrl: categoryImages.expert[0],
  },
  {
    slug: 'energy-transition-investing',
    title: 'Investing in the Energy Transition',
    excerpt: 'Capitalizing on the shift to renewable energy sources.',
    content: 'The global energy transition is creating massive investment opportunities...',
    date: '2024-11-21',
    author: 'Michael Torres',
    authorAvatar: getAuthorAvatar('Michael Torres'),
    type: 'longterm',
    readTime: '12 min',
    imageUrl: categoryImages.longterm[0],
  },
  {
    slug: 'volatility-trading-strategies',
    title: 'Volatility Trading: Strategies for Uncertain Markets',
    excerpt: 'How to profit from market volatility using options strategies.',
    content: 'Market volatility presents both risks and opportunities...',
    date: '2024-11-20',
    author: 'David Park',
    authorAvatar: getAuthorAvatar('David Park'),
    type: 'technical',
    readTime: '9 min',
    imageUrl: categoryImages.technical[0],
  },
  {
    slug: 'japan-market-renaissance',
    title: 'Japan Market Renaissance: Time to Invest?',
    excerpt: 'The Japanese market awakening after decades of stagnation.',
    content: 'After decades of underperformance, Japanese equities are attracting global attention...',
    date: '2024-11-19',
    author: 'Sarah Chen, CFA',
    authorAvatar: getAuthorAvatar('Sarah Chen, CFA'),
    type: 'markets',
    readTime: '10 min',
    imageUrl: categoryImages.markets[0],
  },
  {
    slug: 'private-equity-outlook',
    title: 'Private Equity: Accessing Alternative Returns',
    excerpt: 'How retail investors can participate in private market opportunities.',
    content: 'Private equity has historically delivered superior returns...',
    date: '2024-11-18',
    author: 'James Mitchell',
    authorAvatar: getAuthorAvatar('James Mitchell'),
    type: 'expert',
    readTime: '14 min',
    imageUrl: categoryImages.expert[1],
  },
  {
    slug: 'cryptocurrency-portfolio-allocation',
    title: 'Optimal Cryptocurrency Portfolio Allocation',
    excerpt: 'Finding the right crypto allocation for your investment portfolio.',
    content: 'Determining the optimal cryptocurrency allocation requires careful consideration...',
    date: '2024-11-17',
    author: 'Marcus Johnson',
    authorAvatar: getAuthorAvatar('Marcus Johnson'),
    type: 'longterm',
    readTime: '11 min',
    imageUrl: categoryImages.longterm[1],
  },
];

// Mock Market Data
const mockIndices: MarketData[] = [
  { symbol: 'SPX', name: 'S&P 500', price: 6012.50, change: 45.30, changePercent: 0.76, high: 6025.00, low: 5980.00 },
  { symbol: 'DJI', name: 'Dow Jones', price: 44650.00, change: 280.50, changePercent: 0.63, high: 44720.00, low: 44300.00 },
  { symbol: 'IXIC', name: 'NASDAQ', price: 19150.75, change: 175.25, changePercent: 0.92, high: 19200.00, low: 18950.00 },
  { symbol: 'RUT', name: 'Russell 2000', price: 2380.50, change: -12.30, changePercent: -0.51, high: 2400.00, low: 2365.00 },
  { symbol: 'FTSE', name: 'FTSE 100', price: 8312.40, change: 28.60, changePercent: 0.35, high: 8340.00, low: 8280.00 },
];

const mockStocks: MarketData[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 195.50, change: 3.20, changePercent: 1.67, high: 196.80, low: 192.10, volume: '52.3M' },
  { symbol: 'MSFT', name: 'Microsoft', price: 415.30, change: 7.50, changePercent: 1.84, high: 418.00, low: 408.50, volume: '28.1M' },
  { symbol: 'GOOGL', name: 'Alphabet', price: 178.25, change: -2.15, changePercent: -1.19, high: 181.50, low: 177.00, volume: '18.7M' },
  { symbol: 'AMZN', name: 'Amazon', price: 205.80, change: 4.30, changePercent: 2.13, high: 207.00, low: 201.50, volume: '35.2M' },
  { symbol: 'TSLA', name: 'Tesla', price: 342.50, change: 18.75, changePercent: 5.79, high: 348.00, low: 322.00, volume: '98.5M' },
];

const mockCrypto: MarketData[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: 102500.00, change: 4250.00, changePercent: 4.33, high: 104000.00, low: 97500.00, volume: '$48.2B' },
  { symbol: 'ETH', name: 'Ethereum', price: 3850.00, change: 125.00, changePercent: 3.36, high: 3920.00, low: 3700.00, volume: '$22.1B' },
  { symbol: 'BNB', name: 'Binance Coin', price: 645.30, change: -12.50, changePercent: -1.90, high: 665.00, low: 640.00, volume: '$1.8B' },
  { symbol: 'SOL', name: 'Solana', price: 225.80, change: 15.30, changePercent: 7.27, high: 230.00, low: 208.50, volume: '$5.2B' },
  { symbol: 'XRP', name: 'XRP', price: 2.45, change: 0.18, changePercent: 7.93, high: 2.52, low: 2.25, volume: '$8.9B' },
];

const mockCommodities: MarketData[] = [
  { symbol: 'GC', name: 'Gold', price: 2075.50, change: 12.30, changePercent: 0.60, high: 2082.00, low: 2060.00 },
  { symbol: 'SI', name: 'Silver', price: 24.85, change: 0.45, changePercent: 1.84, high: 25.10, low: 24.35 },
  { symbol: 'CL', name: 'Crude Oil', price: 74.20, change: -2.80, changePercent: -3.64, high: 77.50, low: 73.80 },
  { symbol: 'NG', name: 'Natural Gas', price: 2.95, change: 0.08, changePercent: 2.79, high: 3.02, low: 2.85 },
  { symbol: 'HG', name: 'Copper', price: 4.32, change: 0.05, changePercent: 1.17, high: 4.38, low: 4.25 },
];

const mockCurrencies: MarketData[] = [
  { symbol: 'EUR/USD', name: 'Euro / US Dollar', price: 1.0520, change: -0.0035, changePercent: -0.33, high: 1.0560, low: 1.0495 },
  { symbol: 'GBP/USD', name: 'British Pound / US Dollar', price: 1.2680, change: 0.0025, changePercent: 0.20, high: 1.2710, low: 1.2645 },
  { symbol: 'USD/JPY', name: 'US Dollar / Japanese Yen', price: 149.85, change: 0.75, changePercent: 0.50, high: 150.20, low: 148.90 },
  { symbol: 'USD/CHF', name: 'US Dollar / Swiss Franc', price: 0.8820, change: 0.0015, changePercent: 0.17, high: 0.8845, low: 0.8790 },
  { symbol: 'AUD/USD', name: 'Australian Dollar / US Dollar', price: 0.6485, change: -0.0028, changePercent: -0.43, high: 0.6520, low: 0.6470 },
];

// Mock Companies Data
const mockCompanies: Company[] = [
  {
    slug: 'nvidia',
    name: 'NVIDIA Corporation',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6d/Nvidia_image_logo.svg/200px-Nvidia_image_logo.svg.png',
    sector: 'Technology',
    description: 'Leading designer of graphics processing units and AI computing platforms.',
    overview: 'NVIDIA Corporation is an American multinational technology company...',
    founded: '1993',
    headquarters: 'Santa Clara, CA',
    employees: '26,000+',
    marketCap: '$1.2T',
  },
];

// Mock Forum Data
const mockForumCategories: ForumCategory[] = [
  { id: 'investments', name: 'Investments', description: 'Discussion of investment strategies and opportunities', topicCount: 1250, postCount: 15600 },
  { id: 'companies', name: 'Companies', description: 'Analysis and discussion of public companies', topicCount: 890, postCount: 12300 },
  { id: 'markets', name: 'Markets', description: 'Market trends and movements overview', topicCount: 2100, postCount: 28500 },
  { id: 'crypto', name: 'Cryptocurrencies', description: 'Everything about cryptocurrencies and blockchain', topicCount: 3400, postCount: 45200 },
];

const mockForumTopics: ForumTopic[] = [
  { id: '1', categoryId: 'investments', title: 'Best ETFs for Long-Term Investing in 2025', author: 'InvestorPro', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=investor', date: '2024-12-04', replies: 45, views: 1250, lastActivity: '2 hours ago' },
  { id: '2', categoryId: 'crypto', title: 'Bitcoin $100K - What\'s Next?', author: 'CryptoKing', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=crypto', date: '2024-12-03', replies: 128, views: 4500, lastActivity: '15 minutes ago' },
  { id: '3', categoryId: 'companies', title: 'NVIDIA Q3 2024 Earnings Analysis', author: 'TechAnalyst', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tech', date: '2024-12-02', replies: 67, views: 2100, lastActivity: '1 hour ago' },
  { id: '4', categoryId: 'markets', title: 'S&P 500 Year-End Forecast', author: 'MarketWatcher', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=market', date: '2024-12-01', replies: 89, views: 3200, lastActivity: '30 minutes ago' },
  { id: '5', categoryId: 'investments', title: 'Dividend Strategies for Passive Income', author: 'DividendHunter', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dividend', date: '2024-11-30', replies: 156, views: 5600, lastActivity: '4 hours ago' },
];

const mockForumComments: ForumComment[] = [
  { id: '1', topicId: '1', author: 'ValueInvestor', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=value', content: 'VOO and VTI remain the best choice for most investors. Low fees and broad diversification.', date: '2024-12-04 10:30', rating: 45 },
  { id: '2', topicId: '1', author: 'GrowthSeeker', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=growth', content: 'Don\'t forget about QQQ for tech sector exposure. Excellent returns over the past years.', date: '2024-12-04 11:15', rating: 32 },
];

// API Functions
export async function fetchNews(filters?: { market?: string; source?: string }): Promise<NewsItem[]> {
  await delay(800);
  let result = [...mockNews];
  
  if (filters?.market && filters.market !== 'all') {
    result = result.filter(item => item.market === filters.market);
  }
  
  return result;
}

export async function fetchNewsById(id: string): Promise<NewsItem | null> {
  await delay(500);
  return mockNews.find(item => item.id === id) || null;
}

export async function fetchAnalytics(type?: string): Promise<AnalyticsArticle[]> {
  await delay(800);
  let result = [...mockAnalytics];
  
  if (type && type !== 'all') {
    result = result.filter(item => item.type === type);
  }
  
  return result;
}

export async function fetchAnalyticsBySlug(slug: string): Promise<AnalyticsArticle | null> {
  await delay(500);
  return mockAnalytics.find(item => item.slug === slug) || null;
}

export async function fetchMarketData(type: 'indices' | 'stocks' | 'crypto' | 'commodities' | 'currencies'): Promise<MarketData[]> {
  await delay(600);
  
  switch (type) {
    case 'indices':
      return mockIndices;
    case 'stocks':
      return mockStocks;
    case 'crypto':
      return mockCrypto;
    case 'commodities':
      return mockCommodities;
    case 'currencies':
      return mockCurrencies;
    default:
      return [];
  }
}

export async function fetchCompanies(): Promise<Company[]> {
  await delay(800);
  return mockCompanies;
}

export async function fetchCompanyBySlug(slug: string): Promise<Company | null> {
  await delay(500);
  return mockCompanies.find(c => c.slug === slug) || null;
}

export async function fetchForumCategories(): Promise<ForumCategory[]> {
  await delay(600);
  return mockForumCategories;
}

export async function fetchForumTopics(categoryId?: string): Promise<ForumTopic[]> {
  await delay(700);
  if (categoryId) {
    return mockForumTopics.filter(t => t.categoryId === categoryId);
  }
  return mockForumTopics;
}

export async function fetchForumComments(topicId: string): Promise<ForumComment[]> {
  await delay(500);
  return mockForumComments.filter(c => c.topicId === topicId);
}

export async function fetchTopicById(id: string): Promise<ForumTopic | null> {
  await delay(500);
  return mockForumTopics.find(topic => topic.id === id) || null;
}
