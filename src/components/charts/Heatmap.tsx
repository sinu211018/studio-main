'use client';

import type { DataPoint } from '@/lib/types';
import { useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

type HeatmapProps = {
  data: DataPoint[];
};

const X_BUCKETS = 20; // Time buckets
const Y_BUCKETS = 10; // Value buckets

export default function Heatmap({ data: rawData }: HeatmapProps) {
  const { heatmapData, yAxisDomain, maxCount } = useMemo(() => {
    // Drastically reduce points for much better performance, this is the most expensive chart
    const recentData = rawData.slice(-500);
    
    if (recentData.length === 0) {
      return { heatmapData: [], yAxisDomain: [0, 100], maxCount: 0 };
    }
    
    const minTime = recentData[0].timestamp;
    const maxTime = recentData[recentData.length - 1].timestamp;

    let minValue = 150;
    let maxValue = 0;
    for (const point of recentData) {
      if (point.value < minValue) minValue = point.value;
      if (point.value > maxValue) maxValue = point.value;
    }
    
    const timeInterval = (maxTime - minTime) / X_BUCKETS;
    const valueInterval = (maxValue - minValue) / Y_BUCKETS;

    if (timeInterval <= 0 || valueInterval <= 0) {
        return { heatmapData: [], yAxisDomain: [minValue, maxValue], maxCount: 0 };
    }

    const grid: number[][] = Array(X_BUCKETS).fill(0).map(() => Array(Y_BUCKETS).fill(0));
    let currentMaxCount = 0;

    for (const point of recentData) {
        const timeIndex = Math.min(Math.floor((point.timestamp - minTime) / timeInterval), X_BUCKETS - 1);
        const valueIndex = Math.min(Math.floor((point.value - minValue) / valueInterval), Y_BUCKETS - 1);

        grid[timeIndex][valueIndex]++;
        if(grid[timeIndex][valueIndex] > currentMaxCount) {
            currentMaxCount = grid[timeIndex][valueIndex];
        }
    }

    const data = [];
    for (let i = 0; i < X_BUCKETS; i++) {
        for (let j = 0; j < Y_BUCKETS; j++) {
            if(grid[i][j] > 0) {
                data.push({
                    x: minTime + i * timeInterval + timeInterval / 2,
                    y: minValue + j * valueInterval + valueInterval / 2,
                    count: grid[i][j],
                });
            }
        }
    }

    return { heatmapData: data, yAxisDomain: [minValue, maxValue], maxCount: currentMaxCount };
  }, [rawData]);

  const colorForValue = (value: number) => {
    if (maxCount === 0) return 'hsla(228, 64%, 32%, 0.1)';
    const intensity = Math.pow(value / maxCount, 0.6);
    
    const hue = 228; 
    const saturation = 64;
    const lightness = 95 - (intensity * 60);
    const alpha = 0.2 + (intensity * 0.8);

    return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <p className="text-sm text-foreground">{`Time: ~${new Date(data.x).toLocaleTimeString()}`}</p>
          <p className="text-sm text-foreground">{`Value: ~${Math.round(data.y)}`}</p>
          <p className="text-sm text-foreground">{`Density: ${data.count}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart
        margin={{
          top: 20,
          right: 30,
          bottom: 20,
          left: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis
          type="number"
          dataKey="x"
          domain={['dataMin', 'dataMax']}
          tickFormatter={(time) => new Date(time).toLocaleTimeString()}
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          name="Time"
          interval="preserveEnd"
        />
        <YAxis 
          type="number" 
          dataKey="y" 
          name="Value"
          stroke="hsl(var(--muted-foreground))" 
          fontSize={12}
          domain={yAxisDomain}
          tickFormatter={(value) => Math.round(value as number)}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
        <Scatter data={heatmapData} isAnimationActive={false}>
          {heatmapData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={colorForValue(entry.count)} 
            />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
}
