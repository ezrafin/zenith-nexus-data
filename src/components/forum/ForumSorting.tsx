import { Button } from '@/components/ui/button';
import { ArrowUpDown, Clock, TrendingUp, Heart, MessageSquare, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SortOption } from './ForumFilters';

interface ForumSortingProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  className?: string;
}

const sortOptions: Array<{ value: SortOption; label: string; icon: typeof Clock }> = [
  { value: 'newest', label: 'Newest', icon: Clock },
  { value: 'most_active', label: 'Most Active', icon: MessageSquare },
  { value: 'trending', label: 'Trending', icon: TrendingUp },
  { value: 'most_liked', label: 'Most Liked', icon: Heart },
  { value: 'controversial', label: 'Controversial', icon: Flame },
];

export function ForumSorting({ sortBy, onSortChange, className }: ForumSortingProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {sortOptions.map((option) => {
        const Icon = option.icon;
        return (
          <Button
            key={option.value}
            variant={sortBy === option.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => onSortChange(option.value)}
            className={cn(
              'flex items-center gap-2',
              sortBy === option.value && 'bg-primary text-primary-foreground'
            )}
          >
            <Icon className="h-4 w-4" />
            {option.label}
          </Button>
        );
      })}
    </div>
  );
}

