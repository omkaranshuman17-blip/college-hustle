import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChartBarIcon, 
  ClockIcon, 
  CpuChipIcon, 
  EyeIcon,
  EyeSlashIcon,
  ArrowPathIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline';
import useNavigationPerfmon from '../hooks/useNavigationPerfmon';

interface PerformanceDashboardProps {
  isVisible?: boolean;
  onToggle?: () => void;
}

const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({ 
  isVisible = false, 
  onToggle 
}) => {
  const { 
    metrics, 
    performanceLog, 
    getNavigationReport, 
    clearPerformanceLog 
  } = useNavigationPerfmon();
  
  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(null);
  const [report, setReport] = useState(getNavigationReport());

  // Auto-refresh metrics every second
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setReport(getNavigationReport());
      }, 1000);
      setRefreshInterval(interval);
      
      return () => {
        if (interval) clearInterval(interval);
      };
    } else {
      if (refreshInterval) {
        clearInterval(refreshInterval);
        setRefreshInterval(null);
      }
    }
  }, [isVisible, getNavigationReport]);

  const getPerformanceScore = (value: number, thresholds: { good: number; fair: number }) => {
    if (value <= thresholds.good) return { score: 'excellent', color: 'text-green-400' };
    if (value <= thresholds.fair) return { score: 'good', color: 'text-yellow-400' };
    return { score: 'needs-improvement', color: 'text-red-400' };
  };

  const formatTime = (ms: number) => `${ms.toFixed(2)}ms`;

  if (!isVisible) {
    return (
      <motion.button
        onClick={onToggle}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-4 right-4 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <ChartBarIcon className="w-6 h-6" />
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 400, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 400, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-20 right-4 z-50 w-96 max-h-[80vh] overflow-auto bg-gray-900/95 backdrop-blur-xl border border-gray-700 rounded-xl shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <ChartBarIcon className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Navigation Performance</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={clearPerformanceLog}
              className="p-1 text-gray-400 hover:text-white transition-colors"
              title="Clear Performance Log"
            >
              <ArrowPathIcon className="w-4 h-4" />
            </button>
            <button
              onClick={onToggle}
              className="p-1 text-gray-400 hover:text-white transition-colors"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Current Metrics */}
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Route Change Time */}
            <div className="bg-gray-800/50 p-3 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <ClockIcon className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-gray-400">Route Change</span>
              </div>
              <div className={`text-lg font-mono ${getPerformanceScore(metrics.routeChangeTime, { good: 50, fair: 100 }).color}`}>
                {formatTime(metrics.routeChangeTime)}
              </div>
              <div className="text-xs text-gray-500">
                Avg: {formatTime(metrics.averageRouteChangeTime)}
              </div>
            </div>

            {/* Component Render Time */}
            <div className="bg-gray-800/50 p-3 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <CpuChipIcon className="w-4 h-4 text-green-400" />
                <span className="text-xs text-gray-400">Render Time</span>
              </div>
              <div className={`text-lg font-mono ${getPerformanceScore(metrics.componentRenderTime, { good: 16, fair: 33 }).color}`}>
                {formatTime(metrics.componentRenderTime)}
              </div>
              <div className="text-xs text-gray-500">
                Avg: {formatTime(report.averages.renderTime)}
              </div>
            </div>

            {/* User Interaction Response */}
            <div className="bg-gray-800/50 p-3 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <EyeIcon className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-gray-400">Interaction</span>
              </div>
              <div className={`text-lg font-mono ${getPerformanceScore(metrics.userInteractionResponseTime, { good: 50, fair: 100 }).color}`}>
                {formatTime(metrics.userInteractionResponseTime)}
              </div>
              <div className="text-xs text-gray-500">
                Avg: {formatTime(report.averages.interactionTime)}
              </div>
            </div>

            {/* Total Navigation Time */}
            <div className="bg-gray-800/50 p-3 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <ChartBarIcon className="w-4 h-4 text-orange-400" />
                <span className="text-xs text-gray-400">Total Time</span>
              </div>
              <div className={`text-lg font-mono ${getPerformanceScore(metrics.totalNavigationTime, { good: 100, fair: 200 }).color}`}>
                {formatTime(metrics.totalNavigationTime)}
              </div>
              <div className="text-xs text-gray-500">
                Changes: {metrics.routeChangeCount}
              </div>
            </div>
          </div>

          {/* Current Route */}
          <div className="bg-gray-800/50 p-3 rounded-lg">
            <div className="text-xs text-gray-400 mb-1">Current Route</div>
            <div className="text-sm font-mono text-white">{metrics.currentRoute}</div>
            {metrics.lastRouteChange && (
              <div className="text-xs text-gray-500 mt-1">
                Previous: {metrics.lastRouteChange}
              </div>
            )}
          </div>

          {/* Performance Recommendations */}
          {report.recommendations.length > 0 && (
            <div className="bg-yellow-900/20 border border-yellow-600/30 p-3 rounded-lg">
              <div className="text-xs text-yellow-400 mb-2">Recommendations</div>
              <ul className="space-y-1">
                {report.recommendations.map((recommendation, index) => (
                  <li key={index} className="text-xs text-yellow-200">
                    • {recommendation}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recent Performance Log */}
          <div className="bg-gray-800/50 p-3 rounded-lg">
            <div className="text-xs text-gray-400 mb-2">Recent Activity</div>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {report.recentEntries.slice().reverse().map((entry, index) => {
                const time = new Date(entry.timestamp).toLocaleTimeString();
                const color = entry.metric === 'routeChange' ? 'text-blue-300' :
                             entry.metric === 'componentRender' ? 'text-green-300' :
                             entry.metric === 'userInteraction' ? 'text-purple-300' :
                             entry.metric === 'LCP' ? 'text-orange-300' :
                             'text-gray-300';
                
                return (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <span className={color}>
                      {entry.metric}
                      {entry.details?.type && ` (${entry.details.type})`}
                    </span>
                    <div className="flex space-x-2">
                      <span className="text-gray-400">{formatTime(entry.value)}</span>
                      <span className="text-gray-500">{time}</span>
                    </div>
                  </div>
                );
              })}
              {report.recentEntries.length === 0 && (
                <div className="text-xs text-gray-500 text-center py-2">
                  No activity recorded yet
                </div>
              )}
            </div>
          </div>

          {/* Performance Score */}
          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-600/30 p-3 rounded-lg">
            <div className="text-xs text-blue-400 mb-2">Overall Performance</div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-white">
                Navigation Score: {
                  metrics.averageRouteChangeTime <= 50 && report.averages.renderTime <= 16 
                    ? '🟢 Excellent'
                    : metrics.averageRouteChangeTime <= 100 && report.averages.renderTime <= 33
                    ? '🟡 Good' 
                    : '🔴 Needs Work'
                }
              </div>
              <div className="text-xs text-gray-400">
                {performanceLog.length} entries logged
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PerformanceDashboard;
