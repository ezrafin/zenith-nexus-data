import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';
import { MarketData } from '@/lib/api/types';
import { useTranslation } from '@/hooks/useTranslation';

interface MarketMiniTableProps {
  title: string;
  data: MarketData[];
  href: string;
  icon?: LucideIcon;
}

export function MarketMiniTable({ title, data, href, icon: Icon }: MarketMiniTableProps) {
  const { t } = useTranslation({ namespace: 'ui' });
  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return price.toFixed(price < 10 ? 4 : 2);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        to={href}
        className="group block h-full premium-card p-4 sm:p-5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4 text-primary" />}
            <h3 className="font-semibold text-xs sm:text-sm">{title}</h3>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="live-dot" />
            <span className="text-xs text-muted-foreground">{t('marketWidget.live')}</span>
          </div>
        </div>

        {/* Data rows */}
        <div className="space-y-2 sm:space-y-3">
          {data.slice(0, 4).map((item) => {
            const isPositive = item.change >= 0;
            return (
              <div key={item.symbol} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="text-xs font-mono font-medium text-muted-foreground truncate">
                    {item.symbol}
                  </span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                  <span className="text-xs sm:text-sm font-mono font-medium tabular-nums">
                    {formatPrice(item.price)}
                  </span>
                  <span className={`flex items-center gap-0.5 text-xs font-medium tabular-nums ${
                    isPositive ? 'text-positive' : 'text-negative'
                  }`}>
                    {isPositive ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {Math.abs(item.changePercent).toFixed(2)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-border/50">
          <span className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            {t('marketWidget.viewAll')}
            <ArrowUpRight className="h-3 w-3" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}