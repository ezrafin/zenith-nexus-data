// Shared validation utilities for market data

export interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume?: string;
  marketCap?: string;
  image?: string;
}

/**
 * Validates if a price is valid (greater than 0 and finite)
 */
export function isValidPrice(price: number): boolean {
  return (
    typeof price === 'number' &&
    !isNaN(price) &&
    isFinite(price) &&
    price > 0
  );
}

/**
 * Validates a single market data item
 */
export function isValidMarketDataItem(item: any): item is MarketData {
  return (
    item &&
    typeof item === 'object' &&
    typeof item.symbol === 'string' &&
    item.symbol.trim().length > 0 &&
    typeof item.name === 'string' &&
    item.name.trim().length > 0 &&
    isValidPrice(item.price)
  );
}

/**
 * Validates and normalizes market data array
 * Filters out invalid items and ensures all required fields are present
 */
export function validateMarketData(data: any[]): MarketData[] {
  if (!Array.isArray(data)) {
    return [];
  }

  const validItems = data
    .filter(isValidMarketDataItem)
    .map((item) => ({
      symbol: String(item.symbol).trim(),
      name: String(item.name).trim(),
      price: Number(item.price),
      change: typeof item.change === 'number' && !isNaN(item.change) ? item.change : 0,
      changePercent:
        typeof item.changePercent === 'number' && !isNaN(item.changePercent)
          ? item.changePercent
          : 0,
      high:
        typeof item.high === 'number' && !isNaN(item.high) && item.high > 0
          ? item.high
          : item.price,
      low:
        typeof item.low === 'number' && !isNaN(item.low) && item.low > 0
          ? item.low
          : item.price,
      volume: item.volume ? String(item.volume) : undefined,
      marketCap: item.marketCap ? String(item.marketCap) : undefined,
      image: item.image ? String(item.image) : undefined,
    }));

  return deduplicateBySymbol(validItems);
}

/**
 * Removes duplicate entries by symbol, keeping the first occurrence
 */
export function deduplicateBySymbol(data: MarketData[]): MarketData[] {
  const seen = new Set<string>();
  return data.filter((item) => {
    const symbolUpper = item.symbol.toUpperCase();
    if (seen.has(symbolUpper)) {
      return false;
    }
    seen.add(symbolUpper);
    return true;
  });
}

/**
 * Validates that market data array has minimum required items
 */
export function hasMinimumData(data: MarketData[], minimum: number = 3): boolean {
  return Array.isArray(data) && data.length >= minimum;
}

