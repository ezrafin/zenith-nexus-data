import { useEffect, useRef } from 'react';
import { MarketData } from '@/lib/api';
import { cn } from '@/lib/utils';

interface AdvancedChartProps {
  data: MarketData[];
  symbol: string;
  timeframe?: '1D' | '1W' | '1M' | '3M' | '1Y' | 'All';
  showIndicators?: boolean;
  height?: number;
  className?: string;
}

export function AdvancedChart({
  data,
  symbol,
  timeframe = '1M',
  showIndicators = false,
  height = 300,
  className,
}: AdvancedChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || data.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = height;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw chart
    drawChart(ctx, canvas, data);
  }, [data, height]);

  const drawChart = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, chartData: MarketData[]) => {
    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;

    // Find min/max values
    const prices = chartData.map((d) => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice || 1;

    // Draw grid
    ctx.strokeStyle = 'rgba(128, 128, 128, 0.2)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
      ctx.stroke();
    }

    // Draw price line
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();

    chartData.forEach((point, index) => {
      const x = padding + (chartWidth / (chartData.length - 1)) * index;
      const y = padding + chartHeight - ((point.price - minPrice) / priceRange) * chartHeight;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Draw area fill
    ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
    ctx.lineTo(canvas.width - padding, padding + chartHeight);
    ctx.lineTo(padding, padding + chartHeight);
    ctx.closePath();
    ctx.fill();

    // Draw price labels
    ctx.fillStyle = '#9ca3af';
    ctx.font = '12px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(maxPrice.toFixed(2), padding - 10, padding + 5);
    ctx.fillText(minPrice.toFixed(2), padding - 10, canvas.height - padding + 5);
  };

  return (
    <div className={cn('relative', className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">{symbol}</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{timeframe}</span>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        className="w-full border border-border rounded-lg bg-card"
        style={{ height: `${height}px` }}
      />
      {showIndicators && (
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span>MA(20): --</span>
          <span>RSI: --</span>
          <span>MACD: --</span>
        </div>
      )}
    </div>
  );
}

