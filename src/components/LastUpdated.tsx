import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useTranslation } from '@/hooks/useTranslation';

interface LastUpdatedProps {
  timestamp: Date | null;
  onRefresh: () => void;
  loading?: boolean;
}

export function LastUpdated({ timestamp, onRefresh, loading }: LastUpdatedProps) {
  const { t } = useTranslation({ namespace: 'ui' });
  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      {timestamp && (
        <span>
          {t('lastUpdated.updated')} {format(timestamp, 'dd.MM.yyyy HH:mm')}
        </span>
      )}
      <Button
        variant="ghost"
        size="sm"
        onClick={onRefresh}
        disabled={loading}
        className="h-8 px-2"
      >
        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
      </Button>
    </div>
  );
}
