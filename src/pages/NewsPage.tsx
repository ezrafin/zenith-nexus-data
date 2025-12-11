import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { NewsCardReal } from '@/components/NewsCardReal';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/Pagination';
import { useNews } from '@/hooks/useNews';
import { RefreshCw, Clock, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const ITEMS_PER_PAGE = 15;

const marketFilters = [
  { value: 'all', label: 'All' },
  { value: 'indices', label: 'Indices' },
  { value: 'stocks', label: 'Stocks' },
  { value: 'crypto', label: 'Crypto' },
  { value: 'commodities', label: 'Commodities' },
  { value: 'political', label: 'Political' },
];

export default function NewsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const { news, loading, error, lastUpdated, refetch } = useNews(activeFilter);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [isFetchingHistorical, setIsFetchingHistorical] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const handleFetchHistorical = async () => {
    setIsFetchingHistorical(true);
    toast.info('Starting historical news fetch... This may take a few minutes.');
    
    try {
      // Fetch 14 months of data in batches (2 months at a time to avoid timeouts)
      const now = new Date();
      let totalInserted = 0;
      
      for (let i = 0; i < 7; i++) {
        const toDate = new Date(now);
        toDate.setMonth(toDate.getMonth() - (i * 2));
        
        const fromDate = new Date(toDate);
        fromDate.setMonth(fromDate.getMonth() - 2);
        
        const { data, error } = await supabase.functions.invoke('fetch-guardian-news', {
          body: {
            fromDate: fromDate.toISOString().split('T')[0],
            toDate: toDate.toISOString().split('T')[0],
            maxPages: 10,
          },
        });
        
        if (error) {
          console.error('Batch error:', error);
          toast.error(`Error fetching batch ${i + 1}: ${error.message}`);
        } else if (data) {
          totalInserted += data.totalInserted || 0;
          toast.success(`Batch ${i + 1}/7: Added ${data.totalInserted} articles`);
        }
        
        // Small delay between batches
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      toast.success(`Historical fetch complete! Added ${totalInserted} total articles.`);
      refetch();
    } catch (error) {
      console.error('Historical fetch error:', error);
      toast.error('Failed to fetch historical news');
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
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)} hours ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Pagination
  const totalPages = Math.ceil(news.length / ITEMS_PER_PAGE);
  const paginatedNews = news.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Layout>
      <section className="section-spacing">
        <div className="container-wide">
          <div className="mb-10">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
              <div>
                <h1 className="heading-lg mb-2">News</h1>
                <p className="body-md text-muted-foreground max-w-2xl">
                  Latest financial and political news from around the world
                </p>
              </div>
              <div className="flex items-center gap-3">
                {lastUpdated && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Updated {formatLastUpdated(lastUpdated)}
                  </span>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleFetchHistorical}
                  disabled={loading || isFetchingHistorical}
                  className="gap-2"
                >
                  <Download className={cn("h-4 w-4", isFetchingHistorical && "animate-pulse")} />
                  {isFetchingHistorical ? 'Fetching...' : 'Load Historical'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={loading || isRefreshing}
                  className="gap-2"
                >
                  <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
                  Refresh
                </Button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {marketFilters.map((filter) => (
              <Button
                key={filter.value}
                variant={activeFilter === filter.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilterChange(filter.value)}
                className={cn(
                  activeFilter === filter.value && 'bg-primary text-primary-foreground'
                )}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Error State */}
          {error && (
            <div className="text-center py-10 text-destructive">
              <p>{error}</p>
              <Button variant="outline" onClick={handleRefresh} className="mt-4">
                Try Again
              </Button>
            </div>
          )}

          {/* News Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                <SkeletonCard key={i} lines={3} />
              ))}
            </div>
          ) : paginatedNews.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedNews.map((item, index) => (
                  <NewsCardReal 
                    key={item.id} 
                    article={item} 
                    featured={index === 0 && currentPage === 1}
                    index={index}
                  />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No news found</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
