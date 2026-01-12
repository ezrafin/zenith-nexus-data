import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const { t } = useTranslation({ namespace: 'ui' });
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsisStart = currentPage > 3;
    const showEllipsisEnd = currentPage < totalPages - 2;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (showEllipsisStart) {
        pages.push('...');
      }
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }
      
      if (showEllipsisEnd) {
        pages.push('...');
      }
      
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="gap-1 min-h-[44px] px-3 sm:px-4"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">{t('pagination.previous')}</span>
        <span className="sm:hidden">{t('pagination.prev') || 'Prev'}</span>
      </Button>

      <div className="flex items-center gap-1 overflow-x-auto sm:overflow-visible">
        {getPageNumbers().map((page, index) => (
          typeof page === 'number' ? (
            <Button
              key={index}
              variant={currentPage === page ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPageChange(page)}
              className="min-w-[44px] min-h-[44px] p-0"
            >
              {page}
            </Button>
          ) : (
            <span key={index} className="px-2 text-muted-foreground flex items-center min-h-[44px]">
              {page}
            </span>
          )
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="gap-1 min-h-[44px] px-3 sm:px-4"
      >
        <span className="hidden sm:inline">{t('pagination.next')}</span>
        <span className="sm:hidden">{t('pagination.nextShort') || 'Next'}</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
