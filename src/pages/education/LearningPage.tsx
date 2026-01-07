import { useState, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { CheckCircle, Award } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import {
  getEducationBasicArticlesPath,
  getEducationAdvancedArticlesPath,
  getEducationCoursePath,
  getEducationVideoPath,
} from '@/lib/educationRoutes';
import { basicArticles, advancedArticles, allArticles } from '@/data/educationArticles';
import { ArticleCard } from '@/components/education/ArticleCard';
import { usePageBillCollection } from '@/hooks/usePageBillCollection';

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
  const { t } = useTranslation({ namespace: 'education' });
  const [levelFilter, setLevelFilter] = useState<'all' | 'basic' | 'advanced'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Bill collection: learning_page_visit
  const { CoinComponent } = usePageBillCollection({ billId: 'learning_page_visit' });

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
            <span className="badge-primary mb-4">
              {t('learningHub.badge')}
            </span>
            <h1 className="heading-xl mb-4">
              {t('learningHub.title')}
            </h1>
            <p className="body-xl">
              {t('learningHub.subtitle')}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link to={getEducationBasicArticlesPath()} className="btn-primary">
                {t('learningHub.ctaBasics')}
              </Link>
              <Link to={getEducationAdvancedArticlesPath()} className="btn-ghost">
                {t('learningHub.ctaAdvanced')}
              </Link>
              <Link to={getEducationVideoPath()} className="btn-ghost">
                {t('learningHub.ctaVideos')}
              </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="glass-card p-6 sticky top-24">
                <h3 className="font-semibold mb-4">
                  {t('learningHub.sidebarCategoriesTitle')}
                </h3>
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
                        <span>
                          {category.name === 'All'
                            ? t('learningHub.filterAllLevels')
                            : category.name}
                        </span>
                        <span className="bg-secondary px-2 py-0.5 rounded-full text-xs">{category.count}</span>
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="text-sm font-medium mb-3">
                    {t('learningHub.sidebarDifficultyTitle')}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-muted-foreground">
                        {t('learningHub.difficultyBeginner')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 rounded-full bg-yellow-500" />
                      <span className="text-muted-foreground">
                        {t('learningHub.difficultyIntermediate')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 rounded-full bg-yellow-500" />
                      <span className="text-muted-foreground">
                        {t('learningHub.difficultyAdvanced')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      <span className="text-muted-foreground">
                        {t('learningHub.difficultyExpert')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-primary mb-2">
                    <CheckCircle className="h-4 w-4" />
                    <span className="font-medium">
                      {t('learningHub.trackProgressTitle')}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t('learningHub.trackProgressDescription')}
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
                    {t('learningHub.filterAllLevels')}
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
                    {t('learningHub.filterBasics')}
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
                    {t('learningHub.filterAdvanced')}
                  </button>
                </div>

                <span className="text-sm text-muted-foreground">
                  {filteredArticles.length === 1
                    ? t('learningHub.articlesCountSingle', { count: filteredArticles.length })
                    : t('learningHub.articlesCount', { count: filteredArticles.length })}
                  {selectedCategory && selectedCategory !== 'All' &&
                    ` ${t('learningHub.articlesInCategory', { category: selectedCategory })}`}
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
            <h2 className="heading-sm mb-4">
              {t('advanced.ctaTitle')}
            </h2>
            <p className="body-md mb-6 max-w-xl mx-auto">
              {t('advanced.ctaDescription')}
            </p>
            <Link to={getEducationCoursePath()} className="btn-primary">
              {t('advanced.ctaButton')}
            </Link>
          </div>
        </section>
      </div>
      {CoinComponent && <CoinComponent />}
    </Layout>
  );
}
