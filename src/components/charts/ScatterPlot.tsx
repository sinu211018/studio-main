'use client';

import type { DataPoint } from '@/lib/types';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useMemo } from 'react';

type ScatterPlotProps = {
  data: DataPoint[];
};

export default function ScatterPlot({ data }: ScatterPlotProps) {
  const chartData = useMemo(() => data.slice(-500), [data]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 0,
        }}
      >
        <CartesianGrid stroke="hsl(var(--border))" />
        <XAxis 
          type="number" 
          dataKey="value" 
          name="Value 1" 
          stroke="hsl(var(--muted-foreground))" 
          fontSize={12}
          domain={['dataMin - 10', 'dataMax + 10']}
        />
        <YAxis 
          type="number" 
          dataKey="value2" 
          name="Value 2" 
          stroke="hsl(var(--muted-foreground))" 
          fontSize={12}
          domain={['dataMin - 10', 'dataMax + 10']}
        />
        <Tooltip 
          cursor={{ strokeDasharray: '3 3' }} 
          contentStyle={{
            backgroundColor: 'hsl(var(--background))',
            borderColor: 'hsl(var(--border))'
          }}
        />
        <Scatter name="Data Points" data={chartData} fill="hsl(var(--chart-1))" isAnimationActive={false} shape="circle" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
