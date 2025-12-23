import { Link } from 'react-router-dom';
import { TrendingUp, Coins, BarChart3, DollarSign, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AssetBadgeProps {
  symbol: string;
  assetType?: string | null;
  className?: string;
}

const assetTypeConfig: Record<string, { icon: typeof TrendingUp; label: string; route: string }> = {
  stock: { icon: TrendingUp, label: 'Stock', route: '/markets/stocks' },
  stocks: { icon: TrendingUp, label: 'Stock', route: '/markets/stocks' },
  crypto: { icon: Coins, label: 'Crypto', route: '/markets/crypto' },
  index: { icon: BarChart3, label: 'Index', route: '/markets/indices' },
  indices: { icon: BarChart3, label: 'Index', route: '/markets/indices' },
  commodity: { icon: Coins, label: 'Commodity', route: '/markets/commodities' },
  commodities: { icon: Coins, label: 'Commodity', route: '/markets/commodities' },
  currency: { icon: DollarSign, label: 'Currency', route: '/markets/currencies' },
  currencies: { icon: DollarSign, label: 'Currency', route: '/markets/currencies' },
  etf: { icon: Briefcase, label: 'ETF', route: '/markets/indices' },
};

const defaultConfig = { icon: TrendingUp, label: 'Asset', route: '/markets' };

export function AssetBadge({ symbol, assetType, className }: AssetBadgeProps) {
  if (!symbol) return null;

  const config = (assetType && assetTypeConfig[assetType]) ? assetTypeConfig[assetType] : defaultConfig;
  const Icon = config.icon;

  return (
    <Link
      to={`${config.route}?symbol=${symbol}`}
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
        'bg-primary/10 text-primary hover:bg-primary/20 transition-colors',
        'border border-primary/20',
        className
      )}
      onClick={(e) => {
        // Prevent navigation if clicking on a topic that's already in a link
        e.stopPropagation();
      }}
    >
      <Icon className="h-3 w-3" />
      <span>{symbol}</span>
    </Link>
  );
}

