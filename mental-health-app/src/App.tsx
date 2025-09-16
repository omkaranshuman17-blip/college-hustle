import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Assessments from './pages/Assessments';
import Games from './pages/Games';
import Tasks from './pages/Tasks';
import Profile from './pages/Profile';
import Chatbot from './components/Chatbot';
import NavigationUpgraded from './components/NavigationUpgraded';
import PerformanceDashboard from './components/PerformanceDashboard';
import { useAuthStore } from './store/authStore';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import useNavigationPerfmon from './hooks/useNavigationPerfmon';
import './App.css';

interface RouterContentProps {
  isAuthenticated: boolean;
  isDarkMode: boolean;
  showPerfDashboard: boolean;
  setShowPerfDashboard: (show: boolean) => void;
}

const RouterContent: React.FC<RouterContentProps> = ({
  isAuthenticated,
  isDarkMode,
  showPerfDashboard,
  setShowPerfDashboard
}) => {
  const {
    startRenderTimer,
    endRenderTimer,
  } = useNavigationPerfmon();

  // Monitor app-level performance
  useEffect(() => {
    startRenderTimer();
    
    // Measure app render completion
    const timeoutId = setTimeout(() => {
      endRenderTimer();
    }, 0);
    
    return () => clearTimeout(timeoutId);
  }, [isAuthenticated, startRenderTimer, endRenderTimer]);

  return (
    <div className="min-h-screen transition-all duration-300">
      <AnimatePresence mode="wait">
        {isAuthenticated && <NavigationUpgraded />}
      </AnimatePresence>
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={isAuthenticated ? 'pt-32 pb-16 md:pb-0' : ''}
      >
        <Routes>
          <Route path="/" element={!isAuthenticated ? <Landing /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/assessments" element={isAuthenticated ? <Assessments /> : <Navigate to="/" />} />
          <Route path="/games" element={isAuthenticated ? <Games /> : <Navigate to="/" />} />
          <Route path="/tasks" element={isAuthenticated ? <Tasks /> : <Navigate to="/" />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/" />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </motion.main>
      
      {/* Performance Dashboard - only show in development or when explicitly enabled */}
      {(process.env.NODE_ENV === 'development' || showPerfDashboard) && (
        <PerformanceDashboard
          isVisible={showPerfDashboard}
          onToggle={() => setShowPerfDashboard(!showPerfDashboard)}
        />
      )}
    </div>
  );
};

const AppContent: React.FC = () => {
  const { isAuthenticated, checkAuth } = useAuthStore();
  const { isDarkMode } = useTheme();
  const [showPerfDashboard, setShowPerfDashboard] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Router>
      <RouterContent 
        isAuthenticated={isAuthenticated}
        isDarkMode={isDarkMode}
        showPerfDashboard={showPerfDashboard}
        setShowPerfDashboard={setShowPerfDashboard}
      />
    </Router>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
