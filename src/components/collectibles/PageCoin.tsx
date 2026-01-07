import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BillVisual } from './BillVisual';
import { useCollectibleBills } from '@/hooks/useCollectibleBills';
import { showBillCollectionToast } from './BillCollectionToast';

interface PageCoinProps {
  billId: string;
  position?: { top?: string; left?: string; right?: string; bottom?: string };
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Component that displays a coin on the page that can be clicked to collect
 * Only shows if the coin hasn't been collected yet
 */
export function PageCoin({ billId, position, size = 'md' }: PageCoinProps) {
  const { isCollected, collectBill } = useCollectibleBills();
  const location = useLocation();
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Only show if not collected
    setShouldShow(!isCollected(billId));
  }, [billId, isCollected]);

  if (!shouldShow) {
    return null;
  }

  const handleCollect = async () => {
    const response = await collectBill(billId, {
      page: location.pathname,
      action: 'coin_click',
    });

    if (response.success && response.collected && response.bill) {
      showBillCollectionToast(
        response.bill.name,
        response.bill.rarity,
        response.progress
      );
    }
  };

  // Default position if not provided - random but not too close to edges
  const defaultPosition = position || {
    top: `${Math.random() * 60 + 20}%`, // 20% to 80% from top
    right: `${Math.random() * 15 + 5}%`, // 5% to 20% from right
  };

  return (
    <BillVisual
      billId={billId}
      rarity="regular"
      onCollect={handleCollect}
      size={size}
      position={defaultPosition}
    />
  );
}

