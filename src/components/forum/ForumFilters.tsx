import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { X, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const hasActiveFilters = categoryFilter || dateFilter !== 'all' || searchQuery;

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="space-y-2">
        <Label htmlFor="forum-search">Search discussions</Label>
        <div className="relative">
          <Input
            id="forum-search"
            placeholder="Search by title, content, or author..."
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
      <div className="flex flex-wrap gap-4 items-end">
        {/* Sort */}
        <div className="space-y-2 flex-1 min-w-[200px]">
          <Label htmlFor="sort">Sort by</Label>
          <Select value={sortBy} onValueChange={(value: SortOption) => onSortChange(value)}>
            <SelectTrigger id="sort">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="most_active">Most Active</SelectItem>
              <SelectItem value="trending">Trending</SelectItem>
              <SelectItem value="most_liked">Most Liked</SelectItem>
              <SelectItem value="controversial">Controversial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="space-y-2 flex-1 min-w-[200px]">
            <Label htmlFor="category">Category</Label>
            <Select
              value={categoryFilter || 'all'}
              onValueChange={(value) => onCategoryChange(value === 'all' ? undefined : value)}
            >
              <SelectTrigger id="category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
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
        <div className="space-y-2 flex-1 min-w-[200px]">
          <Label htmlFor="date">Time Period</Label>
          <Select value={dateFilter} onValueChange={(value: DateFilter) => onDateFilterChange(value)}>
            <SelectTrigger id="date">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button variant="outline" onClick={onClearFilters} className="mb-0">
            <X className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
}

