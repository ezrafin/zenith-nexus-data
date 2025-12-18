import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle } from 'lucide-react';
import { getEducationAdvancedArticlesPath } from '@/lib/educationRoutes';
import { basicArticles } from '@/data/educationArticles';
import { ArticleCard } from '@/components/education/ArticleCard';
import { useTranslation } from '@/hooks/useTranslation';

const categories = [
  { name: 'Getting Started', count: 15 },
  { name: 'Stock Basics', count: 22 },
  { name: 'Investment Terms', count: 28 },
  { name: 'Risk Management', count: 12 },
  { name: 'Portfolio Basics', count: 14 },
  { name: 'Account Types', count: 8 },
];

export default function BasicArticlesPage() {
  const { t } = useTranslation({ namespace: 'education' });
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const stored = localStorage.getItem('education-basic-articles-read');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.every(id => typeof id === 'string')) {
          setCompletedIds(parsed);
        } else {
          localStorage.removeItem('education-basic-articles-read');
        }
      }
    } catch (e) {
      console.error('Error loading completed articles:', e);
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
    }
  }, [completedIds]);

  const toggleCompleted = (id: string) => {
    setCompletedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  const completedCount = completedIds.length;
  const totalCount = basicArticles.length;

  return (
    <Layout>
      <div className="pt-24 pb-16">
        <section className="container-wide section-spacing-sm">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="badge-primary mb-4">
              {t('basic.badge')}
            </span>
            <h1 className="heading-xl mb-6">
              {t('basic.title')}
            </h1>
            <p className="body-xl">
              {t('basic.description')}
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="glass-card p-6 sticky top-24">
                <h3 className="font-semibold mb-4">
                  {t('basic.sidebarCategoriesTitle')}
                </h3>
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
                  <h4 className="text-sm font-medium mb-3">
                    {t('basic.sidebarDifficultyTitle')}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-muted-foreground">
                        {t('basic.difficultyBeginner')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 rounded-full bg-yellow-500" />
                      <span className="text-muted-foreground">
                        {t('basic.difficultyIntermediate')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <div className="flex items-center gap-2 text-primary">
                      <CheckCircle className="h-4 w-4" />
                      <span className="font-medium">
                        {t('basic.yourProgressTitle')}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {t('basic.yourProgressSummary', {
                        completed: completedCount,
                        total: totalCount,
                      })}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t('basic.yourProgressDescription')}
                  </p>
                </div>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-muted-foreground">
                  {t('basic.summary', {
                    total: basicArticles.length,
                    completed: completedCount,
                  })}
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {basicArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    isCompleted={completedIds.includes(article.id)}
                    onToggleCompleted={toggleCompleted}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 glass-card p-8 text-center">
            <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="heading-sm mb-4">
              {t('basic.ctaTitle')}
            </h2>
            <p className="body-md mb-6 max-w-xl mx-auto">
              {t('basic.ctaDescription')}
            </p>
            <Link to={getEducationAdvancedArticlesPath()} className="btn-primary">
              {t('basic.ctaButton')}
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
