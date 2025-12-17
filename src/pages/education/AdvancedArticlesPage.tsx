import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Award, CheckCircle } from 'lucide-react';
import { getEducationCoursePath } from '@/lib/educationRoutes';
import { advancedArticles } from '@/data/educationArticles';
import { ArticleCard } from '@/components/education/ArticleCard';

const categories = [
  { name: 'Technical Analysis', count: 18 },
  { name: 'Options Trading', count: 15 },
  { name: 'Quantitative Strategies', count: 12 },
  { name: 'Risk Management', count: 14 },
  { name: 'Portfolio Theory', count: 16 },
  { name: 'Derivatives', count: 9 },
];

export default function AdvancedArticlesPage() {
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const stored = localStorage.getItem('education-advanced-articles-read');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.every(id => typeof id === 'string')) {
          setCompletedIds(parsed);
        } else {
          localStorage.removeItem('education-advanced-articles-read');
        }
      }
    } catch (e) {
      console.error('Error loading completed articles:', e);
      try {
        localStorage.removeItem('education-advanced-articles-read');
      } catch {
        // Ignore cleanup errors
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('education-advanced-articles-read', JSON.stringify(completedIds));
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
  const totalCount = advancedArticles.length;

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
                  {advancedArticles.length} articles • {completedCount} completed
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {advancedArticles.map((article) => (
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
