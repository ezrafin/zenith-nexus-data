import { useState, useRef, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { NewsCardReal } from '@/components/NewsCardReal';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/Pagination';
import { useNews } from '@/hooks/useNews';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { logger } from '@/lib/logger';
import { useTranslation } from '@/hooks/useTranslation';
import { getLocaleForLanguage } from '@/lib/i18n';
import { usePageBillCollection } from '@/hooks/usePageBillCollection';
import { SEOHead } from '@/components/seo/SEOHead';

const ITEMS_PER_PAGE = 15;
const MAX_PAGES = 25; // Maximum number of pages to show
export default function NewsPage() {
  // Bill collection: news_page_visit
  const { CoinComponent } = usePageBillCollection({ billId: 'news_page_visit' });
  const { t, language } = useTranslation({ namespace: 'ui' });
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Use server-side pagination
  const {
    news,
    loading,
    error,
    lastUpdated,
    totalCount,
    refetch
  } = useNews({ market: activeFilter, page: currentPage, pageSize: ITEMS_PER_PAGE });
  
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFetchingHistorical, setIsFetchingHistorical] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const marketFilters = useMemo(
    () => [
      { value: 'all', label: t('newsPage.filterAll') },
      { value: 'indices', label: t('newsPage.filterIndices') },
      { value: 'stocks', label: t('newsPage.filterStocks') },
      { value: 'crypto', label: t('newsPage.filterCrypto') },
      { value: 'commodities', label: t('newsPage.filterCommodities') },
      { value: 'political', label: t('newsPage.filterPolitical') },
    ],
    [t]
  );
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };
  const handlePageChange = (page: number) => {
    // Limit page to maximum allowed pages
    const maxAllowedPage = Math.min(MAX_PAGES, Math.ceil(totalCount / ITEMS_PER_PAGE));
    const validPage = Math.min(page, maxAllowedPage);
    setCurrentPage(validPage);
    // Scroll to top of section when page changes
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };

  const handleFetchHistorical = async () => {
    setIsFetchingHistorical(true);
    toast.info(t('newsPage.historicalFetchStarting'));
    try {
      // Fetch 14 months of data in batches (2 months at a time to avoid timeouts)
      const now = new Date();
      let totalInserted = 0;
      for (let i = 0; i < 7; i++) {
        const toDate = new Date(now);
        toDate.setMonth(toDate.getMonth() - i * 2);
        const fromDate = new Date(toDate);
        fromDate.setMonth(fromDate.getMonth() - 2);
        const {
          data,
          error
        } = await supabase.functions.invoke('fetch-guardian-news', {
          body: {
            fromDate: fromDate.toISOString().split('T')[0],
            toDate: toDate.toISOString().split('T')[0],
            maxPages: 10
          }
        });
        if (error) {
          logger.error('Batch error:', error);
          toast.error(
            t('newsPage.historicalBatchError')
              .replace('{{batch}}', String(i + 1))
              .replace('{{message}}', error.message)
          );
        } else if (data) {
          totalInserted += data.totalInserted || 0;
          toast.success(
            t('newsPage.historicalBatchSuccess')
              .replace('{{batch}}', String(i + 1))
              .replace('{{count}}', String(data.totalInserted))
          );
        }

        // Small delay between batches
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      toast.success(
        t('newsPage.historicalComplete').replace('{{total}}', String(totalInserted))
      );
      refetch();
    } catch (error) {
      logger.error('Historical fetch error:', error);
      toast.error(t('newsPage.historicalFailed'));
    } finally {
      setIsFetchingHistorical(false);
    }
  };
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };
  const formatLastUpdated = (dateStr: string | null) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    if (diffMinutes < 1) return t('time.justNow');
    if (diffMinutes < 60)
      return t('time.minutesAgo').replace('{{count}}', String(diffMinutes));
    if (diffMinutes < 1440)
      return t('time.hoursAgo').replace('{{count}}', String(Math.floor(diffMinutes / 60)));

    const locale = getLocaleForLanguage(language);
    return date.toLocaleDateString(locale, {
      month: 'short',
      day: 'numeric'
    });
  };

  // Server-side pagination - totalCount from database, limited to 25 pages
  const totalPages = Math.min(MAX_PAGES, Math.ceil(totalCount / ITEMS_PER_PAGE));
  // No need to slice - already paginated from server
  const paginatedNews = news;
  return <Layout>
      <SEOHead
        title="Financial News & Market Updates"
        description="Stay informed with the latest financial news, market updates, and economic insights. Get real-time news covering stocks, indices, crypto, commodities, and political events affecting global markets."
        keywords="financial news, market news, stock market news, crypto news, economic news, market updates, financial market analysis, investment news, trading news, market insights"
        isNewsPage={true}
      />
      <section ref={sectionRef} className="section-spacing">
        <div className="container-wide">
          <div className="mb-10">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
              <div>
                <h1 className="heading-lg mb-2">{t('newsPage.title')}</h1>
                <p className="body-md text-muted-foreground max-w-2xl">
                  {t('newsPage.description')}
                </p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-10">
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 sm:flex-wrap sm:overflow-visible">
              {marketFilters.map(filter => (
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

          {/* Error State */}
          {error && <div className="text-center py-10 text-destructive">
              <p>{error}</p>
              <Button variant="outline" onClick={handleRefresh} className="mt-4">
                {t('messages.error')}
              </Button>
            </div>}

          {/* News Grid */}
          {loading ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({
            length: ITEMS_PER_PAGE
          }).map((_, i) => <SkeletonCard key={i} lines={3} />)}
            </div> : paginatedNews.length > 0 ? <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedNews.map((item, index) => <NewsCardReal key={item.id} article={item} featured={index === 0 && currentPage === 1} index={index} />)}
              </div>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </> : <div className="text-center py-20">
              <p className="text-muted-foreground">{t('newsPage.noNews')}</p>
            </div>}
        </div>
      </section>
      {CoinComponent && <CoinComponent />}
    </Layout>;
}