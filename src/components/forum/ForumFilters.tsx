import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { X, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

export type SortOption = 'newest' | 'oldest' | 'most_active' | 'trending' | 'most_liked' | 'controversial';
export type DateFilter = 'all' | 'today' | 'week' | 'month' | 'year';

interface ForumFiltersProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  categoryFilter?: string;
  onCategoryChange: (category: string | undefined) => void;
  dateFilter: DateFilter;
  onDateFilterChange: (filter: DateFilter) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
  categories?: Array<{ id: string; name: string }>;
}

export function ForumFilters({
  sortBy,
  onSortChange,
  categoryFilter,
  onCategoryChange,
  dateFilter,
  onDateFilterChange,
  searchQuery,
  onSearchChange,
  onClearFilters,
  categories = [],
}: ForumFiltersProps) {
  const { t } = useTranslation({ namespace: 'forum' });
  const hasActiveFilters = categoryFilter || dateFilter !== 'all' || searchQuery;

  return (
    <div className="space-y-3 md:space-y-2">
      {/* Search */}
      <div className="space-y-1.5">
        <Label htmlFor="forum-search">{t('searchDiscussions')}</Label>
        <div className="relative">
          <Input
            id="forum-search"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pr-10"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-secondary rounded"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap gap-3 items-end">
        {/* Sort */}
        <div className="space-y-1.5 flex-1 min-w-[200px]">
          <Label htmlFor="sort">{t('sortBy')}</Label>
          <Select value={sortBy} onValueChange={(value: SortOption) => onSortChange(value)}>
            <SelectTrigger id="sort">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">{t('sortNewest')}</SelectItem>
              <SelectItem value="oldest">{t('sortOldest')}</SelectItem>
              <SelectItem value="most_active">{t('sortMostActive')}</SelectItem>
              <SelectItem value="trending">{t('sortTrending')}</SelectItem>
              <SelectItem value="most_liked">{t('sortMostLiked')}</SelectItem>
              <SelectItem value="controversial">{t('sortControversial')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="space-y-1.5 flex-1 min-w-[200px]">
            <Label htmlFor="category">{t('category')}</Label>
            <Select
              value={categoryFilter || 'all'}
              onValueChange={(value) => onCategoryChange(value === 'all' ? undefined : value)}
            >
              <SelectTrigger id="category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allCategories')}</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Date Filter */}
        <div className="space-y-1.5 flex-1 min-w-[200px]">
          <Label htmlFor="date">{t('date')}</Label>
          <Select value={dateFilter} onValueChange={(value: DateFilter) => onDateFilterChange(value)}>
            <SelectTrigger id="date">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('dateAllTime')}</SelectItem>
              <SelectItem value="today">{t('dateToday')}</SelectItem>
              <SelectItem value="week">{t('dateThisWeek')}</SelectItem>
              <SelectItem value="month">{t('dateThisMonth')}</SelectItem>
              <SelectItem value="year">{t('dateThisYear')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button variant="outline" onClick={onClearFilters} className="mb-0">
            <X className="mr-2 h-4 w-4" />
            {t('clearFilters')}
          </Button>
        )}
      </div>
    </div>
  );
}

