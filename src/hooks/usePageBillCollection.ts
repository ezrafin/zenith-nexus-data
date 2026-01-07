import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useCollectibleBills } from './useCollectibleBills';
import { showBillCollectionToast } from '@/components/collectibles/BillCollectionToast';
import { PageCoin } from '@/components/collectibles/PageCoin';

// Re-export for convenience
export { useCollectibleBills };

interface PageBillConfig {
  billId: string;
  triggerOnMount?: boolean;
  triggerOnAction?: boolean;
  actionName?: string;
}

/**
 * Hook to manage bill collection on page visit or action
 * Now returns whether coin should be shown (not auto-collects)
 */
export function usePageBillCollection(config: PageBillConfig) {
  const { billId, triggerOnMount = true, triggerOnAction = false, actionName } = config;
  const { collectBill, isCollected } = useCollectibleBills();
  const location = useLocation();
  const hasTriggeredRef = useRef(false);

  // Don't auto-collect anymore - coins should be clicked by user
  // This hook now just tracks state and provides collection function

  const triggerActionCollection = async (metadata?: Record<string, any>) => {
    if (!triggerOnAction || isCollected(billId)) {
      return { success: false, collected: false };
    }

    const response = await collectBill(billId, {
      page: location.pathname,
      action: actionName || 'user_action',
      metadata,
    });

    if (response.success && response.collected && response.bill) {
      showBillCollectionToast(
        response.bill.name,
        response.bill.rarity,
        response.progress
      );
    }

    return response;
  };

  return {
    triggerActionCollection,
    isCollected: isCollected(billId),
    CoinComponent: () => <PageCoin billId={billId} />,
  };
}

