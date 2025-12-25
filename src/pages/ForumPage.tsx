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
import { CategoryGrid } from '@/components/forum/CategoryGrid';
import { TopicCard } from '@/components/forum/TopicCard';
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

    // Sort - pinned topics always first
    const pinnedTopics = filtered.filter(t => t.is_pinned);
    const unpinnedTopics = filtered.filter(t => !t.is_pinned);

    switch (sortBy) {
      case 'newest':
        unpinnedTopics.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'oldest':
        unpinnedTopics.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'most_active':
        unpinnedTopics.sort((a, b) => b.replies - a.replies);
        break;
      case 'trending':
        // Combine replies and views for trending score
        unpinnedTopics.sort((a, b) => b.replies * 2 + b.views - (a.replies * 2 + a.views));
        break;
      case 'most_liked':
        unpinnedTopics.sort((a, b) => (b.like_count || 0) - (a.like_count || 0));
        break;
      case 'controversial':
        // Would need reaction data
        unpinnedTopics.sort((a, b) => Math.abs(b.replies - a.replies));
        break;
    }

    // Sort pinned topics by date (newest first)
    pinnedTopics.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return [...pinnedTopics, ...unpinnedTopics];
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
      {categories.length > 0 && (
        <section className="section-spacing-sm border-b border-border">
          <div className="container-wide">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-sm">{t('categories') || 'Categories'}</h2>
              {categoryFilter && (
                <button
                  onClick={() => handleCategoryChange(undefined)}
                  className="text-sm text-primary hover:underline touch-target"
                >
                  {t('clearFilter') || 'Clear filter'}
                </button>
              )}
            </div>
            <CategoryGrid
              categories={categories}
              selectedCategoryId={categoryFilter}
              onCategoryClick={handleCategoryChange}
            />
          </div>
        </section>
      )}

      {/* Trending Topics - Show when no category filter and sort is not trending */}
      {!categoryFilter && sortBy !== 'trending' && filteredAndSortedTopics.length > 0 && (
        <section className="section-spacing-sm border-b border-border bg-secondary/20">
          <div className="container-wide">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-sm">{t('trendingTopics') || 'Trending Discussions'}</h2>
              <button
                onClick={() => setSortBy('trending')}
                className="text-sm text-primary hover:underline touch-target"
              >
                View all trending →
              </button>
            </div>
            <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
              {filteredAndSortedTopics
                .filter(topic => (topic.replies * 2 + topic.views) > 30 || topic.is_featured)
                .slice(0, 3)
                .map((topic, index) => (
                  <TopicCard
                    key={topic.id}
                    topic={topic}
                    categoryName={categories.find(c => c.id === topic.categoryId)?.name}
                    index={index}
                    language={language}
                    showExcerpt={false}
                  />
                ))}
            </div>
          </div>
        </section>
      )}

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
            </div> : filteredAndSortedTopics.length === 0 ? (
              <div className="premium-card p-12 md:p-16 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="font-semibold text-xl mb-3">{t('noDiscussionsFound')}</h3>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    {searchQuery || categoryFilter || dateFilter !== 'all' 
                      ? t('tryAdjustingFilters') || 'Try adjusting your filters to see more discussions.'
                      : t('beFirstToStart') || 'Be the first to start a discussion in this category!'}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    {(searchQuery || categoryFilter || dateFilter !== 'all') && (
                      <Button variant="outline" onClick={handleClearFilters}>
                        Clear Filters
                      </Button>
                    )}
                    {user && (
                      <Link to="/forum/new">
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          {t('startDiscussion') || 'Start Discussion'}
                        </Button>
                      </Link>
                    )}
                    {!user && (
                      <Link to="/auth/login">
                        <Button variant="outline">
                          Sign in to start a discussion
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ) : <>
              <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
                {visibleTopics.map((topic, index) => (
                  <TopicCard
                    key={topic.id}
                    topic={topic}
                    categoryName={categories.find(c => c.id === topic.categoryId)?.name}
                    index={index}
                    language={language}
                    showExcerpt={true}
                  />
                ))}
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