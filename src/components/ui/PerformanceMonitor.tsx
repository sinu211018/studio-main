'use client';

import { useState } from 'react';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useData } from '@/components/providers/DataProvider';
import { Loader2, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export function PerformanceMonitor() {
  const metrics = usePerformanceMonitor();
  const { data, aggregation } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const { toast } = useToast();

  // const handleOptimization = async () => {
  //   setIsLoading(true);
  //   setSuggestion(null);
  //   try {
  //     const result = await suggestDataAggregationOptimizations({
  //       fps: metrics.fps,
  //       memoryUsage: metrics.memoryUsage,
  //       dataPoints: data.length,
  //       aggregationLevel: aggregation === 'raw' ? '1min' : aggregation,
  //     });
  //     setSuggestion(result.optimizationSuggestion);
  //   } catch (error) {
  //     console.error('Error fetching optimization suggestion:', error);
  //     toast({
  //       variant: "destructive",
  //       title: "AI Suggestion Failed",
  //       description: "Could not get an optimization suggestion. Please try again.",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="ml-auto text-sm bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/20 hover:text-primary-foreground">
          <span>FPS: {metrics.fps}</span>
          <span className="mx-2 h-4 w-px bg-primary-foreground/20" />
          <span>Mem: {metrics.memoryUsage} MB</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Performance Insights</h4>
            <p className="text-sm text-muted-foreground">
              Analyze current performance and get AI-powered optimization tips.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-2 items-center gap-4">
              <div>FPS</div>
              <div className="text-right font-bold">{metrics.fps}</div>
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <div>Memory</div>
              <div className="text-right font-bold">{metrics.memoryUsage} MB</div>
            </div>
             <div className="grid grid-cols-2 items-center gap-4">
              <div>Data Points</div>
              <div className="text-right font-bold">{data.length.toLocaleString()}</div>
            </div>
          </div>
          <Button /* onClick={handleOptimization} */ disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-4 w-4" />
                Suggest Optimization
              </>
            )}
          </Button>
          {suggestion && (
            <Alert>
              <Zap className="h-4 w-4" />
              <AlertTitle>AI Suggestion</AlertTitle>
              <AlertDescription>
                {suggestion}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
