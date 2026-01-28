export function formatPrice(value: number, language: string): string {
  if (!Number.isFinite(value)) return '-';

  const abs = Math.abs(value);
  const locale = language || 'en';

  if (abs >= 1000) {
    return value.toLocaleString(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  const fractionDigits = abs < 10 ? 4 : 2;
  return value.toLocaleString(locale, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}

export function formatPercent(value: number, language: string): string {
  if (!Number.isFinite(value)) return '-';
  const locale = language || 'en';
  return value.toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function parseVolume(raw: string | number | null | undefined): number {
  if (raw == null) return 0;

  if (typeof raw === 'number') {
    return Number.isFinite(raw) ? raw : 0;
  }

  const trimmed = raw.trim();
  if (!trimmed) return 0;

  // Handle shorthand formats like 52.3M, 1.2B, 10K
  const match = trimmed.match(/^([\d.,]+)\s*([KMBT])?$/i);
  if (match) {
    const num = parseFloat(match[1].replace(/,/g, ''));
    if (!Number.isFinite(num)) return 0;
    const suffix = match[2]?.toUpperCase();
    switch (suffix) {
      case 'T':
        return num * 1e12;
      case 'B':
        return num * 1e9;
      case 'M':
        return num * 1e6;
      case 'K':
        return num * 1e3;
      default:
        return num;
    }
  }

  // Fallback: strip non-numeric (keeping dot and comma) and parse
  const cleaned = trimmed.replace(/[^0-9.,-]/g, '');
  const normalized = cleaned.replace(/,/g, '');
  const parsed = parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}


