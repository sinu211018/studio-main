'use client';

import { useData } from '@/components/providers/DataProvider';
import type { AggregationLevel } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export function FilterPanel() {
  const { aggregation, setAggregation, isPending } = useData();

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Label htmlFor="aggregation-select" className="text-sm font-medium text-primary-foreground">Aggregation</Label>
        <Select
          value={aggregation}
          onValueChange={(value) => setAggregation(value as AggregationLevel)}
          disabled={isPending}
        >
          <SelectTrigger id="aggregation-select" className="w-[120px] bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/20 focus:ring-accent">
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="raw">Raw (100ms)</SelectItem>
            <SelectItem value="1min">1 Minute</SelectItem>
            <SelectItem value="5min">5 Minutes</SelectItem>
            <SelectItem value="1hour">1 Hour</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
