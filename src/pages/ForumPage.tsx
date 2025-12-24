import { useEffect, useState, useMemo, useRef } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ForumTopic } from '@/lib/api/index';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { ForumFilters, SortOption, DateFilter } from '@/components/forum/ForumFilters';
import { MessageSquare, Users, Clock, MessageCircle, TrendingUp, Briefcase, ArrowUpRight, Plus, HelpCircle, Newspaper, Coins, AlertCircle, RefreshCw, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';
import { useForumCategories } from '@/hooks/useForumCategories';
import { useForumTopics } from '@/hooks/useForumTopics';
import { AssetBadge } from '@/components/forum/AssetBadge';
import { SEOHead } from '@/components/seo/SEOHead';
import { useTranslation } from '@/hooks/useTranslation';
import { getLocaleForLanguage } from '@/lib/i18n';
import { usePageBillCollection } from '@/hooks/usePageBillCollection';
import { useCollectibleBills } from '@/hooks/useCollectibleBills';

export default function ForumPage() {
  const {
    t,
    language
  } = useTranslation({
    namespace: 'forum'
  });
  const locale = getLocaleForLanguage(language);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    user
  } = useUser();

  // Filter states
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(searchParams.get('category') || undefined);
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Virtual scrolling state
  const [visibleCount, setVisibleCount] = useState(20);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Use React Query hooks
  const {
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError,
    refetch: refetchCategories
  } = useForumCategories();
  const {
    data: topics = [],
    isLoading: topicsLoading,
    error: topicsError,
    refetch: refetchTopics
  } = useForumTopics({
    categoryId: categoryFilter
  });
  const loading = categoriesLoading || topicsLoading;
  const error = categoriesError?.message || topicsError?.message || null;

  // Sync categoryFilter with URL params when they change
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category') || undefined;
    if (categoryFromUrl !== categoryFilter) {
      setCategoryFilter(categoryFromUrl);
    }
  }, [searchParams]);

  // Map category slugs to icons
  const categoryIcons: Record<string, typeof MessageSquare> = {
    general: MessageSquare,
    stocks: TrendingUp,
    crypto: Coins,
    etfs: Briefcase,
    beginners: HelpCircle,
    news: Newspaper,
    other: MoreHorizontal
  };

  // Filter and sort topics
  const filteredAndSortedTopics = useMemo(() => {
    let filtered = [...topics];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(topic => topic.title.toLowerCase().includes(query) || topic.author.toLowerCase().includes(query));
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      switch (dateFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      filtered = filtered.filter(topic => new Date(topic.date) >= filterDate);
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'most_active':
        filtered.sort((a, b) => b.replies - a.replies);
        break;
      case 'trending':
        // Combine replies and views for trending score
        filtered.sort((a, b) => b.replies * 2 + b.views - (a.replies * 2 + a.views));
        break;
      case 'most_liked':
        // Would need like_count from database
        filtered.sort((a, b) => b.replies - a.replies);
        break;
      case 'controversial':
        // Would need reaction data
        filtered.sort((a, b) => Math.abs(b.replies - a.replies));
        break;
    }
    return filtered;
  }, [topics, sortBy, dateFilter, searchQuery]);

  // Visible topics for infinite scroll
  const visibleTopics = useMemo(() => filteredAndSortedTopics.slice(0, visibleCount), [filteredAndSortedTopics, visibleCount]);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(20);
  }, [categoryFilter, sortBy, dateFilter, searchQuery]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && visibleCount < filteredAndSortedTopics.length) {
        setVisibleCount(prev => Math.min(prev + 15, filteredAndSortedTopics.length));
      }
    }, {
      threshold: 0.1
    });
    observerRef.current = observer;
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => observer.disconnect();
  }, [visibleCount, filteredAndSortedTopics.length]);

  // Update URL when category filter changes
  const handleCategoryChange = (category: string | undefined) => {
    setCategoryFilter(category);
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    navigate(`/forum?${params.toString()}`, {
      replace: true
    });
  };
  const handleClearFilters = () => {
    setCategoryFilter(undefined);
    setDateFilter('all');
    setSearchQuery('');
    setSortBy('newest');
    navigate('/forum', {
      replace: true
    });
  };
  return <Layout>
      <SEOHead title={t('pageTitle')} description={t('pageDescription')} />
      {/* Hero */}
      <section className="border-b border-border">
        <div className="container-wide py-16 md:py-24">
          <span className="badge-outline mb-4">{t('community')}</span>
          <h1 className="heading-lg mb-4">{t('forumTitle')}</h1>
          <p className="body-lg max-w-2xl">
            {t('forumDescription')}
          </p>
        </div>
      </section>

      {/* Categories */}
      

      {/* Filters and Sorting */}
      <section className="section-spacing-sm">
        <div className="container-wide">
          <div className="premium-card p-6 mb-6">
            <ForumFilters sortBy={sortBy} onSortChange={setSortBy} categoryFilter={categoryFilter} onCategoryChange={handleCategoryChange} dateFilter={dateFilter} onDateFilterChange={setDateFilter} searchQuery={searchQuery} onSearchChange={setSearchQuery} onClearFilters={handleClearFilters} categories={categories} />
          </div>
        </div>
      </section>

      {/* Topics List */}
      <section className="section-spacing-sm bg-secondary/30">
        <div className="container-wide">
          <div className="flex items-center justify-between mb-8">
            <h2 className="heading-sm">
              {categoryFilter ? categories.find(c => c.id === categoryFilter)?.name || t('discussions') : t('allDiscussions')}
            </h2>
            {user && <Link to="/forum/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  {t('newDiscussion')}
                </Button>
              </Link>}
          </div>
          {loading ? <div className="space-y-4">
              {Array.from({
            length: 5
          }).map((_, i) => <SkeletonCard key={i} lines={2} />)}
            </div> : filteredAndSortedTopics.length === 0 ? <div className="premium-card p-12 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">{t('noDiscussionsFound')}</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery || categoryFilter || dateFilter !== 'all' ? t('tryAdjustingFilters') : t('beFirstToStart')}
              </p>
              {user && <Link to="/forum/new">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    {t('startDiscussion')}
                  </Button>
                </Link>}
            </div> : <>
              <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
                {visibleTopics.map((topic, index) => <Link key={topic.id} to={`/forum/${topic.id}`} className={cn('flex items-center gap-4 p-4 md:p-6 hover:bg-secondary/50 transition-colors', index !== visibleTopics.length - 1 && 'border-b border-border/60')}>
                    {/* Author avatar */}
                    <div className="flex-shrink-0">
                      <img src={topic.authorAvatar} alt={topic.author} className="w-12 h-12 rounded-full bg-muted ring-2 ring-background" loading="lazy" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-base md:text-lg truncate hover:text-primary transition-colors">
                        {topic.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs text-muted-foreground mt-1.5">
                        <span className="font-medium text-foreground/80">{topic.author}</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="hidden sm:inline">
                          {t('lastActivity')} ·{' '}
                          {new Date(topic.lastActivity).toLocaleString(getLocaleForLanguage(language), {
                      month: 'short',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                        </span>
                        <span className="badge-secondary text-[10px] px-2 py-0.5">
                          {categories.find(c => c.id === topic.categoryId)?.name || topic.categoryId}
                        </span>
                        {topic.symbol && <AssetBadge symbol={topic.symbol} assetType={topic.asset_type} />}
                      </div>
                      {/* Mobile replies hint */}
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1 sm:hidden">
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span className="tabular-nums">{topic.replies}</span>
                        <span>{t('replies').toLowerCase()}</span>
                      </div>
                    </div>
                    
                    <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground flex-shrink-0">
                      <div className="flex items-center gap-1.5 min-w-[60px]">
                        <MessageCircle className="h-4 w-4" />
                        <span className="tabular-nums">{topic.replies}</span>
                      </div>
                      <div className="flex items-center gap-1.5 min-w-[140px] text-xs">
                        <Clock className="h-3.5 w-3.5" />
                        {new Date(topic.lastActivity).toLocaleString(getLocaleForLanguage(language), {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                      </div>
                    </div>
                  </Link>)}
              </div>
              
              {/* Load more trigger */}
              {visibleCount < filteredAndSortedTopics.length && <div ref={loadMoreRef} className="flex justify-center py-6">
                  <div className="text-sm text-muted-foreground">
                    {t('loadingMore')}
                  </div>
                </div>}
              
              <div className="text-center py-4 text-xs text-muted-foreground">
                {t('showing')} {visibleTopics.length} {t('of')} {filteredAndSortedTopics.length} {t('discussionsCount')}
              </div>
            </>}
        </div>
      </section>
    </Layout>;
}