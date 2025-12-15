import { useEffect, useState, useRef } from 'react';
import { Layout } from '@/components/layout/Layout';
import { AnalyticsCard } from '@/components/AnalyticsCard';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { Pagination } from '@/components/Pagination';
import { fetchAnalytics, AnalyticsArticle } from '@/lib/api/index';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
const ITEMS_PER_PAGE = 15;
const typeFilters = [{
  value: 'all',
  label: 'All'
}, {
  value: 'expert',
  label: 'Expert Opinion'
}, {
  value: 'markets',
  label: 'Markets'
}, {
  value: 'longterm',
  label: 'Long-term Analysis'
}, {
  value: 'technical',
  label: 'Technical Analysis'
}];
export default function AnalyticsPage() {
  const [articles, setArticles] = useState<AnalyticsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    async function loadAnalytics() {
      setLoading(true);
      const data = await fetchAnalytics(activeFilter);
      setArticles(data);
      setLoading(false);
    }
    loadAnalytics();
  }, [activeFilter]);
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setCurrentPage(1);
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
            <h1 className="heading-lg mb-4">Analytics</h1>
            <p className="body-md max-w-2xl text-muted-foreground">
              In-depth market analysis and expert forecasts from leading analysts
            </p>
            
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {typeFilters.map(filter => <Button key={filter.value} variant={activeFilter === filter.value ? 'default' : 'outline'} size="sm" onClick={() => handleFilterChange(filter.value)} className={cn(activeFilter === filter.value && 'bg-primary text-primary-foreground')}>
                {filter.label}
              </Button>)}
          </div>

          {/* Articles Grid */}
          {loading ? <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({
            length: ITEMS_PER_PAGE
          }).map((_, i) => <SkeletonCard key={i} lines={4} />)}
            </div> : paginatedArticles.length > 0 ? <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedArticles.map((article, index) => <AnalyticsCard key={article.slug} article={article} index={index} />)}
              </div>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </> : <div className="text-center py-20">
              <p className="text-muted-foreground">No articles found</p>
            </div>}
        </div>
      </section>
    </Layout>;
}