'use client';

import type { DataPoint } from '@/lib/types';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useMemo } from 'react';

type BarChartProps = {
  data: DataPoint[];
};

export default function BarChartComponent({ data }: BarChartProps) {
  const categoryData = useMemo(() => {
    const categories: { [key: string]: { sum: number, count: number } } = {};
    // Process fewer points for better performance
    const recentData = data.slice(-500);

    for (const point of recentData) {
      const category = point.category;
      if (!categories[category]) {
        categories[category] = { sum: 0, count: 0 };
      }
      categories[category].sum += point.value;
      categories[category].count++;
    }

    return Object.entries(categories).map(([name, { sum, count }]) => ({
      name,
      value: sum / count,
    })).sort((a,b) => a.name.localeCompare(b.name));
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart 
        data={categoryData}
        margin={{
          top: 5,
          right: 30,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--background))',
            borderColor: 'hsl(var(--border))'
          }}
          labelStyle={{ color: 'hsl(var(--foreground))' }}
        />
        <Bar dataKey="value" fill="hsl(var(--chart-2))" isAnimationActive={false} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
