import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MarketMiniTable } from '@/components/MarketMiniTable';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { useMarketData } from '@/hooks/useMarketData';
import { ArrowRight, TrendingUp, BarChart3, Coins, Bitcoin, DollarSign } from 'lucide-react';

export const MarketDataSection = memo(function MarketDataSection() {
  const { data: indices, loading: indicesLoading } = useMarketData({ type: 'indices', refreshInterval: 60000 });
  const { data: stocks, loading: stocksLoading } = useMarketData({ type: 'stocks', refreshInterval: 60000 });
  const { data: crypto, loading: cryptoLoading } = useMarketData({ type: 'crypto', refreshInterval: 120000 });
  const { data: commodities, loading: commoditiesLoading } = useMarketData({ type: 'commodities', refreshInterval: 60000 });
  const { data: currencies, loading: currenciesLoading } = useMarketData({ type: 'currencies', refreshInterval: 60000 });

  const marketLoading = indicesLoading || stocksLoading || cryptoLoading || commoditiesLoading || currenciesLoading;

  const marketBlocks = useMemo(() => [
    { title: 'Indices', data: indices, href: '/markets/indices', icon: TrendingUp },
    { title: 'Stocks', data: stocks, href: '/markets/stocks', icon: BarChart3 },
    { title: 'Commodities', data: commodities, href: '/markets/commodities', icon: Coins },
    { title: 'Crypto', data: crypto, href: '/markets/crypto', icon: Bitcoin },
    { title: 'Currencies', data: currencies, href: '/markets/currencies', icon: DollarSign },
  ], [indices, stocks, commodities, crypto, currencies]);

  return (
    <section className="section-spacing-sm section-gradient">
      <div className="container-wide">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"
        >
          <div>
            <span className="badge-primary mb-4">Markets</span>
            <h2 className="heading-md">Real-Time Market Data</h2>
          </div>
          <Link to="/markets/indices" className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            All Markets <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {marketLoading && indices.length === 0 ? (
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
