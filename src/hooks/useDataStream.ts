'use client';

import { useState, useEffect } from 'react';
import type { DataPoint } from '@/lib/types';
import { generateDataPoint } from '@/lib/dataGenerator';

const MAX_DATA_POINTS = 10000;

export function useDataStream(initialData: DataPoint[]) {
  const [data, setData] = useState<DataPoint[]>(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData, generateDataPoint(Date.now())];
        if (newData.length > MAX_DATA_POINTS) {
          return newData.slice(newData.length - MAX_DATA_POINTS);
        }
        return newData;
      });
    }, 100); // New data every 100ms

    return () => clearInterval(interval);
  }, []);

  return data;
}
