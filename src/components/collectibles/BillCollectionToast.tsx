import { useEffect } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

interface BillCollectionToastProps {
  billName: string;
  rarity: 'regular' | 'legendary';
  progress?: {
    collected: number;
    total: number;
  };
  show: boolean;
}

export function BillCollectionToast({
  billName,
  rarity,
  progress,
  show,
}: BillCollectionToastProps) {
  const { t } = useTranslation({ namespace: 'ui' });
  
  useEffect(() => {
    if (show) {
      const isLegendary = rarity === 'legendary';
      
      toast.success(
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="relative w-12 h-12"
          >
            <img 
              src="/coin.png"
              alt="Coin"
              className="w-full h-full object-contain"
            />
            {isLegendary && (
              <div className="absolute -top-1 -right-1 text-xs">⭐</div>
            )}
          </motion.div>
          <div className="flex-1">
            <div className="font-semibold text-base">
              {isLegendary ? `🎉 ${t('billCollection.legendaryBillCollected')}` : t('billCollection.billCollected')}
            </div>
            <div className="text-sm text-muted-foreground mt-0.5">
              {billName}
            </div>
            {progress && (
              <div className="text-xs text-muted-foreground mt-1">
                {t('billCollection.progressLabel')} {progress.collected}/{progress.total}
              </div>
            )}
          </div>
        </div>,
        {
          duration: isLegendary ? 5000 : 3000,
          className: isLegendary ? 'border-amber-400/50' : '',
        }
      );
    }
  }, [show, billName, rarity, progress, t]);

  return null; // This component doesn't render anything itself
}

// Helper function to show collection toast
export async function showBillCollectionToast(
  billName: string,
  rarity: 'regular' | 'legendary',
  progress?: { collected: number; total: number }
) {
  const isLegendary = rarity === 'legendary';
  
  // Simple translation function that returns fallback labels
  const getLabel = (key: string): string => {
    const labels: Record<string, string> = {
      'billCollection.legendaryBillCollected': 'Legendary Coin Collected!',
      'billCollection.billCollected': 'Coin Collected!',
      'billCollection.progressLabel': 'Progress:'
    };
    return labels[key] || key;
  };
  
  toast.success(
    <div className="flex items-center gap-3">
      <div className="relative w-12 h-12">
        <img 
          src="/coin.png"
          alt="Coin"
          className="w-full h-full object-contain"
        />
        {isLegendary && (
          <div className="absolute -top-1 -right-1 text-xs">⭐</div>
        )}
      </div>
      <div className="flex-1">
        <div className="font-semibold text-base">
          {isLegendary ? `🎉 ${getLabel('billCollection.legendaryBillCollected')}` : getLabel('billCollection.billCollected')}
        </div>
        <div className="text-sm text-muted-foreground mt-0.5">
          {billName}
        </div>
        {progress && (
          <div className="text-xs text-muted-foreground mt-1">
            {getLabel('billCollection.progressLabel')} {progress.collected}/{progress.total}
          </div>
        )}
      </div>
    </div>,
    {
      duration: isLegendary ? 5000 : 3000,
      className: isLegendary ? 'border-amber-400/50' : '',
    }
  );
}

