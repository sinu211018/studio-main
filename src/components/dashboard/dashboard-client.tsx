'use client';

import { useData } from '@/components/providers/DataProvider';
import { BarChart, LineChart as LineChartIcon, Table as TableIcon, ScatterChart as ScatterIcon, AreaChart as HeatmapIcon } from 'lucide-react';
import LineChart from '@/components/charts/LineChart';
import BarChartComponent from '@/components/charts/BarChart';
import ScatterPlot from '@/components/charts/ScatterPlot';
import Heatmap from '@/components/charts/Heatmap';
import { FilterPanel } from '@/components/controls/FilterPanel';
import { PerformanceMonitor } from '@/components/ui/PerformanceMonitor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/components/ui/DataTable';

export function DashboardClient() {
  const { aggregatedData, isPending } = useData();
  const chartHeight = "h-[400px] lg:h-[500px]";

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <header className="flex h-16 shrink-0 items-center border-b border-border bg-primary px-4 text-primary-foreground md:px-6">
        <h1 className="mr-4 text-xl font-bold tracking-tight">VizFlow</h1>
        <div className="flex-1">
          <FilterPanel />
        </div>
        <PerformanceMonitor />
      </header>
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <Tabs defaultValue="line" className="w-full">
          <TabsList className="mb-4 grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="line"><LineChartIcon className="mr-2 h-4 w-4" />Line Chart</TabsTrigger>
            <TabsTrigger value="bar"><BarChart className="mr-2 h-4 w-4" />Bar Chart</TabsTrigger>
            <TabsTrigger value="scatter"><ScatterIcon className="mr-2 h-4 w-4" />Scatter Plot</TabsTrigger>
            <TabsTrigger value="heatmap"><HeatmapIcon className="mr-2 h-4 w-4" />Heatmap</TabsTrigger>
            <TabsTrigger value="data"><TableIcon className="mr-2 h-4 w-4" />Raw Data</TabsTrigger>
          </TabsList>
          <div className={`transition-opacity duration-300 ${isPending ? 'opacity-50' : 'opacity-100'}`}>
            <TabsContent value="line">
              <Card>
                <CardHeader>
                  <CardTitle>Real-time Value Over Time</CardTitle>
                </CardHeader>
                <CardContent className={`${chartHeight} w-full p-0`}>
                  <LineChart data={aggregatedData} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="bar">
              <Card>
                <CardHeader>
                  <CardTitle>Value Distribution by Category</CardTitle>
                </CardHeader>
                <CardContent className={`${chartHeight} w-full p-0`}>
                  <BarChartComponent data={aggregatedData} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="scatter">
              <Card>
                <CardHeader>
                  <CardTitle>Value vs. Value2 Correlation</CardTitle>
                </CardHeader>
                <CardContent className={`${chartHeight} w-full p-0`}>
                  <ScatterPlot data={aggregatedData} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="heatmap">
                <Card>
                    <CardHeader>
                        <CardTitle>Data Point Density</CardTitle>
                    </CardHeader>
                    <CardContent className={`${chartHeight} w-full p-0`}>
                        <Heatmap data={aggregatedData} />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="data">
              <Card>
                <CardHeader>
                  <CardTitle>Raw Data Table</CardTitle>
                </CardHeader>
                <CardContent>
                  <DataTable data={aggregatedData} />
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
}
