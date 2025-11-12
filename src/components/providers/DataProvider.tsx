'use client';

import { createContext, useContext, useState, useMemo, useTransition } from 'react';
import type { DataPoint, AggregationLevel } from '@/lib/types';
import { useDataStream } from '@/hooks/useDataStream';
import { generateInitialData } from '@/lib/dataGenerator';

const INITIAL_DATA_COUNT = 2000;

type DataContextType = {
  data: DataPoint[];
  aggregatedData: DataPoint[];
  aggregation: AggregationLevel;
  setAggregation: (level: AggregationLevel) => void;
  isPending: boolean;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialData = generateInitialData(INITIAL_DATA_COUNT);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const rawData = useDataStream(initialData);
  const [aggregation, setAggregation] = useState<AggregationLevel>('raw');
  const [isPending, startTransition] = useTransition();

  const handleSetAggregation = (level: AggregationLevel) => {
    startTransition(() => {
      setAggregation(level);
    });
  };

  const aggregatedData = useMemo(() => {
    if (aggregation === 'raw') {
      return rawData;
    }
    const interval = { '1min': 60000, '5min': 300000, '1hour': 3600000 }[aggregation];
    const grouped: { [key: number]: DataPoint[] } = {};

    // For aggregation, we can process more data without a huge performance hit
    const dataToProcess = rawData.slice(-5000);

    for (const point of dataToProcess) {
      const groupKey = Math.floor(point.timestamp / interval) * interval;
      if (!grouped[groupKey]) {
        grouped[groupKey] = [];
      }
      grouped[groupKey].push(point);
    }
    
    return Object.entries(grouped).map(([timestamp, points]) => {
      const count = points.length;
      let sumValue = 0;
      let sumValue2 = 0;
      for (const p of points) {
          sumValue += p.value;
          sumValue2 += p.value2;
      }

      return {
        timestamp: Number(timestamp),
        value: sumValue / count,
        value2: sumValue2 / count,
        category: points[0].category,
      };
    }).sort((a,b) => a.timestamp - b.timestamp);
  }, [rawData, aggregation]);

  const value = {
    data: rawData,
    aggregatedData,
    aggregation,
    setAggregation: handleSetAggregation,
    isPending,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
