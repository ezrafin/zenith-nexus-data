import { useState, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, ArrowRight, CheckCircle, Award, Calendar } from 'lucide-react';
import {
  getEducationBasicArticlesPath,
  getEducationAdvancedArticlesPath,
  getEducationCoursePath,
  getEducationVideoPath,
} from '@/lib/educationRoutes';

// Category names used across basic and advanced articles
const categoryNames = [
  'All',
  'Getting Started',
  'Stock Basics',
  'Investment Terms',
  'Risk Management',
  'Portfolio Basics',
  'Account Types',
  'Technical Analysis',
  'Options Trading',
  'Quantitative Strategies',
  'Portfolio Theory',
  'Derivatives',
] as const;

// Basic articles
const basicArticles = [
  {
    title: 'What is the Stock Market?',
    description: 'A comprehensive introduction to how stock markets work, their history, and why they matter for investors of all levels.',
    readTime: '8 min read',
    category: 'Getting Started',
    difficulty: 'Beginner',
  },
  {
    title: 'Understanding Stocks vs Bonds',
    description: 'Learn the key differences between stocks and bonds, their risk profiles, and how to use both in your portfolio.',
    readTime: '10 min read',
    category: 'Investment Terms',
    difficulty: 'Beginner',
  },
  {
    title: 'How to Read a Stock Quote',
    description: 'Decode stock quotes and understand what bid, ask, volume, and other numbers mean for your investments.',
    readTime: '6 min read',
    category: 'Stock Basics',
    difficulty: 'Beginner',
  },
  {
    title: 'Introduction to Market Indices',
    description: 'Understand what S&P 500, Dow Jones, NASDAQ, and other indices mean for tracking market performance.',
    readTime: '7 min read',
    category: 'Stock Basics',
    difficulty: 'Beginner',
  },
  {
    title: 'What is Diversification?',
    description: 'Learn why spreading your investments across different assets is crucial for managing risk and building wealth.',
    readTime: '9 min read',
    category: 'Risk Management',
    difficulty: 'Beginner',
  },
  {
    title: 'Understanding P/E Ratio',
    description: 'A beginner-friendly guide to one of the most common stock valuation metrics and how to use it.',
    readTime: '8 min read',
    category: 'Investment Terms',
    difficulty: 'Intermediate',
  },
  {
    title: 'Types of Investment Accounts',
    description: 'Compare brokerage accounts, IRAs, 401(k)s, and HSAs to choose the right accounts for your goals.',
    readTime: '12 min read',
    category: 'Account Types',
    difficulty: 'Beginner',
  },
  {
    title: 'How Dividends Work',
    description: 'Everything you need to know about dividend payments, yield, reinvestment, and dividend investing strategies.',
    readTime: '10 min read',
    category: 'Stock Basics',
    difficulty: 'Beginner',
  },
  {
    title: 'Bull vs Bear Markets Explained',
    description: 'Understand market cycles, what drives them, and how to navigate both up and down markets successfully.',
    readTime: '7 min read',
    category: 'Investment Terms',
    difficulty: 'Beginner',
  },
  {
    title: 'What is a Mutual Fund?',
    description: 'Discover how mutual funds pool investor money, their fee structures, and when they make sense for your portfolio.',
    readTime: '9 min read',
    category: 'Investment Terms',
    difficulty: 'Beginner',
  },
  {
    title: 'Understanding ETF Expense Ratios',
    description: 'Learn why expense ratios matter, how they impact returns over time, and what to look for when choosing ETFs.',
    readTime: '8 min read',
    category: 'Investment Terms',
    difficulty: 'Intermediate',
  },
  {
    title: 'Dollar-Cost Averaging Explained',
    description: 'Master this simple but powerful investment strategy that helps reduce timing risk and build wealth steadily.',
    readTime: '7 min read',
    category: 'Portfolio Basics',
    difficulty: 'Beginner',
  },
  {
    title: 'How to Set Investment Goals',
    description: 'Create clear, actionable investment goals based on your timeline, risk tolerance, and financial objectives.',
    readTime: '11 min read',
    category: 'Getting Started',
    difficulty: 'Beginner',
  },
  {
    title: 'Introduction to Market Orders',
    description: 'Learn the difference between market orders, limit orders, stop orders, and when to use each type.',
    readTime: '8 min read',
    category: 'Stock Basics',
    difficulty: 'Beginner',
  },
  {
    title: 'What is a Brokerage Account?',
    description: 'Everything you need to know about opening and managing a brokerage account for investing.',
    readTime: '9 min read',
    category: 'Account Types',
    difficulty: 'Beginner',
  },
];

