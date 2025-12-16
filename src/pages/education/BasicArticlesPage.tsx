import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import { getEducationAdvancedArticlesPath } from '@/lib/educationRoutes';

const categories = [
  { name: 'Getting Started', count: 15 },
  { name: 'Stock Basics', count: 22 },
  { name: 'Investment Terms', count: 28 },
  { name: 'Risk Management', count: 12 },
  { name: 'Portfolio Basics', count: 14 },
  { name: 'Account Types', count: 8 },
];

type BasicArticle = {
  id: string;
  title: string;
  description: string;
  readTime: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate';
};

const articles: BasicArticle[] = [
  {
    id: 'what-is-stock-market',
    title: 'What is the Stock Market?',
    description: 'A comprehensive introduction to how stock markets work, their history, and why they matter for investors of all levels.',
    readTime: '8 min read',
    category: 'Getting Started',
    difficulty: 'Beginner',
  },
  {
    id: 'stocks-vs-bonds',
    title: 'Understanding Stocks vs Bonds',
    description: 'Learn the key differences between stocks and bonds, their risk profiles, and how to use both in your portfolio.',
    readTime: '10 min read',
    category: 'Investment Terms',
    difficulty: 'Beginner',
  },
  {
    id: 'how-to-read-quote',
    title: 'How to Read a Stock Quote',
    description: 'Decode stock quotes and understand what bid, ask, volume, and other numbers mean for your investments.',
    readTime: '6 min read',
    category: 'Stock Basics',
    difficulty: 'Beginner',
  },
  {
    id: 'market-indices-intro',
    title: 'Introduction to Market Indices',
    description: 'Understand what S&P 500, Dow Jones, NASDAQ, and other indices mean for tracking market performance.',
    readTime: '7 min read',
    category: 'Stock Basics',
    difficulty: 'Beginner',
  },
  {
    id: 'what-is-diversification',
    title: 'What is Diversification?',
    description: 'Learn why spreading your investments across different assets is crucial for managing risk and building wealth.',
    readTime: '9 min read',
    category: 'Risk Management',
    difficulty: 'Beginner',
  },
  {
    id: 'pe-ratio',
    title: 'Understanding P/E Ratio',
    description: 'A beginner-friendly guide to one of the most common stock valuation metrics and how to use it.',
    readTime: '8 min read',
    category: 'Investment Terms',
    difficulty: 'Intermediate',
  },
  {
    id: 'investment-accounts-types',
    title: 'Types of Investment Accounts',
    description: 'Compare brokerage accounts, IRAs, 401(k)s, and HSAs to choose the right accounts for your goals.',
    readTime: '12 min read',
    category: 'Account Types',
    difficulty: 'Beginner',
  },
  {
    id: 'how-dividends-work',
    title: 'How Dividends Work',
    description: 'Everything you need to know about dividend payments, yield, reinvestment, and dividend investing strategies.',
    readTime: '10 min read',
    category: 'Stock Basics',
    difficulty: 'Beginner',
  },
  {
    id: 'bull-vs-bear',
    title: 'Bull vs Bear Markets Explained',
    description: 'Understand market cycles, what drives them, and how to navigate both up and down markets successfully.',
    readTime: '7 min read',
    category: 'Investment Terms',
    difficulty: 'Beginner',
  },
  {
    id: 'what-is-mutual-fund',
    title: 'What is a Mutual Fund?',
    description: 'Discover how mutual funds pool investor money, their fee structures, and when they make sense for your portfolio.',
    readTime: '9 min read',
    category: 'Investment Terms',
    difficulty: 'Beginner',
  },
  {
    id: 'etf-expense-ratios',
    title: 'Understanding ETF Expense Ratios',
    description: 'Learn why expense ratios matter, how they impact returns over time, and what to look for when choosing ETFs.',
    readTime: '8 min read',
    category: 'Investment Terms',
    difficulty: 'Intermediate',
  },
  {
    id: 'dollar-cost-averaging',
    title: 'Dollar-Cost Averaging Explained',
    description: 'Master this simple but powerful investment strategy that helps reduce timing risk and build wealth steadily.',
    readTime: '7 min read',
    category: 'Portfolio Basics',
    difficulty: 'Beginner',
  },
  {
    id: 'how-to-set-goals',
    title: 'How to Set Investment Goals',
    description: 'Create clear, actionable investment goals based on your timeline, risk tolerance, and financial objectives.',
    readTime: '11 min read',
    category: 'Getting Started',
    difficulty: 'Beginner',
  },
  {
    id: 'market-orders-intro',
    title: 'Introduction to Market Orders',
    description: 'Learn the difference between market orders, limit orders, stop orders, and when to use each type.',
    readTime: '8 min read',
    category: 'Stock Basics',
    difficulty: 'Beginner',
  },
  {
    id: 'what-is-brokerage-account',
    title: 'What is a Brokerage Account?',
    description: 'Everything you need to know about opening and managing a brokerage account for investing.',
    readTime: '9 min read',
    category: 'Account Types',
    difficulty: 'Beginner',
  },
];

