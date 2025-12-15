import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { fetchForumCategories, fetchForumTopics, ForumCategory, ForumTopic } from '@/lib/api';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { ForumFilters, SortOption, DateFilter } from '@/components/forum/ForumFilters';
import { MessageSquare, Users, Clock, MessageCircle, TrendingUp, Briefcase, ArrowUpRight, Plus, HelpCircle, Newspaper, Coins, AlertCircle, RefreshCw, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';

export default function ForumPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [topics, setTopics] = useState<ForumTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(
    searchParams.get('category') || undefined
  );
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Virtual scrolling state
  const [visibleCount, setVisibleCount] = useState(20);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [categoriesData, topicsData] = await Promise.all([
        fetchForumCategories(),
        fetchForumTopics(categoryFilter),
      ]);
      setCategories(categoriesData);
      setTopics(topicsData);
    } catch (err) {
      console.error('Error loading forum data:', err);
      setError('Failed to load forum data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [categoryFilter]);

  // Sync categoryFilter with URL params when they change
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category') || undefined;
    if (categoryFromUrl !== categoryFilter) {
      setCategoryFilter(categoryFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Map category slugs to icons
  const categoryIcons: Record<string, typeof MessageSquare> = {
    general: MessageSquare,
    stocks: TrendingUp,
    crypto: Coins,
    etfs: Briefcase,
    beginners: HelpCircle,
    news: Newspaper,
    other: MoreHorizontal,
  };

  // Filter and sort topics
  const filteredAndSortedTopics = useMemo(() => {
    let filtered = [...topics];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (topic) =>
          topic.title.toLowerCase().includes(query) ||
          topic.author.toLowerCase().includes(query)
      );
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
      
      filtered = filtered.filter((topic) => new Date(topic.date) >= filterDate);
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
        filtered.sort((a, b) => (b.replies * 2 + b.views) - (a.replies * 2 + a.views));
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
  const visibleTopics = useMemo(() => 
    filteredAndSortedTopics.slice(0, visibleCount),
    [filteredAndSortedTopics, visibleCount]
  );

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(20);
  }, [categoryFilter, sortBy, dateFilter, searchQuery]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredAndSortedTopics.length) {
          setVisibleCount((prev) => Math.min(prev + 15, filteredAndSortedTopics.length));
        }
      },
      { threshold: 0.1 }
    );
    
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
    navigate(`/forum?${params.toString()}`, { replace: true });
  };

  const handleClearFilters = () => {
    setCategoryFilter(undefined);
    setDateFilter('all');
    setSearchQuery('');
    setSortBy('newest');
    navigate('/forum', { replace: true });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="container-wide py-16 md:py-24">
          <span className="badge-outline mb-4">Community</span>
          <h1 className="heading-lg mb-4">Forum</h1>
          <p className="body-lg max-w-2xl">
            Discuss investment strategies, share experiences, and analyze markets with the community
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="section-spacing-sm">
        <div className="container-wide">
          <h2 className="heading-sm mb-8">Categories</h2>
          {error ? (
            <div className="premium-card p-12 text-center">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Error loading categories</h3>
              <p className="text-muted-foreground mb-6">{error}</p>
              <Button onClick={loadData} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </div>
          ) : loading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={i} lines={3} />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {categories.map((category, index) => {
                const Icon = categoryIcons[category.id] || MessageSquare;
                return (
                  <Link
                    key={category.id}
                    to={`/forum?category=${category.id}`}
                    className="group p-6 md:p-8 rounded-xl border border-border/60 bg-card hover:border-border hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-heading font-medium text-lg group-hover:text-primary transition-colors">
                            {category.name}
                          </h3>
                          <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {category.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <MessageCircle className="h-3.5 w-3.5" />
                            {category.topicCount.toLocaleString()} topics
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Users className="h-3.5 w-3.5" />
                            {category.postCount.toLocaleString()} posts
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Filters and Sorting */}
      <section className="section-spacing-sm">
        <div className="container-wide">
          <div className="premium-card p-6 mb-6">
            <ForumFilters
              sortBy={sortBy}
              onSortChange={setSortBy}
              categoryFilter={categoryFilter}
              onCategoryChange={handleCategoryChange}
              dateFilter={dateFilter}
              onDateFilterChange={setDateFilter}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onClearFilters={handleClearFilters}
              categories={categories}
            />
          </div>
        </div>
      </section>

      {/* Topics List */}
      <section className="section-spacing-sm bg-secondary/30">
        <div className="container-wide">
          <div className="flex items-center justify-between mb-8">
            <h2 className="heading-sm">
              {categoryFilter 
                ? categories.find(c => c.id === categoryFilter)?.name || 'Discussions'
                : 'All Discussions'}
            </h2>
            {user && (
              <Link to="/forum/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Discussion
                </Button>
              </Link>
            )}
          </div>
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonCard key={i} lines={2} />
              ))}
            </div>
          ) : filteredAndSortedTopics.length === 0 ? (
            <div className="premium-card p-12 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">No discussions found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery || categoryFilter || dateFilter !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Be the first to start a discussion'}
              </p>
              {user && (
                <Link to="/forum/new">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Start Discussion
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <>
              <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
                {visibleTopics.map((topic, index) => (
                  <Link
                    key={topic.id}
                    to={`/forum/${topic.id}`}
                    className={cn(
                      'flex items-center gap-4 p-4 md:p-6 hover:bg-secondary/50 transition-colors',
                      index !== visibleTopics.length - 1 && 'border-b border-border/60'
                    )}
                  >
                    {/* Avatar with level indicator */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={topic.authorAvatar}
                        alt={topic.author}
                        className="w-12 h-12 rounded-full bg-muted ring-2 ring-background"
                        loading="lazy"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center ring-2 ring-background">
                        {Math.floor(Math.random() * 10) + 1}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-base md:text-lg truncate hover:text-primary transition-colors">
                        {topic.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs text-muted-foreground mt-1.5">
                        <span className="font-medium text-foreground/80">{topic.author}</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="hidden sm:inline">{new Date(topic.date).toLocaleString('sv-SE', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>
                        <span className="badge-secondary text-[10px] px-2 py-0.5">
                          {categories.find(c => c.id === topic.categoryId)?.name || topic.categoryId}
                        </span>
                      </div>
                    </div>
                    
                    <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground flex-shrink-0">
                      <div className="flex items-center gap-1.5 min-w-[60px]">
                        <MessageCircle className="h-4 w-4" />
                        <span className="tabular-nums">{topic.replies}</span>
                      </div>
                      <div className="flex items-center gap-1.5 min-w-[140px] text-xs">
                        <Clock className="h-3.5 w-3.5" />
                        {new Date(topic.lastActivity).toLocaleString('sv-SE', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              {/* Load more trigger */}
              {visibleCount < filteredAndSortedTopics.length && (
                <div ref={loadMoreRef} className="flex justify-center py-6">
                  <div className="text-sm text-muted-foreground">
                    Loading more discussions...
                  </div>
                </div>
              )}
              
              <div className="text-center py-4 text-xs text-muted-foreground">
                Showing {visibleTopics.length} of {filteredAndSortedTopics.length} discussions
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}