// Advanced articles
const advancedArticles = [
  {
    title: 'Advanced Candlestick Patterns',
    description: 'Master complex candlestick formations including morning/evening stars, three white soldiers, and harami patterns.',
    readTime: '15 min read',
    category: 'Technical Analysis',
    difficulty: 'Advanced',
    author: 'Dr. Michael Torres',
    credentials: 'CMT, CFA',
    lastUpdated: 'December 2024',
  },
  {
    title: 'The Black-Scholes Model Explained',
    description: 'Understanding the mathematical foundation of options pricing, its assumptions, limitations, and practical applications.',
    readTime: '20 min read',
    category: 'Options Trading',
    difficulty: 'Expert',
    author: 'Sarah Mitchell',
    credentials: 'PhD Economics, FRM',
    lastUpdated: 'November 2024',
  },
  {
    title: 'Factor Investing Strategies',
    description: 'Learn to build portfolios based on factors like value, momentum, quality, size, and low volatility for consistent alpha.',
    readTime: '18 min read',
    category: 'Quantitative Strategies',
    difficulty: 'Advanced',
    author: 'James Chen',
    credentials: 'CFA, CAIA',
    lastUpdated: 'December 2024',
  },
  {
    title: 'Value at Risk (VaR) Calculations',
    description: 'Quantify potential portfolio losses using historical, parametric, and Monte Carlo VaR methodologies.',
    readTime: '16 min read',
    category: 'Risk Management',
    difficulty: 'Expert',
    author: 'Dr. Amanda Foster',
    credentials: 'PhD Finance, FRM',
    lastUpdated: 'October 2024',
  },
  {
    title: 'Modern Portfolio Theory Deep Dive',
    description: 'Explore the mathematics behind efficient frontier, capital allocation line, and optimal portfolio construction.',
    readTime: '22 min read',
    category: 'Portfolio Theory',
    difficulty: 'Advanced',
    author: 'Robert Nash',
    credentials: 'CFA, MBA',
    lastUpdated: 'November 2024',
  },
  {
    title: 'Iron Condor and Advanced Spreads',
    description: 'Multi-leg options strategies for generating income in sideways markets with defined risk parameters.',
    readTime: '14 min read',
    category: 'Options Trading',
    difficulty: 'Advanced',
    author: 'Lisa Wong',
    credentials: 'Options Specialist',
    lastUpdated: 'December 2024',
  },
  {
    title: 'Elliott Wave Theory',
    description: 'Analyze market cycles and predict price movements using wave patterns, Fibonacci retracements, and extensions.',
    readTime: '17 min read',
    category: 'Technical Analysis',
    difficulty: 'Advanced',
    author: 'David Park',
    credentials: 'CMT',
    lastUpdated: 'November 2024',
  },
  {
    title: 'Monte Carlo Simulations in Finance',
    description: 'Apply probability modeling to forecast portfolio performance, retirement planning, and complex derivatives pricing.',
    readTime: '19 min read',
    category: 'Quantitative Strategies',
    difficulty: 'Expert',
    author: 'Dr. Jennifer Blake',
    credentials: 'PhD Statistics, CQF',
    lastUpdated: 'October 2024',
  },
  {
    title: 'Hedging Strategies for Portfolio Protection',
    description: 'Advanced techniques including protective puts, collars, and tail-risk hedging to protect during downturns.',
    readTime: '13 min read',
    category: 'Risk Management',
    difficulty: 'Advanced',
    author: 'Mark Thompson',
    credentials: 'CFA, FRM',
    lastUpdated: 'December 2024',
  },
  {
    title: 'Covered Call Strategies for Income',
    description: 'Generate consistent income from your stock holdings using covered calls, including strike selection and roll techniques.',
    readTime: '12 min read',
    category: 'Options Trading',
    difficulty: 'Advanced',
    author: 'Patricia Lee',
    credentials: 'Series 7, Options Specialist',
    lastUpdated: 'November 2024',
  },
  {
    title: 'Understanding Greeks in Options',
    description: 'Master delta, gamma, theta, vega, and rho to better manage options positions and predict price movements.',
    readTime: '18 min read',
    category: 'Derivatives',
    difficulty: 'Advanced',
    author: 'Christopher Adams',
    credentials: 'CFA, Options Strategist',
    lastUpdated: 'December 2024',
  },
  {
    title: 'Pairs Trading Strategies',
    description: 'Implement statistical arbitrage using cointegration analysis, spread trading, and mean reversion techniques.',
    readTime: '16 min read',
    category: 'Quantitative Strategies',
    difficulty: 'Expert',
    author: 'Dr. William Chen',
    credentials: 'PhD Finance, Quant Researcher',
    lastUpdated: 'October 2024',
  },
];

// Combine all articles
const allArticles = [
  ...basicArticles.map(article => ({ ...article, type: 'basic' as const })),
  ...advancedArticles.map(article => ({ ...article, type: 'advanced' as const })),
];

