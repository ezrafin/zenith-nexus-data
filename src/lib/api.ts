// Mock API functions - replace with real API calls later

import { supabase } from '@/integrations/supabase/client';

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
  'Thomas Anderson': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
  'Jennifer White': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  'Daniel Brown': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  'Rachel Green': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  'Kevin Zhang': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  'Amanda Taylor': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
  'Ryan Murphy': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
};

// Category image mapping for analytics articles
const categoryImages: Record<string, string[]> = {
  expert: [
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
  ],
  markets: [
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1559526324-593bc073d938?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
  ],
  longterm: [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1559526324-593bc073d938?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1504607798333-52a30db54a5d?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
  ],
  technical: [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
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
  resources?: Array<{ title: string; url: string; type?: 'article' | 'data' | 'tool' }>;
  images?: string[];
  sections?: Array<{ heading: string; content: string }>;
  tags?: string[];
  relatedCompanies?: string[];
  relatedMarkets?: string[];
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
  content?: string;
  author: string;
  authorId?: string;
  authorAvatar: string;
  date: string;
  replies: number;
  views: number;
  lastActivity: string;
  like_count?: number;
}

export interface ForumComment {
  id: string;
  topicId: string;
  author: string;
  authorId?: string;
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

// Article topics and templates for generation
const articleTemplates: Array<{
  title: string;
  excerpt: string;
  content: string;
  type: 'expert' | 'markets' | 'longterm' | 'technical';
  readTime: string;
  tags?: string[];
  relatedMarkets?: string[];
}> = [
  // Investment & Portfolio topics
  { title: 'ETF Strategies for Long-Term Wealth Building', excerpt: 'Comprehensive guide to building a diversified ETF portfolio that grows over time.', content: 'Exchange-traded funds have revolutionized investing by providing low-cost access to diversified portfolios. This comprehensive guide explores proven ETF strategies for long-term wealth accumulation. We examine core-satellite approaches, sector rotation strategies, and the importance of rebalancing. Understanding expense ratios, tracking error, and tax efficiency is crucial for maximizing returns. We also discuss how to combine different ETF categories to create a balanced portfolio that aligns with your risk tolerance and investment goals.', type: 'longterm', readTime: '14 min', tags: ['ETF', 'Portfolio', 'Diversification'], relatedMarkets: ['indices', 'stocks'] },
  { title: 'Dividend Investing: Building Passive Income Streams', excerpt: 'How to identify and invest in quality dividend-paying stocks for steady income.', content: 'Dividend investing remains one of the most reliable strategies for generating passive income and building long-term wealth. This article explores how to identify high-quality dividend stocks, understand dividend yield versus dividend growth, and construct a dividend-focused portfolio. We examine the importance of dividend sustainability, payout ratios, and the power of dividend reinvestment. Real-world examples illustrate how dividend investing can provide both income and capital appreciation over time.', type: 'longterm', readTime: '12 min', tags: ['Dividends', 'Income', 'Stocks'] },
  { title: 'Portfolio Diversification: Beyond Stocks and Bonds', excerpt: 'Exploring alternative assets and strategies to reduce portfolio risk and enhance returns.', content: 'True portfolio diversification goes far beyond the traditional 60/40 stock-bond split. This comprehensive analysis explores alternative asset classes including real estate investment trusts (REITs), commodities, international equities, and emerging market bonds. We examine correlation patterns, risk-adjusted returns, and how different asset classes perform in various economic environments. Practical guidance helps investors understand how to allocate across multiple asset classes while maintaining their target risk profile.', type: 'expert', readTime: '16 min', tags: ['Diversification', 'Portfolio', 'Risk Management'] },
  { title: 'Active vs Passive Management: Which Strategy Wins?', excerpt: 'Comparing active and passive investment approaches with data-driven analysis.', content: 'The debate between active and passive management continues to divide investors. This data-driven analysis examines performance metrics, fee structures, and when each approach makes sense. We review academic research on fund manager performance, the impact of fees on long-term returns, and market conditions that favor active management. Case studies illustrate successful active strategies while highlighting the consistent benefits of low-cost index funds for most investors.', type: 'expert', readTime: '15 min', tags: ['Active Management', 'Passive Investing', 'Strategy'] },
  { title: 'Broker Comparison: Finding the Right Platform for Your Needs', excerpt: 'Detailed comparison of major brokerage platforms, fees, and features.', content: 'Choosing the right brokerage platform is crucial for successful investing. This comprehensive comparison examines major brokers across key dimensions: commission structures, account minimums, trading tools, research resources, and customer service. We analyze platforms for different investor types—from beginners seeking simplicity to active traders needing advanced features. The article includes fee calculators and helps readers identify which broker best matches their investment style and goals.', type: 'expert', readTime: '13 min', tags: ['Brokers', 'Comparison', 'Tools'] },
  
  // Market Analysis topics
  { title: 'Technical Analysis: Chart Patterns and Indicators', excerpt: 'Mastering technical analysis tools to identify trading opportunities.', content: 'Technical analysis provides traders with tools to identify potential entry and exit points based on price action and volume. This guide covers essential chart patterns including head and shoulders, triangles, and flags. We explore key technical indicators like moving averages, RSI, MACD, and Bollinger Bands. Practical examples demonstrate how to combine multiple indicators for more reliable signals. The article also addresses common pitfalls and how to use technical analysis alongside fundamental analysis.', type: 'technical', readTime: '11 min', tags: ['Technical Analysis', 'Trading', 'Charts'] },
  { title: 'Fundamental Analysis: Evaluating Company Financials', excerpt: 'How to read financial statements and assess company valuation.', content: 'Fundamental analysis is the cornerstone of value investing. This comprehensive guide teaches investors how to read and interpret financial statements, including balance sheets, income statements, and cash flow statements. We explore key financial ratios such as P/E, P/B, debt-to-equity, and return on equity. The article explains how to assess a company\'s competitive position, management quality, and growth prospects. Real-world examples illustrate how fundamental analysis helps identify undervalued stocks.', type: 'expert', readTime: '17 min', tags: ['Fundamental Analysis', 'Valuation', 'Financials'] },
  { title: 'Macroeconomic Trends: Impact on Investment Decisions', excerpt: 'Understanding how economic indicators influence market movements and portfolio strategy.', content: 'Macroeconomic factors significantly influence investment returns across all asset classes. This analysis explores key economic indicators including GDP growth, inflation rates, unemployment, and central bank policies. We examine how different economic environments affect stocks, bonds, commodities, and currencies. The article provides frameworks for adjusting portfolio allocation based on economic cycles and helps investors understand the relationship between macro trends and individual security selection.', type: 'markets', readTime: '14 min', tags: ['Macroeconomics', 'Economic Indicators', 'Strategy'] },
  { title: 'Volatility Trading: Options Strategies for Uncertain Markets', excerpt: 'Advanced options strategies to profit from market volatility.', content: 'Volatility trading offers sophisticated investors opportunities to profit from market uncertainty. This guide explores options strategies including straddles, strangles, iron condors, and butterfly spreads. We explain how to assess implied volatility, use the VIX index, and construct positions that profit from both high and low volatility environments. Risk management techniques help traders protect capital while maximizing returns from volatility-based strategies.', type: 'technical', readTime: '13 min', tags: ['Options', 'Volatility', 'Trading'] },
  { title: 'Sector Rotation: Timing Market Cycles', excerpt: 'How to identify and capitalize on sector rotation patterns.', content: 'Sector rotation occurs as different industries outperform during various phases of the economic cycle. This analysis examines historical patterns of sector performance and how to identify rotation signals. We explore defensive sectors like utilities and consumer staples versus cyclical sectors like technology and industrials. The article provides frameworks for adjusting sector allocation based on economic indicators and market conditions.', type: 'markets', readTime: '12 min', tags: ['Sector Analysis', 'Market Cycles', 'Strategy'] },
  
  // Financial Planning topics
  { title: 'Retirement Planning: Building a Secure Financial Future', excerpt: 'Comprehensive guide to retirement savings strategies and account types.', content: 'Retirement planning requires a long-term perspective and disciplined approach. This comprehensive guide covers retirement account types including 401(k)s, IRAs, Roth accounts, and their tax implications. We explore contribution limits, employer matching, and how to maximize retirement savings. The article addresses asset allocation for different life stages, withdrawal strategies, and how to estimate retirement needs. Real-world scenarios help readers create personalized retirement plans.', type: 'longterm', readTime: '16 min', tags: ['Retirement', 'Planning', 'Tax Strategy'] },
  { title: 'Tax-Efficient Investing Strategies', excerpt: 'Minimizing tax impact on investment returns through smart strategies.', content: 'Tax efficiency can significantly impact long-term investment returns. This guide explores tax-advantaged accounts, tax-loss harvesting, and asset location strategies. We examine how different investment types are taxed and when to realize gains or losses. The article covers qualified dividends, long-term capital gains rates, and how to structure portfolios to minimize tax drag. Practical examples demonstrate how tax-efficient investing can add substantial value over decades.', type: 'expert', readTime: '14 min', tags: ['Taxes', 'Strategy', 'Optimization'] },
  { title: 'Risk Management: Protecting Your Portfolio', excerpt: 'Essential risk management techniques for preserving capital.', content: 'Effective risk management is crucial for long-term investment success. This comprehensive guide covers position sizing, stop-loss orders, and portfolio hedging strategies. We explore different types of risk including market risk, credit risk, and liquidity risk. The article explains how to use diversification, asset allocation, and derivatives to manage portfolio risk. Case studies illustrate how proper risk management helps investors weather market downturns and preserve capital.', type: 'expert', readTime: '15 min', tags: ['Risk Management', 'Portfolio', 'Protection'] },
  { title: 'Goal-Based Investing: Aligning Investments with Life Goals', excerpt: 'How to structure your portfolio around specific financial objectives.', content: 'Goal-based investing helps align your portfolio with specific life objectives rather than abstract return targets. This approach examines how to set financial goals, determine time horizons, and select appropriate investments for each goal. We explore strategies for short-term goals like emergency funds, medium-term goals like home purchases, and long-term goals like retirement. The article provides frameworks for prioritizing goals and allocating resources accordingly.', type: 'longterm', readTime: '13 min', tags: ['Planning', 'Goals', 'Strategy'] },
  
  // Additional topics for variety
  { title: 'Cryptocurrency Portfolio Allocation', excerpt: 'Determining the right crypto allocation for your investment portfolio.', content: 'Cryptocurrency has emerged as a new asset class, but determining appropriate allocation requires careful consideration. This analysis explores how cryptocurrencies fit into traditional portfolios, correlation with other assets, and risk-return characteristics. We examine different approaches to crypto allocation, from conservative to aggressive, and how to balance potential returns with volatility. The article addresses security considerations, custody options, and regulatory developments affecting crypto investments.', type: 'markets', readTime: '11 min', tags: ['Cryptocurrency', 'Portfolio', 'Allocation'] },
  { title: 'Real Estate Investment: REITs vs Direct Ownership', excerpt: 'Comparing real estate investment approaches and their trade-offs.', content: 'Real estate offers portfolio diversification and inflation protection, but investors must choose between REITs and direct property ownership. This comparison examines liquidity, management requirements, tax implications, and return potential for each approach. We explore different REIT categories including equity, mortgage, and specialty REITs. The article helps investors understand which real estate investment method aligns with their goals, time horizon, and risk tolerance.', type: 'longterm', readTime: '12 min', tags: ['Real Estate', 'REITs', 'Comparison'] },
  { title: 'Bond Market Strategies in Rising Rate Environments', excerpt: 'How to position fixed income portfolios when interest rates are climbing.', content: 'Rising interest rates present challenges and opportunities for bond investors. This guide explores strategies including duration management, floating-rate bonds, and bond laddering. We examine how different bond types respond to rate changes and how to construct portfolios that can weather rising rate environments. The article covers Treasury bonds, corporate bonds, municipal bonds, and international fixed income, helping investors navigate changing rate conditions.', type: 'markets', readTime: '13 min', tags: ['Bonds', 'Fixed Income', 'Interest Rates'] },
  { title: 'International Investing: Global Diversification Benefits', excerpt: 'Why and how to invest in international markets for better diversification.', content: 'International investing provides diversification benefits and access to growth opportunities beyond domestic markets. This analysis explores developed and emerging market equities, currency considerations, and how to allocate between domestic and international investments. We examine country-specific risks, political factors, and how international markets correlate with domestic markets. The article provides practical guidance on selecting international funds and ETFs.', type: 'longterm', readTime: '14 min', tags: ['International', 'Diversification', 'Global Markets'] },
  { title: 'Value vs Growth Investing: Which Approach Works?', excerpt: 'Comparing value and growth investment styles with historical performance data.', content: 'The value versus growth debate has persisted for decades, with each style having periods of outperformance. This comprehensive analysis examines historical returns, risk characteristics, and market conditions that favor each approach. We explore how to identify value and growth stocks, when each style tends to outperform, and whether investors should choose one style or blend both. The article includes case studies and helps readers understand which approach aligns with their investment philosophy.', type: 'expert', readTime: '15 min', tags: ['Value Investing', 'Growth Investing', 'Strategy'] },
  { title: 'Small Cap vs Large Cap: Finding the Right Balance', excerpt: 'Understanding market capitalization and how to allocate across company sizes.', content: 'Market capitalization significantly impacts stock characteristics including risk, return potential, and correlation with economic cycles. This guide explores small-cap, mid-cap, and large-cap stocks, examining their historical performance and risk profiles. We discuss how to allocate across market caps based on investment goals and risk tolerance. The article helps investors understand when small caps outperform and how to balance exposure across different company sizes.', type: 'markets', readTime: '12 min', tags: ['Market Cap', 'Allocation', 'Strategy'] },
  { title: 'ESG Investing: Aligning Values with Returns', excerpt: 'How environmental, social, and governance factors impact investment decisions.', content: 'ESG investing has grown from a niche approach to a mainstream investment strategy. This analysis explores how ESG factors are evaluated, their impact on returns, and how to incorporate ESG considerations into portfolio construction. We examine different ESG investment approaches, from exclusionary screening to impact investing. The article addresses whether ESG investing requires sacrificing returns and how to select ESG-focused funds and ETFs.', type: 'expert', readTime: '14 min', tags: ['ESG', 'Sustainable Investing', 'Values'] },
  { title: 'Dollar-Cost Averaging vs Lump Sum Investing', excerpt: 'Comparing investment timing strategies and their effectiveness.', content: 'Investors face the decision of investing a lump sum immediately or using dollar-cost averaging to spread investments over time. This analysis examines historical performance data, psychological factors, and when each approach makes sense. We explore how market conditions, investment amounts, and time horizons affect the optimal strategy. The article helps readers understand the trade-offs and choose the approach that aligns with their risk tolerance and financial situation.', type: 'longterm', readTime: '11 min', tags: ['Strategy', 'Timing', 'DCA'] },
  { title: 'Market Timing: Why It Usually Fails', excerpt: 'Evidence-based analysis of market timing strategies and their pitfalls.', content: 'Market timing tempts many investors, but evidence suggests it rarely works. This comprehensive analysis examines why market timing is so difficult, including the impact of missing the best market days and the psychological challenges of timing decisions. We explore historical data on market timing attempts and why a long-term, disciplined approach typically outperforms. The article helps investors understand the risks of timing and embrace a more reliable investment strategy.', type: 'expert', readTime: '13 min', tags: ['Market Timing', 'Strategy', 'Behavioral Finance'] },
  { title: 'Inflation Hedging: Protecting Purchasing Power', excerpt: 'Investment strategies to protect against inflation erosion.', content: 'Inflation erodes purchasing power, making inflation hedging crucial for long-term investors. This guide explores assets that historically perform well during inflationary periods including commodities, real estate, and Treasury Inflation-Protected Securities (TIPS). We examine how different asset classes respond to inflation and how to construct portfolios that maintain purchasing power. The article provides practical strategies for protecting wealth against inflation over time.', type: 'longterm', readTime: '12 min', tags: ['Inflation', 'Hedging', 'Protection'] },
];

// Function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Function to generate articles with proper date distribution
function generateAnalyticsArticles(): AnalyticsArticle[] {
  const articles: AnalyticsArticle[] = [];
  const authors = Object.keys(authorAvatars);
  const types: Array<'expert' | 'markets' | 'longterm' | 'technical'> = ['expert', 'markets', 'longterm', 'technical'];
  
  // Date distribution: October 2023 to December 2024
  const monthDistribution = [
    { year: 2023, month: 10, count: 7 }, // October 2023
    { year: 2023, month: 11, count: 8 }, // November 2023
    { year: 2023, month: 12, count: 7 }, // December 2023
    { year: 2024, month: 1, count: 8 },  // January 2024
    { year: 2024, month: 2, count: 7 },  // February 2024
    { year: 2024, month: 3, count: 8 }, // March 2024
    { year: 2024, month: 4, count: 7 },  // April 2024
    { year: 2024, month: 5, count: 8 },  // May 2024
    { year: 2024, month: 6, count: 7 },  // June 2024
    { year: 2024, month: 7, count: 8 },  // July 2024
    { year: 2024, month: 8, count: 7 },  // August 2024
    { year: 2024, month: 9, count: 8 },  // September 2024
    { year: 2024, month: 10, count: 7 },  // October 2024
    { year: 2024, month: 11, count: 8 },   // November 2024
    { year: 2024, month: 12, count: 7 },   // December 2024
  ];
  
  let templateIndex = 0;
  let imageIndex = { expert: 0, markets: 0, longterm: 0, technical: 0 };
  
  for (const monthData of monthDistribution) {
    for (let i = 0; i < monthData.count; i++) {
      const template = articleTemplates[templateIndex % articleTemplates.length];
      const type = template.type;
      const author = authors[Math.floor(Math.random() * authors.length)];
      const imageUrl = categoryImages[type][imageIndex[type] % categoryImages[type].length];
      imageIndex[type]++;
      
      // Generate date within the month (distribute across days)
      const daysInMonth = new Date(monthData.year, monthData.month, 0).getDate();
      const day = Math.floor((i * daysInMonth) / monthData.count) + 1;
      const date = `${monthData.year}-${String(monthData.month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      // Generate additional content sections
      const sections = [
        { heading: 'Introduction', content: template.content.substring(0, 200) + '...' },
        { heading: 'Key Concepts', content: template.content.substring(200, 400) + '...' },
        { heading: 'Practical Applications', content: template.content.substring(400, 600) + '...' },
        { heading: 'Conclusion', content: template.content.substring(600) + '...' },
      ];
      
      // Generate resources
      const resources = [
        { title: 'Related Research Paper', url: 'https://example.com/research', type: 'article' as const },
        { title: 'Market Data Source', url: 'https://example.com/data', type: 'data' as const },
        { title: 'Investment Calculator', url: 'https://example.com/tool', type: 'tool' as const },
      ];
      
      // Generate additional images
      const additionalImages = [
        categoryImages[type][(imageIndex[type] + 1) % categoryImages[type].length],
        categoryImages[type][(imageIndex[type] + 2) % categoryImages[type].length],
      ];
      
      // Generate unique slug with date to avoid duplicates
      const baseSlug = generateSlug(template.title);
      const uniqueSlug = `${baseSlug}-${date.replace(/-/g, '')}-${i}`;
      
      articles.push({
        slug: uniqueSlug,
        title: template.title,
        excerpt: template.excerpt,
        content: template.content,
        date,
        author,
        authorAvatar: getAuthorAvatar(author),
        type,
        readTime: template.readTime,
        imageUrl,
        sections,
        resources,
        images: additionalImages,
        tags: template.tags || [],
        relatedMarkets: template.relatedMarkets || [],
      });
      
      templateIndex++;
    }
  }
  
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Mock Analytics Data with expanded articles - generated with proper date distribution
const mockAnalytics: AnalyticsArticle[] = generateAnalyticsArticles();

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
  try {
    const { supabase } = await import('@/integrations/supabase/client');
    
    let query = supabase
      .from('news_articles')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(100);
    
    if (filters?.market && filters.market !== 'all') {
      query = query.eq('market', filters.market);
    }
    
    if (filters?.source) {
      query = query.eq('source_name', filters.source);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching news:', error);
      // Fallback to mock data
      let result = [...mockNews];
      if (filters?.market && filters.market !== 'all') {
        result = result.filter(item => item.market === filters.market);
      }
      return result;
    }
    
    // Transform database format to NewsItem format
    return (data || []).map(article => ({
      id: article.id,
      title: article.title,
      excerpt: article.excerpt || '',
      content: article.content || article.excerpt || '',
      date: article.published_at,
      source: article.source_name,
      market: (article.market as NewsItem['market']) || 'general',
      imageUrl: article.image_url || undefined,
    }));
  } catch (error) {
    console.error('Error in fetchNews:', error);
    // Fallback to mock data
    let result = [...mockNews];
    if (filters?.market && filters.market !== 'all') {
      result = result.filter(item => item.market === filters.market);
    }
    return result;
  }
}

export async function fetchNewsById(id: string): Promise<NewsItem | null> {
  try {
    const { supabase } = await import('@/integrations/supabase/client');
    
    const { data, error } = await supabase
      .from('news_articles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !data) {
      console.error('Error fetching news by id:', error);
      // Fallback to mock data
      return mockNews.find(item => item.id === id) || null;
    }
    
    // Transform database format to NewsItem format
    return {
      id: data.id,
      title: data.title,
      excerpt: data.excerpt || '',
      content: data.content || data.excerpt || '',
      date: data.published_at,
      source: data.source_name,
      market: (data.market as NewsItem['market']) || 'general',
      imageUrl: data.image_url || undefined,
    };
  } catch (error) {
    console.error('Error in fetchNewsById:', error);
    // Fallback to mock data
    return mockNews.find(item => item.id === id) || null;
  }
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
  
  // Fetch from database - only approved discussions
  try {
    let query = supabase
      .from('forum_discussions')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false });

    if (categoryId) {
      query = query.eq('category', categoryId);
    }

    const { data, error } = await query;

    if (error) throw error;

    // Map database format to ForumTopic format
    return (data || []).map(item => ({
      id: item.id,
      title: item.title,
      author: item.author_name,
      authorId: item.user_id || '',
      authorAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(item.author_name)}&background=random`,
      categoryId: item.category,
      replies: item.reply_count || 0,
      views: item.view_count || 0,
      date: item.created_at,
      content: item.content,
      tags: item.tags || [],
      like_count: item.like_count || 0,
      isPinned: item.is_pinned || false,
      isFeatured: item.is_featured || false,
    }));
  } catch (error) {
    console.error('Error fetching forum topics:', error);
    // Fallback to mock data
    if (categoryId) {
      return mockForumTopics.filter(t => t.categoryId === categoryId);
    }
    return mockForumTopics;
  }
}

