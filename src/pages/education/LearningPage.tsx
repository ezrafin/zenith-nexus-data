import { useState, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { CheckCircle, Award } from 'lucide-react';
import {
  getEducationBasicArticlesPath,
  getEducationAdvancedArticlesPath,
  getEducationCoursePath,
  getEducationVideoPath,
} from '@/lib/educationRoutes';
import { basicArticles, advancedArticles, allArticles } from '@/data/educationArticles';
import { ArticleCard } from '@/components/education/ArticleCard';

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
                {filteredArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
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