export default function LearningPage() {
  const [levelFilter, setLevelFilter] = useState<'all' | 'basic' | 'advanced'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Calculate category counts based on current level filter
  const categoriesWithCounts = useMemo(() => {
    const scopedArticles =
      levelFilter === 'all' ? allArticles : allArticles.filter(article => article.type === levelFilter);

    return categoryNames.map(name => {
      if (name === 'All') {
        return { name, count: scopedArticles.length };
      }
      const count = scopedArticles.filter(article => article.category === name).length;
      return { name, count };
    });
  }, [levelFilter]);

  // Filter articles based on level and selected category
  const filteredArticles = useMemo(() => {
    let scoped = allArticles;
    if (levelFilter !== 'all') {
      scoped = scoped.filter(article => article.type === levelFilter);
    }

    if (selectedCategory && selectedCategory !== 'All') {
      scoped = scoped.filter(article => article.category === selectedCategory);
    }

    return scoped;
  }, [levelFilter, selectedCategory]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-500/20 text-green-400';
      case 'Intermediate':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'Advanced':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'Expert':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Layout>
      <div className="pt-24 pb-16">
        <section className="container-wide section-spacing-sm">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="badge-primary mb-4">Education</span>
            <h1 className="heading-xl mb-4">Investment Learning Hub</h1>
            <p className="body-xl">
              Structured investment education from first steps to advanced strategies. Choose your level and learn at your own pace.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link to={getEducationBasicArticlesPath()} className="btn-primary">
                Start with Basics
              </Link>
              <Link to={getEducationAdvancedArticlesPath()} className="btn-ghost">
                Jump to Advanced
              </Link>
              <Link to={getEducationVideoPath()} className="btn-ghost">
                Watch Videos
              </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="glass-card p-6 sticky top-24">
                <h3 className="font-semibold mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categoriesWithCounts.map((category) => (
                    <li key={category.name}>
                      <button
                        onClick={() => setSelectedCategory(category.name === 'All' ? null : category.name)}
                        className={`flex items-center justify-between w-full py-2 text-sm rounded-lg transition-colors ${
                          (selectedCategory === null && category.name === 'All') || selectedCategory === category.name
                            ? 'text-foreground bg-secondary/50 font-medium'
                            : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'
                        }`}
                      >
                        <span>{category.name}</span>
                        <span className="bg-secondary px-2 py-0.5 rounded-full text-xs">{category.count}</span>
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="text-sm font-medium mb-3">Difficulty Levels</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-muted-foreground">Beginner</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 rounded-full bg-yellow-500" />
                      <span className="text-muted-foreground">Intermediate</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 rounded-full bg-yellow-500" />
                      <span className="text-muted-foreground">Advanced</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      <span className="text-muted-foreground">Expert</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-primary mb-2">
                    <CheckCircle className="h-4 w-4" />
                    <span className="font-medium">Track Progress</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Sign up to save your reading progress and earn certificates.
                  </p>
                </div>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="lg:col-span-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="inline-flex rounded-full border border-border bg-card p-1 text-xs sm:text-sm">
                  <button
                    type="button"
                    onClick={() => setLevelFilter('all')}
                    className={`px-3 sm:px-4 py-1.5 rounded-full transition-colors ${
                      levelFilter === 'all'
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/40'
                    }`}
                  >
                    All levels
                  </button>
                  <button
                    type="button"
                    onClick={() => setLevelFilter('basic')}
                    className={`px-3 sm:px-4 py-1.5 rounded-full transition-colors ${
                      levelFilter === 'basic'
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/40'
                    }`}
                  >
                    Basics
                  </button>
                  <button
                    type="button"
                    onClick={() => setLevelFilter('advanced')}
                    className={`px-3 sm:px-4 py-1.5 rounded-full transition-colors ${
                      levelFilter === 'advanced'
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/40'
                    }`}
                  >
                    Advanced
                  </button>
                </div>

                <span className="text-sm text-muted-foreground">
                  {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
                  {selectedCategory && selectedCategory !== 'All' && ` in ${selectedCategory}`}
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {filteredArticles.map((article, index) => (
                  <article key={`${article.type}-${index}`} className="glass-card-hover p-6 group">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="badge-secondary">{article.category}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getDifficultyColor(article.difficulty)}`}>
                        {article.difficulty}
                      </span>
                    </div>
                    <h3 className="heading-xs mb-2 group-hover:text-primary transition-colors">{article.title}</h3>
                    <p className="body-sm mb-3">{article.description}</p>
                    {article.type === 'advanced' && 'author' in article && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <span className="font-medium text-foreground">{article.author}</span>
                        <span>•</span>
                        <span>{article.credentials}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {article.readTime}
                        </span>
                        {article.type === 'advanced' && 'lastUpdated' in article && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {article.lastUpdated}
                          </span>
                        )}
                      </div>
                      <Link to="#" className="inline-flex items-center text-sm text-primary hover:underline">
                        Read {article.type === 'advanced' ? '' : 'Article'} <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 glass-card p-8 text-center">
            <Award className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="heading-sm mb-4">Take Your Skills to the Next Level</h2>
            <p className="body-md mb-6 max-w-xl mx-auto">
              Enroll in our structured learning course for a comprehensive investment education with certification.
            </p>
            <Link to={getEducationCoursePath()} className="btn-primary">
              Explore Learning Course
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}

