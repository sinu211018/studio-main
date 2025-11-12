'use client';

import type { DataPoint } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMemo } from 'react';

type DataTableProps = {
  data: DataPoint[];
};

export function DataTable({ data }: DataTableProps) {
  const recentData = useMemo(() => data.slice(-100).reverse(), [data]);

  return (
    <ScrollArea className="h-[450px] rounded-md border">
      <Table>
        <TableHeader className="sticky top-0 bg-muted">
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Value 2</TableHead>
            <TableHead>Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentData.map((point) => (
            <TableRow key={point.timestamp}>
              <TableCell>{new Date(point.timestamp).toISOString()}</TableCell>
              <TableCell>{point.value.toFixed(2)}</TableCell>
              <TableCell>{point.value2.toFixed(2)}</TableCell>
              <TableCell>{point.category}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
