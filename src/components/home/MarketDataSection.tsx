import { memo, useMemo, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MarketMiniTable } from '@/components/MarketMiniTable';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { useAllMarkets } from '@/hooks/useAllMarkets';
import { ArrowRight, TrendingUp, BarChart3, Coins, Bitcoin, DollarSign } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export const MarketDataSection = memo(function MarketDataSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation({ namespace: 'ui' });
  
  // Use Intersection Observer to detect when section becomes visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Disconnect observer after first intersection to avoid unnecessary checks
            observer.disconnect();
          }
        });
      },
      {
        // Start loading when section is 200px away from viewport
        rootMargin: '200px',
        threshold: 0.01,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Only load market data when section is visible or about to be visible
  const { indices, stocks, crypto, commodities, currencies, loading: marketLoading } = useAllMarkets({
    enabled: isVisible,
  });

  // Helper function to sort by market cap and get top 40
  const getTop40ByMarketCap = useMemo(() => {
    return (data: typeof indices.data) => {
      if (!data || data.length === 0) return [];
      
      // Calculate market cap for each item
      const withMarketCap = data.map(item => {
        let marketCap = item.price;
        if (item.volume) {
          const volumeNum = parseFloat(item.volume.replace(/[^0-9.]/g, '') || '0');
          marketCap = item.price * volumeNum;
        }
        return { ...item, marketCap };
      });
      
      // Sort by market cap descending and take top 40
      return withMarketCap
        .sort((a, b) => b.marketCap - a.marketCap)
        .slice(0, 40)
        .map(({ marketCap, ...rest }) => rest); // Remove marketCap from result
    };
  }, []);

  const marketBlocks = useMemo(() => [
    { title: t('marketsPage.indicesTitle'), data: getTop40ByMarketCap(indices.data), href: '/markets/indices', icon: TrendingUp },
    { title: t('marketsPage.stocksTitle'), data: getTop40ByMarketCap(stocks.data), href: '/markets/stocks', icon: BarChart3 },
    { title: t('marketsPage.commoditiesTitle'), data: getTop40ByMarketCap(commodities.data), href: '/markets/commodities', icon: Coins },
    { title: t('marketsPage.cryptoTitle'), data: getTop40ByMarketCap(crypto.data), href: '/markets/crypto', icon: Bitcoin },
    { title: t('marketsPage.currenciesTitle'), data: getTop40ByMarketCap(currencies.data), href: '/markets/currencies', icon: DollarSign },
  ], [indices.data, stocks.data, commodities.data, crypto.data, currencies.data, t, getTop40ByMarketCap]);

  return (
    <section ref={sectionRef} className="section-spacing-sm section-gradient">
      <div className="container-wide">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"
        >
          <div>
            <span className="badge-primary mb-4">{t('marketDataSection.badge')}</span>
            <h2 className="heading-md">{t('marketDataSection.heading')}</h2>
          </div>
          <Link to="/markets/indices" className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            {t('marketDataSection.allMarkets')} <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {marketLoading && indices.data.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} lines={6} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {marketBlocks.map(block => (
              <MarketMiniTable 
                key={block.href} 
                title={block.title} 
                data={block.data} 
                href={block.href} 
                icon={block.icon} 
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
});
