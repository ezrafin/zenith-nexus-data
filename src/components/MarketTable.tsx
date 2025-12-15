import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react';
import { MarketData } from '@/lib/api/types';
import { SimpleChart } from './SimpleChart';
import { WatchlistButton } from './markets/WatchlistButton';

interface MarketTableProps {
  data: MarketData[];
  showVolume?: boolean;
  showChart?: boolean;
  marketType?: 'indices' | 'stocks' | 'crypto' | 'commodities' | 'currencies';
}

type SortKey = 'symbol' | 'name' | 'price' | 'change' | 'changePercent' | 'volume';
type SortDirection = 'asc' | 'desc';

export function MarketTable({ data, showVolume = false, showChart = true, marketType = 'stocks' }: MarketTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('symbol');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    let comparison = 0;
    
    switch (sortKey) {
      case 'symbol':
      case 'name':
        comparison = a[sortKey].localeCompare(b[sortKey]);
        break;
      case 'price':
      case 'change':
      case 'changePercent':
        comparison = a[sortKey] - b[sortKey];
        break;
      case 'volume':
        const aVol = parseFloat(a.volume?.replace(/[^0-9.]/g, '') || '0');
        const bVol = parseFloat(b.volume?.replace(/[^0-9.]/g, '') || '0');
        comparison = aVol - bVol;
        break;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return price.toFixed(price < 10 ? 4 : 2);
  };

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) {
      return <ArrowUpDown className="h-3 w-3 opacity-50" />;
    }
    return sortDirection === 'asc' 
      ? <ChevronUp className="h-3 w-3" /> 
      : <ChevronDown className="h-3 w-3" />;
  };

  return (
    <div className="premium-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('symbol')}
                  className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Symbol <SortIcon column="symbol" />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Name <SortIcon column="name" />
                </button>
              </th>
              <th className="text-right px-4 py-3">
                <button
                  onClick={() => handleSort('price')}
                  className="flex items-center gap-1 justify-end text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Price <SortIcon column="price" />
                </button>
              </th>
              <th className="text-right px-4 py-3">
                <button
                  onClick={() => handleSort('change')}
                  className="flex items-center gap-1 justify-end text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Change <SortIcon column="change" />
                </button>
              </th>
              <th className="text-right px-4 py-3">
                <button
                  onClick={() => handleSort('changePercent')}
                  className="flex items-center gap-1 justify-end text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  % <SortIcon column="changePercent" />
                </button>
              </th>
              {showVolume && (
                <th className="text-right px-4 py-3">
                  <button
                    onClick={() => handleSort('volume')}
                    className="flex items-center gap-1 justify-end text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Volume <SortIcon column="volume" />
                  </button>
                </th>
              )}
              {showChart && (
                <th className="text-right px-4 py-3 w-32">
                  <span className="text-xs font-medium text-muted-foreground">7D</span>
                </th>
              )}
              <th className="text-center px-4 py-3 w-24">
                <span className="text-xs font-medium text-muted-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => {
              const isPositive = item.change >= 0;
              return (
                <motion.tr
                  key={item.symbol}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="border-b border-border/30 last:border-0 table-row-hover"
                >
                  <td className="px-4 py-4">
                    <span className="font-mono font-semibold text-sm">{item.symbol}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="font-mono font-medium text-sm">{formatPrice(item.price)}</span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className={`font-mono text-sm ${isPositive ? 'text-positive' : 'text-negative'}`}>
                      {isPositive ? '+' : ''}{formatPrice(item.change)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className={`inline-flex items-center gap-1 font-mono text-sm font-medium ${
                      isPositive ? 'text-positive' : 'text-negative'
                    }`}>
                      {isPositive ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {Math.abs(item.changePercent).toFixed(2)}%
                    </span>
                  </td>
                  {showVolume && (
                    <td className="px-4 py-4 text-right">
                      <span className="font-mono text-sm text-muted-foreground">{item.volume || '-'}</span>
                    </td>
                  )}
                  {showChart && (
                    <td className="px-4 py-4">
                      <div className="h-8 w-24 ml-auto">
                        <SimpleChart positive={isPositive} />
                      </div>
                    </td>
                  )}
                  <td className="px-4 py-4">
                    <div className="flex justify-center">
                      <WatchlistButton symbol={item.symbol} marketType={marketType} />
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}