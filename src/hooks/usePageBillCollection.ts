import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useCollectibleBills } from './useCollectibleBills';
import { showBillCollectionToast } from '@/components/collectibles/BillCollectionToast';

// Re-export for convenience
export { useCollectibleBills };

interface PageBillConfig {
  billId: string;
  triggerOnMount?: boolean;
  triggerOnAction?: boolean;
  actionName?: string;
}

/**
 * Hook to automatically attempt bill collection on page visit or action
 */
export function usePageBillCollection(config: PageBillConfig) {
  const { billId, triggerOnMount = true, triggerOnAction = false, actionName } = config;
  const { collectBill, isCollected } = useCollectibleBills();
  const location = useLocation();
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (triggerOnMount && !hasTriggeredRef.current && !isCollected(billId)) {
      hasTriggeredRef.current = true;
      
      // Small delay to ensure page is fully loaded
      const timer = setTimeout(async () => {
        const response = await collectBill(billId, {
          page: location.pathname,
          action: 'page_visit',
        });

        if (response.success && response.collected && response.bill) {
          showBillCollectionToast(
            response.bill.name,
            response.bill.rarity,
            response.progress
          );
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [billId, triggerOnMount, isCollected, collectBill, location.pathname]);

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
  };
}