export async function fetchForumComments(topicId: string): Promise<ForumComment[]> {
  await delay(500);
  
  try {
    const { data, error } = await supabase
      .from('forum_replies')
      .select('*')
      .eq('discussion_id', topicId)
      .order('created_at', { ascending: true });

    if (error) throw error;

    // Map database format to ForumComment format
    return (data || []).map(item => ({
      id: item.id,
      topicId: topicId,
      author: item.author_name,
      authorId: item.user_id || '',
      authorAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(item.author_name)}&background=random`,
      content: item.content,
      date: new Date(item.created_at).toLocaleDateString('en-US', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      rating: item.like_count || 0,
    }));
  } catch (error) {
    console.error('Error fetching comments:', error);
    // Fallback to mock data
    return mockForumComments.filter(c => c.topicId === topicId);
  }
}

export async function fetchTopicById(id: string): Promise<ForumTopic | null> {
  await delay(500);
  
  try {
    const { data, error } = await supabase
      .from('forum_discussions')
      .select('*')
      .eq('id', id)
      .eq('is_approved', true)
      .single();

    if (error) throw error;
    if (!data) return null;

    return {
      id: data.id,
      title: data.title,
      author: data.author_name,
      authorId: data.user_id || '',
      authorAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.author_name)}&background=random`,
      categoryId: data.category,
      replies: data.reply_count || 0,
      views: data.view_count || 0,
      date: data.created_at,
      content: data.content,
      tags: data.tags || [],
      like_count: data.like_count || 0,
      isPinned: data.is_pinned || false,
      isFeatured: data.is_featured || false,
    };
  } catch (error) {
    console.error('Error fetching topic:', error);
    // Fallback to mock data
    return mockForumTopics.find(topic => topic.id === id) || null;
  }
}