export default function BasicArticlesPage() {
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const stored = localStorage.getItem('education-basic-articles-read');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Validate it's an array of strings
        if (Array.isArray(parsed) && parsed.every(id => typeof id === 'string')) {
          setCompletedIds(parsed);
        } else {
          // Clear corrupted data
          localStorage.removeItem('education-basic-articles-read');
        }
      }
    } catch (e) {
      console.error('Error loading completed articles:', e);
      // Clear corrupted data
      try {
        localStorage.removeItem('education-basic-articles-read');
      } catch {
        // Ignore cleanup errors
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('education-basic-articles-read', JSON.stringify(completedIds));
    } catch (e) {
      console.error('Error saving completed articles:', e);
      // Check if quota exceeded
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
        console.warn('localStorage quota exceeded');
      }
    }
  }, [completedIds]);

  const toggleCompleted = (id: string) => {
    setCompletedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  const completedCount = completedIds.length;
  const totalCount = articles.length;

  return (
    <Layout>
      <div className="pt-24 pb-16">
        <section className="container-wide section-spacing-sm">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="badge-primary mb-4">Education</span>
            <h1 className="heading-xl mb-6">Basic Articles</h1>
            <p className="body-xl">
              Start your investment journey with our beginner-friendly guides and tutorials. Perfect for new investors.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="glass-card p-6 sticky top-24">
                <h3 className="font-semibold mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.name}>
                      <button className="flex items-center justify-between w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
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
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <div className="flex items-center gap-2 text-primary">
                      <CheckCircle className="h-4 w-4" />
                      <span className="font-medium">Your Progress</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {completedCount}/{totalCount} completed
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Mark articles as completed to track what you&apos;ve already learned.
                  </p>
                </div>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-muted-foreground">
                  {articles.length} articles • {completedCount} completed
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {articles.map((article) => {
                  const isCompleted = completedIds.includes(article.id);
                  return (
                  <article key={article.id} className="glass-card-hover p-6 group flex flex-col justify-between">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="badge-secondary">{article.category}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        article.difficulty === 'Intermediate' 
                          ? 'bg-yellow-500/20 text-yellow-400' 
                          : 'bg-green-500/20 text-green-400'
                      }`}>
                        {article.difficulty}
                      </span>
                      {isCompleted && (
                        <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 uppercase tracking-wide font-semibold">
                          Completed
                        </span>
                      )}
                    </div>
                    <h3 className="heading-xs mb-2 group-hover:text-primary transition-colors">{article.title}</h3>
                    <p className="body-sm mb-4">{article.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => toggleCompleted(article.id)}
                          className="text-xs text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
                        >
                          {isCompleted ? 'Mark as unread' : 'Mark as completed'}
                        </button>
                        <Link
                          to={`/education/learning`}
                          className="inline-flex items-center text-sm text-primary hover:underline"
                        >
                          Read Article <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );})}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 glass-card p-8 text-center">
            <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="heading-sm mb-4">Ready for More Advanced Content?</h2>
            <p className="body-md mb-6 max-w-xl mx-auto">
              Once you have mastered the basics, explore our advanced articles for deeper insights and sophisticated strategies.
            </p>
            <Link to={getEducationAdvancedArticlesPath()} className="btn-primary">
              View Advanced Articles
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
