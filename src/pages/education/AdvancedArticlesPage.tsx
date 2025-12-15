import { useEffect, useState } from '@/../node_modules/react';
import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Award, Clock, ArrowRight, Calendar, CheckCircle } from 'lucide-react';
import { getEducationCoursePath } from '@/lib/educationRoutes';

const categories = [
  { name: 'Technical Analysis', count: 18 },
  { name: 'Options Trading', count: 15 },
  { name: 'Quantitative Strategies', count: 12 },
  { name: 'Risk Management', count: 14 },
  { name: 'Portfolio Theory', count: 16 },
  { name: 'Derivatives', count: 9 },
];

type AdvancedArticle = {
  id: string;
  title: string;
  description: string;
  readTime: string;
  category: string;
  difficulty: 'Advanced' | 'Expert';
  author: string;
  credentials: string;
  lastUpdated: string;
};

const articles: AdvancedArticle[] = [
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
  },
];

export default function AdvancedArticlesPage() {
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('education-advanced-articles-read') : null;
      if (stored) {
        setCompletedIds(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('education-advanced-articles-read', JSON.stringify(completedIds));
      }
    } catch {
      // ignore
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
            <h1 className="heading-xl mb-6">Advanced Articles</h1>
            <p className="body-xl">
              In-depth analysis and sophisticated strategies for experienced investors. Written by industry professionals.
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
                      <span className="w-2 h-2 rounded-full bg-yellow-500" />
                      <span className="text-muted-foreground">Advanced</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      <span className="text-muted-foreground">Expert</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-3">Prerequisites</h4>
                    <p className="text-xs text-muted-foreground">
                      These articles assume familiarity with basic investing concepts. Complete our Basic Articles first if you are new to investing.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-border">
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
                      Mark articles you&apos;ve mastered to track your expert‑level learning.
                    </p>
                  </div>
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
                        article.difficulty === 'Expert' 
                          ? 'bg-red-500/20 text-red-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
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
                    <p className="body-sm mb-3">{article.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <span className="font-medium text-foreground">{article.author}</span>
                      <span>•</span>
                      <span>{article.credentials}</span>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {article.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {article.lastUpdated}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => toggleCompleted(article.id)}
                          className="text-xs text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
                        >
                          {isCompleted ? 'Mark as unread' : 'Mark as completed'}
                        </button>
                        <Link to="#" className="inline-flex items-center text-sm text-primary hover:underline">
                          Read <ArrowRight className="h-4 w-4 ml-1" />
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
