// Shared article data for education pages

export type BasicArticle = {
  id: string;
  title: string;
  description: string;
  readTime: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate';
  type: 'basic';
};

export type AdvancedArticle = {
  id: string;
  title: string;
  description: string;
  readTime: string;
  category: string;
  difficulty: 'Advanced' | 'Expert';
  author: string;
  credentials: string;
  lastUpdated: string;
  type: 'advanced';
};

export type Article = BasicArticle | AdvancedArticle;

export const basicArticles: BasicArticle[] = [
  {
    id: 'what-is-stock-market',
    title: 'What is the Stock Market?',
    description: 'A comprehensive introduction to how stock markets work, their history, and why they matter for investors of all levels.',
    readTime: '8 min read',
    category: 'Getting Started',
    difficulty: 'Beginner',
    type: 'basic',
  },
  {
    id: 'stocks-vs-bonds',
    title: 'Understanding Stocks vs Bonds',
    description: 'Learn the key differences between stocks and bonds, their risk profiles, and how to use both in your portfolio.',
    readTime: '10 min read',
    category: 'Investment Terms',
    difficulty: 'Beginner',
    type: 'basic',
  },
  {
    id: 'how-to-read-quote',
    title: 'How to Read a Stock Quote',
    description: 'Decode stock quotes and understand what bid, ask, volume, and other numbers mean for your investments.',
    readTime: '6 min read',
    category: 'Stock Basics',
    difficulty: 'Beginner',
    type: 'basic',
  },
  {
    id: 'market-indices-intro',
    title: 'Introduction to Market Indices',
    description: 'Understand what S&P 500, Dow Jones, NASDAQ, and other indices mean for tracking market performance.',
    readTime: '7 min read',
    category: 'Stock Basics',
    difficulty: 'Beginner',
    type: 'basic',
  },
  {
    id: 'what-is-diversification',
    title: 'What is Diversification?',
    description: 'Learn why spreading your investments across different assets is crucial for managing risk and building wealth.',
    readTime: '9 min read',
    category: 'Risk Management',
    difficulty: 'Beginner',
    type: 'basic',
  },
  {
    id: 'pe-ratio',
    title: 'Understanding P/E Ratio',
    description: 'A beginner-friendly guide to one of the most common stock valuation metrics and how to use it.',
    readTime: '8 min read',
    category: 'Investment Terms',
    difficulty: 'Intermediate',
    type: 'basic',
  },
  {
    id: 'investment-accounts-types',
    title: 'Types of Investment Accounts',
    description: 'Compare brokerage accounts, IRAs, 401(k)s, and HSAs to choose the right accounts for your goals.',
    readTime: '12 min read',
    category: 'Account Types',
    difficulty: 'Beginner',
    type: 'basic',
  },
  {
    id: 'how-dividends-work',
    title: 'How Dividends Work',
    description: 'Everything you need to know about dividend payments, yield, reinvestment, and dividend investing strategies.',
    readTime: '10 min read',
    category: 'Stock Basics',
    difficulty: 'Beginner',
    type: 'basic',
  },
  {
    id: 'bull-vs-bear',
    title: 'Bull vs Bear Markets Explained',
    description: 'Understand market cycles, what drives them, and how to navigate both up and down markets successfully.',
    readTime: '7 min read',
    category: 'Investment Terms',
    difficulty: 'Beginner',
    type: 'basic',
  },
  {
    id: 'what-is-mutual-fund',
    title: 'What is a Mutual Fund?',
    description: 'Discover how mutual funds pool investor money, their fee structures, and when they make sense for your portfolio.',
    readTime: '9 min read',
    category: 'Investment Terms',
    difficulty: 'Beginner',
    type: 'basic',
  },
  {
    id: 'etf-expense-ratios',
    title: 'Understanding ETF Expense Ratios',
    description: 'Learn why expense ratios matter, how they impact returns over time, and what to look for when choosing ETFs.',
    readTime: '8 min read',
    category: 'Investment Terms',
    difficulty: 'Intermediate',
    type: 'basic',
  },
  {
    id: 'dollar-cost-averaging',
    title: 'Dollar-Cost Averaging Explained',
    description: 'Master this simple but powerful investment strategy that helps reduce timing risk and build wealth steadily.',
    readTime: '7 min read',
    category: 'Portfolio Basics',
    difficulty: 'Beginner',
    type: 'basic',
  },
  {
    id: 'how-to-set-goals',
    title: 'How to Set Investment Goals',
    description: 'Create clear, actionable investment goals based on your timeline, risk tolerance, and financial objectives.',
    readTime: '11 min read',
    category: 'Getting Started',
    difficulty: 'Beginner',
    type: 'basic',
  },
  {
    id: 'market-orders-intro',
    title: 'Introduction to Market Orders',
    description: 'Learn the difference between market orders, limit orders, stop orders, and when to use each type.',
    readTime: '8 min read',
    category: 'Stock Basics',
    difficulty: 'Beginner',
    type: 'basic',
  },
  {
    id: 'what-is-brokerage-account',
    title: 'What is a Brokerage Account?',
    description: 'Everything you need to know about opening and managing a brokerage account for investing.',
    readTime: '9 min read',
    category: 'Account Types',
    difficulty: 'Beginner',
    type: 'basic',
  },
];

