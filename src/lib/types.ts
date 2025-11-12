export type DataPoint = {
  timestamp: number;
  value: number;
  value2: number;
  category: string;
};

export type PerformanceMetrics = {
  fps: number;
  memoryUsage: number;
};

export type AggregationLevel = 'raw' | '1min' | '5min' | '1hour';
