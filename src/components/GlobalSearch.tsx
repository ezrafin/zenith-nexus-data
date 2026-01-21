import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Building2, Newspaper, MessageSquare, X, FileText, Filter, TrendingUp, User } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { organizations } from '@/lib/organizations';
import { supabase } from '@/integrations/supabase/client';
import type { MarketData } from '@/lib/api/types';
import { useCollectibleBills } from '@/hooks/useCollectibleBills';
import { motion, AnimatePresence } from 'framer-motion';
import { getMotionVariant, transitions, STAGGER, prefersReducedMotion } from '@/lib/animations';
import { useTranslation } from '@/hooks/useTranslation';
import { logger } from '@/lib/logger';

interface SearchResult {
  type: 'company' | 'news' | 'forum' | 'analytics' | 'ticker' | 'author';
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  symbol?: string;
  marketType?: string;
  authorId?: string;
  logo?: string;
}

export function GlobalSearch() {
  const { t } = useTranslation({ namespace: 'ui' });
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [contentType, setContentType] = useState<'all' | 'company' | 'news' | 'forum' | 'analytics' | 'ticker' | 'author'>('all');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week' | 'month' | 'year'>('all');
  const navigate = useNavigate();
  const { collectBill, isCollected } = useCollectibleBills();
  const hasCollectedSearchBill = useRef(false);

  // Keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const searchAll = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const searchLower = searchQuery.toLowerCase();
    const allResults: SearchResult[] = [];

    // Helper function to calculate date filter (avoid duplication)
    const getDateFilter = (): string | null => {
      if (dateFilter === 'all') return null;
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
      return filterDate.toISOString();
    };

    const dateFilterValue = getDateFilter();

    // Execute all searches in parallel using Promise.all
    const searchPromises: Promise<void>[] = [];

    // Search companies (local) - FAST, no async needed, expanded search
    // Show results immediately for better UX
    if (contentType === 'all' || contentType === 'company') {
      const companyResults = organizations
        .filter(org => 
          org.name.toLowerCase().includes(searchLower) ||
          org.description.toLowerCase().includes(searchLower) ||
          org.headquarters.toLowerCase().includes(searchLower)
        )
        .slice(0, 5)
        .map(org => ({
          type: 'company' as const,
          id: org.id,
          title: org.name,
          subtitle: org.type.replace('_', ' '),
          logo: org.logo,
        }));
      allResults.push(...companyResults);
      
      // Show company results immediately (don't wait for other searches)
      if (companyResults.length > 0) {
        setResults([...companyResults]);
      }
    }

    // Search news articles (database) - parallel
    if (contentType === 'all' || contentType === 'news') {
      searchPromises.push(
        (async () => {
          try {
            let newsQuery = supabase
              .from('news_articles')
              .select('id, title, source_name, published_at')
              .ilike('title', `%${searchQuery}%`);

            if (dateFilterValue) {
              newsQuery = newsQuery.gte('published_at', dateFilterValue);
            }

            const { data: newsData } = await newsQuery
              .order('published_at', { ascending: false })
              .limit(5);
            
            if (newsData) {
              allResults.push(...newsData.map(article => ({
                type: 'news' as const,
                id: article.id,
                title: article.title,
                subtitle: article.source_name,
                date: article.published_at,
              })));
            }
          } catch (error) {
            logger.error('News search error:', error);
          }
        })()
      );
    }

    // Search forum discussions (database) - parallel
    if (contentType === 'all' || contentType === 'forum') {
      searchPromises.push(
        (async () => {
          try {
            let forumQuery = supabase
              .from('forum_discussions')
              .select('id, title, category, created_at')
              .ilike('title', `%${searchQuery}%`);

            if (dateFilterValue) {
              forumQuery = forumQuery.gte('created_at', dateFilterValue);
            }

            const { data: forumData } = await forumQuery
              .order('created_at', { ascending: false })
              .limit(5);
            
            if (forumData) {
              allResults.push(...forumData.map(discussion => ({
                type: 'forum' as const,
                id: discussion.id,
                title: discussion.title,
                subtitle: discussion.category,
                date: discussion.created_at,
              })));
            }
          } catch (error) {
            logger.error('Forum search error:', error);
          }
        })()
      );
    }

    // Search tickers (market symbols) - OPTIMIZED: use cache first, only search if >= 2 chars
    if ((contentType === 'all' || contentType === 'ticker') && searchQuery.trim().length >= 2) {
      searchPromises.push(
        (async () => {
          try {
            const queryUpper = searchQuery.toUpperCase().trim();
            const marketTypes: Array<'stocks' | 'crypto' | 'indices' | 'commodities' | 'currencies'> = 
              ['stocks', 'crypto', 'indices', 'commodities', 'currencies'];
            
            const tickerResults: SearchResult[] = [];
            
            // Try to use cached data first (much faster than API calls)
            for (const marketType of marketTypes) {
              try {
                const cacheKey = `market_data_cache_${marketType}`;
                const cached = localStorage.getItem(cacheKey);
                
                if (cached) {
                  try {
                    const parsed = JSON.parse(cached);
                    // Check if cache is fresh (less than 5 minutes old)
                    const cacheAge = Date.now() - (parsed.cachedAt || 0);
                    if (parsed.data && Array.isArray(parsed.data) && cacheAge < 5 * 60 * 1000) {
                      const filtered = parsed.data
                        .filter((item: MarketData) => 
                          item.symbol.toUpperCase().includes(queryUpper) ||
                          item.name.toUpperCase().includes(queryUpper)
                        )
                        .slice(0, 3)
                        .map((item: MarketData) => ({
                          type: 'ticker' as const,
                          id: `${marketType}-${item.symbol}`,
                          title: item.symbol,
                          subtitle: item.name,
                          symbol: item.symbol,
                          marketType: marketType,
                        }));
                      tickerResults.push(...filtered);
                      continue; // Used cache, skip API call
                    }
                  } catch (parseError) {
                    // Cache parse error, fall through to API call
                    logger.warn(`Cache parse error for ${marketType}:`, parseError);
                  }
                }
                
                // Cache miss or stale - make API call only if needed
                // Only fetch if query is 3+ chars (more specific searches)
                if (searchQuery.trim().length >= 3) {
                  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
                  const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
                  
                  if (!supabaseUrl || !supabaseKey) continue;

                  const response = await fetch(
                    `${supabaseUrl}/functions/v1/fetch-stocks?type=${marketType}`,
                    {
                      headers: {
                        'Authorization': `Bearer ${supabaseKey}`,
                        'Content-Type': 'application/json',
                      },
                    }
                  );
                  
                  if (!response.ok) continue;

                  const result = await response.json();
                  if (!result?.data) continue;

                  const filtered = result.data
                    .filter((item: MarketData) => 
                      item.symbol.toUpperCase().includes(queryUpper) ||
                      item.name.toUpperCase().includes(queryUpper)
                    )
                    .slice(0, 3)
                    .map((item: MarketData) => ({
                      type: 'ticker' as const,
                      id: `${marketType}-${item.symbol}`,
                      title: item.symbol,
                      subtitle: item.name,
                      symbol: item.symbol,
                      marketType: marketType,
                    }));
                  tickerResults.push(...filtered);
                }
              } catch (error) {
                logger.error(`Error searching ${marketType}:`, error);
              }
            }

            allResults.push(...tickerResults);
          } catch (error) {
            logger.error('Ticker search error:', error);
          }
        })()
      );
    }

    // Search authors (forum profiles) - parallel
    if (contentType === 'all' || contentType === 'author') {
      searchPromises.push(
        (async () => {
          try {
            const { data: profiles } = await supabase
              .from('profiles')
              .select('id, username, display_name, avatar_url')
              .or(`username.ilike.%${searchQuery}%,display_name.ilike.%${searchQuery}%`)
              .limit(5);
            
            if (profiles) {
              allResults.push(...profiles.map(profile => ({
                type: 'author' as const,
                id: profile.id,
                title: profile.display_name || profile.username || 'Unknown User',
                subtitle: `@${profile.username || 'unknown'}`,
                authorId: profile.id,
              })));
            }
          } catch (error) {
            logger.error('Author search error:', error);
          }
        })()
      );
    }

    // Wait for all searches to complete in parallel
    await Promise.all(searchPromises);

    setResults(allResults);
    setLoading(false);
    
    // Trigger bill collection for using global search (only once per session)
    if (searchQuery.trim().length >= 2 && !hasCollectedSearchBill.current && !isCollected('forum_search')) {
      hasCollectedSearchBill.current = true;
      collectBill('forum_search', {
        action: 'global_search',
        metadata: { query: searchQuery },
      });
    }
  }, [contentType, dateFilter, collectBill, isCollected]);

  // Debounce search - 200ms delay to reduce API calls (optimized for faster response)
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }
    
    setLoading(true); // Show loading state during debounce
    const timeoutId = setTimeout(() => {
      searchAll(query);
    }, 200); // Reduced from 300ms to 200ms for faster response
    return () => clearTimeout(timeoutId);
  }, [query, searchAll]);

  const handleSelect = (result: SearchResult) => {
    setOpen(false);
    setQuery('');
    
    switch (result.type) {
      case 'company':
        navigate(`/companies/${result.id}`);
        break;
      case 'news':
        navigate(`/news/${result.id}`);
        break;
      case 'forum':
        navigate(`/forum/${result.id}`);
        break;
      case 'analytics':
        navigate(`/analytics/${result.id}`);
        break;
      case 'ticker':
        if (result.symbol && result.marketType) {
          navigate(`/markets/${result.marketType}?symbol=${result.symbol}`);
        }
        break;
      case 'author':
        if (result.authorId) {
          navigate(`/users/${result.authorId}`);
        }
        break;
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'company':
        return <Building2 className="h-4 w-4 text-muted-foreground" />;
      case 'news':
        return <Newspaper className="h-4 w-4 text-muted-foreground" />;
      case 'forum':
        return <MessageSquare className="h-4 w-4 text-muted-foreground" />;
      case 'analytics':
        return <FileText className="h-4 w-4 text-muted-foreground" />;
      case 'ticker':
        return <TrendingUp className="h-4 w-4 text-muted-foreground" />;
      case 'author':
        return <User className="h-4 w-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const groupedResults = {
    company: results.filter(r => r.type === 'company'),
    news: results.filter(r => r.type === 'news'),
    forum: results.filter(r => r.type === 'forum'),
    analytics: results.filter(r => r.type === 'analytics'),
    ticker: results.filter(r => r.type === 'ticker'),
    author: results.filter(r => r.type === 'author'),
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground bg-secondary/50 border border-border/50 rounded-lg hover:bg-secondary hover:border-border transition-colors w-full lg:w-auto justify-center lg:justify-start min-h-[44px] touch-manipulation"
        aria-label={t('globalSearch.openAriaLabel', { defaultValue: 'Open global search (Cmd+K or Ctrl+K)' })}
        aria-haspopup="dialog"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline lg:hidden">{t('globalSearch.searchPlaceholder')}</span>
        <kbd className="hidden md:inline-flex lg:hidden h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent closeAriaLabel={t('globalSearch.closeAriaLabel')} 
          className="overflow-hidden p-0 shadow-lg max-w-2xl max-h-[90vh] sm:max-h-[80vh] flex flex-col relative [&>button]:hidden w-[calc(100vw-2rem)] sm:w-full"
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          aria-label={t('globalSearch.dialogAriaLabel', { defaultValue: 'Global search dialog' })}
          aria-describedby="search-description"
        >
          {/* Добавляем DialogTitle и DialogDescription для доступности */}
          <DialogTitle className="sr-only">{t('globalSearch.dialogTitle', { defaultValue: 'Global Search' })}</DialogTitle>
          <DialogDescription className="sr-only" id="search-description">
            {t('globalSearch.dialogDescription', { defaultValue: 'Search across companies, news articles, forum discussions, market tickers, and authors. Use filters to narrow results.' })}
          </DialogDescription>

          {/* Кастомная кнопка закрытия с правильным позиционированием */}
          <button
            onClick={() => setOpen(false)}
            className="absolute right-3 top-3 z-50 flex items-center justify-center rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none h-8 w-8"
            aria-label={t('globalSearch.closeAriaLabel', { defaultValue: 'Close search' })}
          >
            <X className="h-4 w-4" />
          </button>

          <Command 
            className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
            role="search"
          >
            <div className="flex items-center border-b px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" aria-hidden="true" />
              <input
                className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px] touch-manipulation"
                placeholder={t('globalSearch.placeholder')}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label={t('globalSearch.inputAriaLabel', { defaultValue: 'Search input' })}
                aria-describedby="search-description"
                autoFocus
              />
              {query && (
                <button 
                  onClick={() => setQuery('')} 
                  className="p-1 hover:bg-secondary rounded min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
                  aria-label={t('globalSearch.clearAriaLabel', { defaultValue: 'Clear search' })}
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
            
            {/* Filters */}
            <div className="border-b px-3 py-2 flex items-center gap-3 bg-secondary/30">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <div className="flex items-center gap-2 flex-1">
                <div className="flex items-center gap-2">
                  <Label htmlFor="content-type" className="text-xs">{t('globalSearch.typeLabel')}</Label>
                  <Select value={contentType} onValueChange={(value: typeof contentType) => setContentType(value)}>
                    <SelectTrigger id="content-type" className="h-8 text-xs w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('globalSearch.all')}</SelectItem>
                      <SelectItem value="company">{t('globalSearch.companies')}</SelectItem>
                      <SelectItem value="news">{t('globalSearch.news')}</SelectItem>
                      <SelectItem value="forum">{t('globalSearch.forum')}</SelectItem>
                      <SelectItem value="analytics">{t('globalSearch.analytics')}</SelectItem>
                      <SelectItem value="ticker">{t('globalSearch.tickers')}</SelectItem>
                      <SelectItem value="author">{t('globalSearch.authors')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="date-filter" className="text-xs">{t('globalSearch.dateLabel')}</Label>
                  <Select value={dateFilter} onValueChange={(value: typeof dateFilter) => setDateFilter(value)}>
                    <SelectTrigger id="date-filter" className="h-8 text-xs w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('globalSearch.allTime')}</SelectItem>
                      <SelectItem value="today">{t('globalSearch.today')}</SelectItem>
                      <SelectItem value="week">{t('globalSearch.thisWeek')}</SelectItem>
                      <SelectItem value="month">{t('globalSearch.thisMonth')}</SelectItem>
                      <SelectItem value="year">{t('globalSearch.thisYear')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <CommandList className="flex-1 overflow-y-auto p-2 max-h-[400px]">
              {loading && (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  {t('globalSearch.searching')}
                </div>
              )}
              
              {!loading && query && results.length === 0 && (
                <CommandEmpty>{t('globalSearch.noResults')}</CommandEmpty>
              )}

              {!loading && groupedResults.company.length > 0 && (
                <CommandGroup heading={t('globalSearch.companies')}>
                  <AnimatePresence>
                    {groupedResults.company.map((result, index) => {
                      // Находим полную информацию об организации для получения логотипа
                      const org = organizations.find(o => o.id === result.id);
                      return (
                        <motion.div
                          key={`company-${result.id}`}
                          initial={prefersReducedMotion() ? {} : { opacity: 0, y: 10 }}
                          animate={prefersReducedMotion() ? {} : { opacity: 1, y: 0 }}
                          exit={prefersReducedMotion() ? {} : { opacity: 0, y: -10 }}
                          transition={{
                            ...transitions.fast,
                            delay: prefersReducedMotion() ? 0 : (index * STAGGER.fast) / 1000,
                          }}
                        >
                          <CommandItem
                            onSelect={() => handleSelect(result)}
                            className="flex items-center gap-3 cursor-pointer"
                          >
                            {/* Логотип компании */}
                            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center overflow-hidden flex-shrink-0">
                              {org?.logo ? (
                                <img 
                                  src={org.logo} 
                                  alt={`${result.title} logo`}
                                  className="w-6 h-6 object-contain"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                  }}
                                />
                              ) : null}
                              <Building2 className={`h-4 w-4 text-muted-foreground ${org?.logo ? 'hidden' : ''}`} />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium">{result.title}</span>
                              {result.subtitle && (
                                <span className="text-xs text-muted-foreground capitalize">{result.subtitle}</span>
                              )}
                            </div>
                          </CommandItem>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </CommandGroup>
              )}

              {!loading && groupedResults.news.length > 0 && (
                <CommandGroup heading={t('globalSearch.news')}>
                  <AnimatePresence>
                    {groupedResults.news.map((result, index) => (
                      <motion.div
                        key={`news-${result.id}`}
                        initial={prefersReducedMotion() ? {} : { opacity: 0, y: 10 }}
                        animate={prefersReducedMotion() ? {} : { opacity: 1, y: 0 }}
                        exit={prefersReducedMotion() ? {} : { opacity: 0, y: -10 }}
                        transition={{
                          ...transitions.fast,
                          delay: prefersReducedMotion() ? 0 : (index * STAGGER.fast) / 1000,
                        }}
                      >
                        <CommandItem
                          onSelect={() => handleSelect(result)}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          {getIcon(result.type)}
                          <div className="flex flex-col">
                            <span className="font-medium line-clamp-1">{result.title}</span>
                            {result.subtitle && (
                              <span className="text-xs text-muted-foreground">{result.subtitle}</span>
                            )}
                          </div>
                        </CommandItem>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </CommandGroup>
              )}

              {!loading && groupedResults.forum.length > 0 && (
                <CommandGroup heading={t('globalSearch.forum')}>
                  {groupedResults.forum.map((result) => (
                    <CommandItem
                      key={`forum-${result.id}`}
                      onSelect={() => handleSelect(result)}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      {getIcon(result.type)}
                      <div className="flex flex-col flex-1">
                        <span className="font-medium line-clamp-1">{result.title}</span>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          {result.subtitle && (
                            <span className="capitalize">{result.subtitle}</span>
                          )}
                          {result.date && (
                            <>
                              {result.subtitle && '•'}
                              <span>{new Date(result.date).toLocaleDateString()}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {!loading && groupedResults.analytics && groupedResults.analytics.length > 0 && (
                <CommandGroup heading={t('globalSearch.analytics')}>
                  {groupedResults.analytics.map((result) => (
                    <CommandItem
                      key={`analytics-${result.id}`}
                      onSelect={() => handleSelect(result)}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      {getIcon(result.type)}
                      <div className="flex flex-col flex-1">
                        <span className="font-medium line-clamp-1">{result.title}</span>
                        {result.subtitle && (
                          <span className="text-xs text-muted-foreground">{result.subtitle}</span>
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {!loading && groupedResults.ticker.length > 0 && (
                <CommandGroup heading={t('globalSearch.tickers')}>
                  {groupedResults.ticker.map((result) => (
                    <CommandItem
                      key={`ticker-${result.id}`}
                      onSelect={() => handleSelect(result)}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      {getIcon(result.type)}
                      <div className="flex flex-col flex-1">
                        <span className="font-medium">{result.title}</span>
                        {result.subtitle && (
                          <span className="text-xs text-muted-foreground">{result.subtitle}</span>
                        )}
                        {result.marketType && (
                          <span className="text-xs text-muted-foreground capitalize">{result.marketType}</span>
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {!loading && groupedResults.author.length > 0 && (
                <CommandGroup heading={t('globalSearch.authors')}>
                  {groupedResults.author.map((result) => (
                    <CommandItem
                      key={`author-${result.id}`}
                      onSelect={() => handleSelect(result)}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      {getIcon(result.type)}
                      <div className="flex flex-col flex-1">
                        <span className="font-medium">{result.title}</span>
                        {result.subtitle && (
                          <span className="text-xs text-muted-foreground">{result.subtitle}</span>
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {!query && (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  {t('globalSearch.typeToSearch')}
                </div>
              )}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