export const advancedArticles: AdvancedArticle[] = [
  {
    id: 'advanced-candlestick-patterns',
    title: 'Advanced Candlestick Patterns',
    description: 'Master complex candlestick formations including morning/evening stars, three white soldiers, and harami patterns.',
    readTime: '15 min read',
    category: 'Technical Analysis',
    difficulty: 'Advanced',
    author: 'Dr. Michael Torres',
    credentials: 'CMT, CFA',
    lastUpdated: 'December 2024',
    type: 'advanced',
  },
  {
    id: 'black-scholes-model',
    title: 'The Black-Scholes Model Explained',
    description: 'Understanding the mathematical foundation of options pricing, its assumptions, limitations, and practical applications.',
    readTime: '20 min read',
    category: 'Options Trading',
    difficulty: 'Expert',
    author: 'Sarah Mitchell',
    credentials: 'PhD Economics, FRM',
    lastUpdated: 'November 2024',
    type: 'advanced',
  },
  {
    id: 'factor-investing-strategies',
    title: 'Factor Investing Strategies',
    description: 'Learn to build portfolios based on factors like value, momentum, quality, size, and low volatility for consistent alpha.',
    readTime: '18 min read',
    category: 'Quantitative Strategies',
    difficulty: 'Advanced',
    author: 'James Chen',
    credentials: 'CFA, CAIA',
    lastUpdated: 'December 2024',
    type: 'advanced',
  },
  {
    id: 'var-calculations',
    title: 'Value at Risk (VaR) Calculations',
    description: 'Quantify potential portfolio losses using historical, parametric, and Monte Carlo VaR methodologies.',
    readTime: '16 min read',
    category: 'Risk Management',
    difficulty: 'Expert',
    author: 'Dr. Amanda Foster',
    credentials: 'PhD Finance, FRM',
    lastUpdated: 'October 2024',
    type: 'advanced',
  },
  {
    id: 'modern-portfolio-theory',
    title: 'Modern Portfolio Theory Deep Dive',
    description: 'Explore the mathematics behind efficient frontier, capital allocation line, and optimal portfolio construction.',
    readTime: '22 min read',
    category: 'Portfolio Theory',
    difficulty: 'Advanced',
    author: 'Robert Nash',
    credentials: 'CFA, MBA',
    lastUpdated: 'November 2024',
    type: 'advanced',
  },
  {
    id: 'iron-condor-spreads',
    title: 'Iron Condor and Advanced Spreads',
    description: 'Multi-leg options strategies for generating income in sideways markets with defined risk parameters.',
    readTime: '14 min read',
    category: 'Options Trading',
    difficulty: 'Advanced',
    author: 'Lisa Wong',
    credentials: 'Options Specialist',
    lastUpdated: 'December 2024',
    type: 'advanced',
  },
  {
    id: 'elliott-wave-theory',
    title: 'Elliott Wave Theory',
    description: 'Analyze market cycles and predict price movements using wave patterns, Fibonacci retracements, and extensions.',
    readTime: '17 min read',
    category: 'Technical Analysis',
    difficulty: 'Advanced',
    author: 'David Park',
    credentials: 'CMT',
    lastUpdated: 'November 2024',
    type: 'advanced',
  },
  {
    id: 'monte-carlo-simulations',
    title: 'Monte Carlo Simulations in Finance',
    description: 'Apply probability modeling to forecast portfolio performance, retirement planning, and complex derivatives pricing.',
    readTime: '19 min read',
    category: 'Quantitative Strategies',
    difficulty: 'Expert',
    author: 'Dr. Jennifer Blake',
    credentials: 'PhD Statistics, CQF',
    lastUpdated: 'October 2024',
    type: 'advanced',
  },
  {
    id: 'hedging-strategies-portfolio-protection',
    title: 'Hedging Strategies for Portfolio Protection',
    description: 'Advanced techniques including protective puts, collars, and tail-risk hedging to protect during downturns.',
    readTime: '13 min read',
    category: 'Risk Management',
    difficulty: 'Advanced',
    author: 'Mark Thompson',
    credentials: 'CFA, FRM',
    lastUpdated: 'December 2024',
    type: 'advanced',
  },
  {
    id: 'covered-call-strategies',
    title: 'Covered Call Strategies for Income',
    description: 'Generate consistent income from your stock holdings using covered calls, including strike selection and roll techniques.',
    readTime: '12 min read',
    category: 'Options Trading',
    difficulty: 'Advanced',
    author: 'Patricia Lee',
    credentials: 'Series 7, Options Specialist',
    lastUpdated: 'November 2024',
    type: 'advanced',
  },
  {
    id: 'understanding-greeks',
    title: 'Understanding Greeks in Options',
    description: 'Master delta, gamma, theta, vega, and rho to better manage options positions and predict price movements.',
    readTime: '18 min read',
    category: 'Derivatives',
    difficulty: 'Advanced',
    author: 'Christopher Adams',
    credentials: 'CFA, Options Strategist',
    lastUpdated: 'December 2024',
    type: 'advanced',
  },
  {
    id: 'pairs-trading-strategies',
    title: 'Pairs Trading Strategies',
    description: 'Implement statistical arbitrage using cointegration analysis, spread trading, and mean reversion techniques.',
    readTime: '16 min read',
    category: 'Quantitative Strategies',
    difficulty: 'Expert',
    author: 'Dr. William Chen',
    credentials: 'PhD Finance, Quant Researcher',
    lastUpdated: 'October 2024',
    type: 'advanced',
  },
];

export const allArticles: Article[] = [...basicArticles, ...advancedArticles];

export function getArticleById(id: string): Article | undefined {
  return allArticles.find(article => article.id === id);
}

export function getArticleUrl(article: Article): string {
  return `/education/article/${article.id}`;
}
