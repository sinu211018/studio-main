'use client';

import type { DataPoint } from '@/lib/types';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useMemo } from 'react';

type LineChartProps = {
  data: DataPoint[];
};

export default function LineChart({ data }: LineChartProps) {
  const chartData = useMemo(() => data.slice(-500), [data]); // Render only last 500 points for performance

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis 
          dataKey="timestamp" 
          tickFormatter={(time) => new Date(time).toLocaleTimeString()}
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
        />
        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={['dataMin - 10', 'dataMax + 10']}/>
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--background))',
            borderColor: 'hsl(var(--border))'
          }}
          labelStyle={{ color: 'hsl(var(--foreground))' }}
        />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="hsl(var(--chart-1))" 
          strokeWidth={2}
          dot={false} 
          isAnimationActive={false} 
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
