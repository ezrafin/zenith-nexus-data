import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface SimpleChartProps {
  positive?: boolean;
  data?: { value: number }[];
}

// Generate realistic market-like data
function generateChartData(): { day: number; value: number }[] {
  const data: { day: number; value: number }[] = [];
  let value = 100 + Math.random() * 20;
  
  for (let i = 0; i < 30; i++) {
    const change = (Math.random() - 0.48) * 3; // Slight upward bias
    value = Math.max(80, Math.min(140, value + change));
    data.push({ 
      day: i + 1, 
      value: Number(value.toFixed(2)) 
    });
  }
  
  return data;
}

export function SimpleChart({ positive = true, data }: SimpleChartProps) {
  const chartData = useMemo(() => data || generateChartData(), [data]);
  
  const gradientId = positive ? 'chartGradientPositive' : 'chartGradientNegative';
  const strokeColor = positive ? 'hsl(160, 84%, 39%)' : 'hsl(0, 72%, 51%)';
  const fillColor = positive ? 'hsl(160, 84%, 39%)' : 'hsl(0, 72%, 51%)';

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fillColor} stopOpacity={0.3} />
            <stop offset="100%" stopColor={fillColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="day" hide />
        <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(222, 47%, 7%)',
            border: '1px solid hsl(222, 30%, 15%)',
            borderRadius: '8px',
            fontSize: '12px',
            color: 'hsl(210, 40%, 98%)',
          }}
          labelStyle={{ display: 'none' }}
          formatter={(value: number) => [`${value.toFixed(2)}`, 'Value']}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={strokeColor}
          strokeWidth={2}
          fill={`url(#${gradientId})`}
          animationDuration={1000}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}