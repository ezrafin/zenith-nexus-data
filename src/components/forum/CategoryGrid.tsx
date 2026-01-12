import { Link } from 'react-router-dom';
import { MessageSquare, TrendingUp, Briefcase, HelpCircle, Newspaper, Coins, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

interface Category {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  topic_count?: number;
}

interface CategoryGridProps {
  categories: Category[];
  selectedCategoryId?: string;
  onCategoryClick?: (categoryId: string | undefined) => void;
}

const categoryIcons: Record<string, typeof MessageSquare> = {
  general: MessageSquare,
  stocks: TrendingUp,
  crypto: Coins,
  etfs: Briefcase,
  beginners: HelpCircle,
  news: Newspaper,
  other: MoreHorizontal,
};

const categoryColors: Record<string, { bg: string; border: string; icon: string }> = {
  general: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    icon: 'text-blue-500',
  },
  stocks: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    icon: 'text-green-500',
  },
  crypto: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    icon: 'text-amber-500',
  },
  etfs: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    icon: 'text-purple-500',
  },
  beginners: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    icon: 'text-cyan-500',
  },
  news: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    icon: 'text-red-500',
  },
  other: {
    bg: 'bg-gray-500/10',
    border: 'border-gray-500/20',
    icon: 'text-gray-500',
  },
};

export function CategoryGrid({ categories, selectedCategoryId, onCategoryClick }: CategoryGridProps) {
  const { t } = useTranslation({ namespace: 'ui' });
  if (categories.length === 0) return null;

  const handleClick = (categoryId: string) => {
    if (onCategoryClick) {
      onCategoryClick(categoryId === selectedCategoryId ? undefined : categoryId);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
      {categories.map((category, index) => {
        const slug = category.slug || category.id.toLowerCase();
        const Icon = categoryIcons[slug] || MessageSquare;
        const colors = categoryColors[slug] || categoryColors.other;
        const isSelected = category.id === selectedCategoryId;

        return (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <button
              onClick={() => handleClick(category.id)}
              className={cn(
                'w-full p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 text-left group min-h-[120px] sm:min-h-[140px]',
                'hover:scale-105 hover:shadow-lg hover:shadow-primary/5',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                'active:scale-95',
                isSelected
                  ? `${colors.bg} ${colors.border} border-2 shadow-md`
                  : 'bg-card border-border/60 hover:border-primary/30'
              )}
              aria-label={`Filter by ${category.name}`}
            >
              <div className="flex flex-col items-center text-center gap-2">
                <div
                  className={cn(
                    'p-3 rounded-lg transition-colors',
                    isSelected ? colors.bg : 'bg-secondary/50 group-hover:bg-secondary'
                  )}
                >
                  <Icon className={cn('h-6 w-6', isSelected ? colors.icon : 'text-muted-foreground group-hover:text-primary')} />
                </div>
                <div className="flex-1 min-w-0 w-full">
                  <h3
                    className={cn(
                      'font-medium text-sm mb-1 truncate',
                      isSelected ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                    )}
                  >
                    {category.name}
                  </h3>
                  {category.topic_count !== undefined && (
                    <p className="text-xs text-muted-foreground">
                      {category.topic_count} {category.topic_count === 1 ? t('labels.topic', { ns: 'ui' }) : t('labels.topics', { ns: 'ui' })}
                    </p>
                  )}
                </div>
              </div>
            </button>
          </motion.div>
        );
      })}
    </div>
  );
}

