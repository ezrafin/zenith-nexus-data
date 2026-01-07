import { useState, useMemo, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react';
import { MarketData } from '@/lib/api/types';
import { SimpleChart } from './SimpleChart';
import { WatchlistButton } from './markets/WatchlistButton';
import { useTranslation } from '@/hooks/useTranslation';

interface MarketTableProps {
  data: MarketData[];
  showVolume?: boolean;
  showChart?: boolean;
  marketType?: 'indices' | 'stocks' | 'crypto' | 'commodities' | 'currencies';
}

type SortKey = 'symbol' | 'name' | 'price' | 'changePercent' | 'volume';
type SortDirection = 'asc' | 'desc';

export function MarketTable({ data, showVolume = false, showChart = true, marketType = 'stocks' }: MarketTableProps) {
  const { t } = useTranslation({ namespace: 'ui' });
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
      {/* Mobile: Card Mode */}
      <div className="md:hidden space-y-3 p-4">
        {sortedData.map((item, index) => {
          const isPositive = item.change >= 0;
          return (
            <motion.div
              key={item.symbol}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.03 }}
              className="border border-border/50 rounded-lg p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-semibold text-sm">{item.symbol}</span>
                    <span className={`inline-flex items-center gap-1 font-mono text-xs font-medium ${
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
                  <span className="text-xs text-muted-foreground line-clamp-1">{item.name}</span>
                </div>
                <WatchlistButton symbol={item.symbol} marketType={marketType} />
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-xs text-muted-foreground">{t('marketTable.price')}</span>
                  <div className="font-mono font-medium">{formatPrice(item.price)}</div>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">%</span>
                  <div className={`font-mono ${isPositive ? 'text-positive' : 'text-negative'}`}>
                    {isPositive ? '+' : ''}{Math.abs(item.changePercent).toFixed(2)}%
                  </div>
                </div>
                {showVolume && (
                  <div className="col-span-2">
                    <span className="text-xs text-muted-foreground">{t('marketTable.volume')}</span>
                    <div className="font-mono text-sm">{item.volume || '-'}</div>
                  </div>
                )}
              </div>
              {showChart && (
                <div className="h-8 w-full">
                  <SimpleChart positive={isPositive} />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Tablet & Desktop: Table Mode */}
      <div className="hidden md:block overflow-x-auto -webkit-overflow-scrolling-touch">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left px-3 md:px-4 py-2 md:py-3">
                <button
                  onClick={() => handleSort('symbol')}
                  className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('marketTable.symbol')} <SortIcon column="symbol" />
                </button>
              </th>
              <th className="text-left px-3 md:px-4 py-2 md:py-3">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('marketTable.name')} <SortIcon column="name" />
                </button>
              </th>
              <th className="text-right px-3 md:px-4 py-2 md:py-3">
                <button
                  onClick={() => handleSort('price')}
                  className="flex items-center gap-1 justify-end text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('marketTable.price')} <SortIcon column="price" />
                </button>
              </th>
              <th className="text-right px-3 md:px-4 py-2 md:py-3">
                <button
                  onClick={() => handleSort('changePercent')}
                  className="flex items-center gap-1 justify-end text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  % <SortIcon column="changePercent" />
                </button>
              </th>
              {showVolume && (
                <th className="text-right px-3 md:px-4 py-2 md:py-3">
                  <button
                    onClick={() => handleSort('volume')}
                    className="flex items-center gap-1 justify-end text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t('marketTable.volume')} <SortIcon column="volume" />
                  </button>
                </th>
              )}
              {showChart && (
                <th className="text-right px-3 md:px-4 py-2 md:py-3 w-32">
                  <span className="text-xs font-medium text-muted-foreground">{t('marketTable.sevenDays')}</span>
                </th>
              )}
              <th className="text-center px-3 md:px-4 py-2 md:py-3 w-24">
                <span className="text-xs font-medium text-muted-foreground">{t('marketTable.actions')}</span>
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
                  <td className="px-3 md:px-4 py-3 md:py-4">
                    <span className="font-mono font-semibold text-sm">{item.symbol}</span>
                  </td>
                  <td className="px-3 md:px-4 py-3 md:py-4">
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                  </td>
                  <td className="px-3 md:px-4 py-3 md:py-4 text-right">
                    <span className="font-mono font-medium text-sm tabular-nums">{formatPrice(item.price)}</span>
                  </td>
                  <td className="px-3 md:px-4 py-3 md:py-4 text-right">
                    <span className={`inline-flex items-center gap-1 font-mono text-sm font-medium tabular-nums ${
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
                    <td className="px-3 md:px-4 py-3 md:py-4 text-right">
                      <span className="font-mono text-sm text-muted-foreground tabular-nums">{item.volume || '-'}</span>
                    </td>
                  )}
                  {showChart && (
                    <td className="px-3 md:px-4 py-3 md:py-4">
                      <div className="h-8 w-24 ml-auto">
                        <SimpleChart positive={isPositive} />
                      </div>
                    </td>
                  )}
                  <td className="px-3 md:px-4 py-3 md:py-4">
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