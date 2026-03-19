import { useEffect, useRef, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

interface NavigationMetrics {
  routeChangeTime: number;
  componentRenderTime: number;
  userInteractionResponseTime: number;
  totalNavigationTime: number;
  routeChangeCount: number;
  averageRouteChangeTime: number;
  lastRouteChange: string;
  currentRoute: string;
}

interface PerformanceEntry {
  timestamp: number;
  route: string;
  metric: string;
  value: number;
  details?: any;
}

export const useNavigationPerfmon = () => {
  const location = useLocation();
  const [metrics, setMetrics] = useState<NavigationMetrics>({
    routeChangeTime: 0,
    componentRenderTime: 0,
    userInteractionResponseTime: 0,
    totalNavigationTime: 0,
    routeChangeCount: 0,
    averageRouteChangeTime: 0,
    lastRouteChange: '',
    currentRoute: location.pathname,
  });
  
  const [performanceLog, setPerformanceLog] = useState<PerformanceEntry[]>([]);
  const routeChangeStartTime = useRef<number>(0);
  const renderStartTime = useRef<number>(0);
  const interactionStartTime = useRef<number>(0);
  const totalRouteChangeTimes = useRef<number[]>([]);

  // Performance utility functions
  const startRouteChangeTimer = useCallback(() => {
    routeChangeStartTime.current = performance.now();
  }, []);

  const endRouteChangeTimer = useCallback(() => {
    if (routeChangeStartTime.current > 0) {
      const changeTime = performance.now() - routeChangeStartTime.current;
      totalRouteChangeTimes.current.push(changeTime);
      
      const entry: PerformanceEntry = {
        timestamp: Date.now(),
        route: location.pathname,
        metric: 'routeChange',
        value: changeTime,
      };
      
      setPerformanceLog(prev => [...prev.slice(-49), entry]); // Keep last 50 entries
      
      setMetrics(prev => ({
        ...prev,
        routeChangeTime: changeTime,
        routeChangeCount: prev.routeChangeCount + 1,
        averageRouteChangeTime: totalRouteChangeTimes.current.reduce((a, b) => a + b, 0) / totalRouteChangeTimes.current.length,
        lastRouteChange: prev.currentRoute,
        currentRoute: location.pathname,
      }));
      
      routeChangeStartTime.current = 0;
    }
  }, [location.pathname]);

  const startRenderTimer = useCallback(() => {
    renderStartTime.current = performance.now();
  }, []);

  const endRenderTimer = useCallback(() => {
    if (renderStartTime.current > 0) {
      const renderTime = performance.now() - renderStartTime.current;
      
      const entry: PerformanceEntry = {
        timestamp: Date.now(),
        route: location.pathname,
        metric: 'componentRender',
        value: renderTime,
      };
      
      setPerformanceLog(prev => [...prev.slice(-49), entry]);
      setMetrics(prev => ({ ...prev, componentRenderTime: renderTime }));
      renderStartTime.current = 0;
    }
  }, [location.pathname]);

  const startInteractionTimer = useCallback(() => {
    interactionStartTime.current = performance.now();
  }, []);

  const endInteractionTimer = useCallback((interactionType: string = 'click') => {
    if (interactionStartTime.current > 0) {
      const responseTime = performance.now() - interactionStartTime.current;
      
      const entry: PerformanceEntry = {
        timestamp: Date.now(),
        route: location.pathname,
        metric: 'userInteraction',
        value: responseTime,
        details: { type: interactionType },
      };
      
      setPerformanceLog(prev => [...prev.slice(-49), entry]);
      setMetrics(prev => ({ ...prev, userInteractionResponseTime: responseTime }));
      interactionStartTime.current = 0;
    }
  }, [location.pathname]);

  // Web Vitals integration
  const measureWebVitals = useCallback(() => {
    if ('performance' in window && 'PerformanceObserver' in window) {
      // Measure Largest Contentful Paint (LCP)
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'largest-contentful-paint') {
            const perfEntry: PerformanceEntry = {
              timestamp: Date.now(),
              route: location.pathname,
              metric: 'LCP',
              value: entry.startTime,
            };
            setPerformanceLog(prev => [...prev.slice(-49), perfEntry]);
          }
        });
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      
      // Measure Cumulative Layout Shift (CLS)
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        
        if (clsValue > 0) {
          const perfEntry: PerformanceEntry = {
            timestamp: Date.now(),
            route: location.pathname,
            metric: 'CLS',
            value: clsValue,
          };
          setPerformanceLog(prev => [...prev.slice(-49), perfEntry]);
        }
      });
      
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      
      return () => {
        observer.disconnect();
        clsObserver.disconnect();
      };
    }
  }, [location.pathname]);

  // Route change effect
  useEffect(() => {
    startRouteChangeTimer();
    
    // Measure total navigation time including async operations
    const totalStartTime = performance.now();
    
    const timeoutId = setTimeout(() => {
      endRouteChangeTimer();
      const totalTime = performance.now() - totalStartTime;
      setMetrics(prev => ({ ...prev, totalNavigationTime: totalTime }));
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [location.pathname, startRouteChangeTimer, endRouteChangeTimer]);

  // Initialize Web Vitals monitoring
  useEffect(() => {
    const cleanup = measureWebVitals();
    return cleanup;
  }, [measureWebVitals]);

  const getNavigationReport = useCallback(() => {
    const recentEntries = performanceLog.slice(-10);
    const averageRenderTime = performanceLog
      .filter(entry => entry.metric === 'componentRender')
      .slice(-10)
      .reduce((acc, entry) => acc + entry.value, 0) / 10 || 0;
    
    const averageInteractionTime = performanceLog
      .filter(entry => entry.metric === 'userInteraction')
      .slice(-10)
      .reduce((acc, entry) => acc + entry.value, 0) / 10 || 0;

    return {
      current: metrics,
      averages: {
        renderTime: averageRenderTime,
        interactionTime: averageInteractionTime,
      },
      recentEntries,
      recommendations: generateRecommendations(metrics, averageRenderTime, averageInteractionTime),
    };
  }, [metrics, performanceLog]);

  const generateRecommendations = (
    currentMetrics: NavigationMetrics,
    avgRender: number,
    avgInteraction: number
  ): string[] => {
    const recommendations: string[] = [];
    
    if (currentMetrics.routeChangeTime > 100) {
      recommendations.push('Route changes are slow. Consider code splitting or lazy loading.');
    }
    
    if (avgRender > 16) {
      recommendations.push('Component rendering is affecting 60fps. Consider React.memo or useMemo.');
    }
    
    if (avgInteraction > 50) {
      recommendations.push('User interactions have noticeable delay. Check event handlers.');
    }
    
    if (currentMetrics.totalNavigationTime > 200) {
      recommendations.push('Total navigation time is high. Review async operations and data fetching.');
    }
    
    return recommendations;
  };

  const clearPerformanceLog = useCallback(() => {
    setPerformanceLog([]);
    totalRouteChangeTimes.current = [];
    setMetrics(prev => ({
      ...prev,
      routeChangeCount: 0,
      averageRouteChangeTime: 0,
    }));
  }, []);

  return {
    metrics,
    performanceLog,
    startRenderTimer,
    endRenderTimer,
    startInteractionTimer,
    endInteractionTimer,
    getNavigationReport,
    clearPerformanceLog,
  };
};

export default useNavigationPerfmon;
