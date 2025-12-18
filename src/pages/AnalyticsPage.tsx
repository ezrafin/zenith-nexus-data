import { useState, useRef, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { AnalyticsCard } from '@/components/AnalyticsCard';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { Pagination } from '@/components/Pagination';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';
import { authors } from '@/data/authors';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ITEMS_PER_PAGE = 15;

export default function AnalyticsPage() {
  const { t } = useTranslation({ namespace: 'analytics' });
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeAuthor, setActiveAuthor] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);

  const { data: articles = [], isLoading: loading } = useAnalytics({
    type: activeFilter === 'all' ? undefined : activeFilter,
  });

  // Filter articles by author
  const filteredArticles = useMemo(() => {
    if (!activeAuthor) return articles;
    return articles.filter((article) => article.author === activeAuthor);
  }, [articles, activeAuthor]);

  // Calculate article counts per author dynamically
  const authorCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    articles.forEach((article) => {
      counts[article.author] = (counts[article.author] || 0) + 1;
    });
    return counts;
  }, [articles]);

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
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };

  const handleAuthorChange = (authorName: string | null) => {
    setActiveAuthor(authorName);
    setCurrentPage(1);
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <Layout>
      <section ref={sectionRef} className="section-spacing">
        <div className="container-wide">
          <div className="mb-10">
            <h1 className="heading-lg mb-4">{t('page.title')}</h1>
            <p className="body-md max-w-2xl text-muted-foreground">{t('page.description')}</p>
          </div>

          {/* Type Filters */}
          <div className="mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 sm:flex-wrap sm:overflow-visible">
              {typeFilters.map((filter) => (
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

          {/* Author Filters */}
          <div className="mb-10">
            <p className="text-sm text-muted-foreground mb-3">Filter by author:</p>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 sm:flex-wrap sm:overflow-visible">
              <Button
                variant={activeAuthor === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleAuthorChange(null)}
                className={cn(
                  'whitespace-nowrap',
                  activeAuthor === null && 'bg-primary text-primary-foreground'
                )}
              >
                All Authors
              </Button>
              {authors.map((author) => (
                <Button
                  key={author.id}
                  variant={activeAuthor === author.display_name ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleAuthorChange(author.display_name)}
                  className={cn(
                    'whitespace-nowrap flex items-center gap-2',
                    activeAuthor === author.display_name && 'bg-primary text-primary-foreground'
                  )}
                >
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={author.avatar_url || undefined} alt={author.display_name} />
                    <AvatarFallback className="text-[10px]">
                      {getInitials(author.display_name)}
                    </AvatarFallback>
                  </Avatar>
                  {author.display_name}
                  <span className="text-xs opacity-70">({authorCounts[author.display_name] || 0})</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({
                length: ITEMS_PER_PAGE,
              }).map((_, i) => (
                <SkeletonCard key={i} lines={4} />
              ))}
            </div>
          ) : paginatedArticles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedArticles.map((article, index) => (
                  <AnalyticsCard key={article.slug} article={article} index={index} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground">{t('empty.noArticles')}</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
