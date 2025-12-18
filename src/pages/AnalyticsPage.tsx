import { useState, useRef, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { AnalyticsCard } from '@/components/AnalyticsCard';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { Pagination } from '@/components/Pagination';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

const ITEMS_PER_PAGE = 15;

export default function AnalyticsPage() {
  const { t } = useTranslation({ namespace: 'analytics' });
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { data: articles = [], isLoading: loading } = useAnalytics({ 
    type: activeFilter === 'all' ? undefined : activeFilter 
  });

  const typeFilters = useMemo(
    () => [
      { value: 'all', label: t('filters.all') },
      { value: 'expert', label: t('filters.expert') },
      { value: 'markets', label: t('filters.markets') },
      { value: 'longterm', label: t('filters.longterm') },
      { value: 'technical', label: t('filters.technical') },
    ],
    [t]
  );
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setCurrentPage(1);
    // Scroll to top when filter changes
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of section when page changes
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };

  // Pagination
  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
  const paginatedArticles = articles.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  return <Layout>
      <section ref={sectionRef} className="section-spacing">
        <div className="container-wide">
          <div className="mb-10">
            <h1 className="heading-lg mb-4">{t('page.title')}</h1>
            <p className="body-md max-w-2xl text-muted-foreground">
              {t('page.description')}
            </p>
            
          </div>

          {/* Filters */}
          <div className="mb-10">
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 sm:flex-wrap sm:overflow-visible">
              {typeFilters.map(filter => (
                <Button
                  key={filter.value}
                  variant={activeFilter === filter.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange(filter.value)}
                  className={cn(
                    'whitespace-nowrap',
                    activeFilter === filter.value && 'bg-primary text-primary-foreground'
                  )}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          {loading ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({
            length: ITEMS_PER_PAGE
          }).map((_, i) => <SkeletonCard key={i} lines={4} />)}
            </div> : paginatedArticles.length > 0 ? <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedArticles.map((article, index) => <AnalyticsCard key={article.slug} article={article} index={index} />)}
              </div>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </> : <div className="text-center py-20">
              <p className="text-muted-foreground">{t('empty.noArticles')}</p>
            </div>}
        </div>
      </section>
    </Layout>;
}