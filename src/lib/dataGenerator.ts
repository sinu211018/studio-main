import type { DataPoint } from '@/lib/types';

const CATEGORIES = ['A', 'B', 'C', 'D', 'E'];

export function generateDataPoint(time: number): DataPoint {
  return {
    timestamp: time,
    value: 50 + Math.random() * 50 + Math.sin(time / 10000) * 20,
    value2: 20 + Math.random() * 60 + Math.cos(time / 10000) * 15,
    category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
  };
}

export function generateInitialData(count: number): DataPoint[] {
  const data: DataPoint[] = [];
  const now = Date.now();
  for (let i = count - 1; i >= 0; i--) {
    data.push(generateDataPoint(now - i * 100));
  }
  return data;
}
