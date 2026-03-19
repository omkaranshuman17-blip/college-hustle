import React, { useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HomeIcon, 
  ClipboardDocumentCheckIcon, 
  PuzzlePieceIcon, 
  CalendarDaysIcon, 
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import { useAuthStore } from '../store/authStore';
import ThemeToggle from './ThemeToggle';
import useNavigationPerfmon from '../hooks/useNavigationPerfmon';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const {
    startRenderTimer,
    endRenderTimer,
    startInteractionTimer,
    endInteractionTimer
  } = useNavigationPerfmon();

  const navItems = [
    { path: '/dashboard', icon: HomeIcon, label: 'Dashboard' },
    { path: '/assessments', icon: ClipboardDocumentCheckIcon, label: 'Assessments' },
    { path: '/games', icon: PuzzlePieceIcon, label: 'Games' },
    { path: '/tasks', icon: CalendarDaysIcon, label: 'Daily Tasks' },
    { path: '/chatbot', icon: ChatBubbleLeftRightIcon, label: 'AI Support' },
    { path: '/profile', icon: UserCircleIcon, label: 'Profile' },
  ];

  // Handle navigation clicks with performance monitoring
  const handleNavClick = useCallback((path: string, e: React.MouseEvent) => {
    startInteractionTimer();
    
    // Navigate and measure interaction time
    setTimeout(() => {
      endInteractionTimer('navigation');
    }, 0);
  }, [startInteractionTimer, endInteractionTimer]);

  // Performance monitoring for component lifecycle
  useEffect(() => {
    startRenderTimer();
    
    // Use requestAnimationFrame to measure after render
    requestAnimationFrame(() => {
      endRenderTimer();
    });
  }, [location.pathname, startRenderTimer, endRenderTimer]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black shadow-lg border-b border-gray-800"
      style={{ height: '120px' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* First Line: Logo and User Info */}
        <div className="flex justify-between items-center h-16 border-b border-gray-800/50">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-quabble-yellow-500 rounded-xl flex items-center justify-center"
            >
              <span className="text-black font-bold text-lg">CH</span>
            </motion.div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-white leading-tight">
                College Hustle
              </span>
              <span className="text-xs text-gray-400 leading-tight">
                Your mental health matters
              </span>
            </div>
          </Link>

          {/* User Info & Controls */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <div className="text-right">
              <p className="text-sm font-medium text-white">{user?.username}</p>
              <p className="text-xs text-gray-200">
                {user?.totalPoints || 0}pts • {user?.streakCount || 0}🔥
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="p-2 rounded-lg bg-red-500/80 text-white hover:bg-red-600 transition-all"
            >
              <ArrowRightOnRectangleIcon className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Second Line: Navigation Items */}
        <div className="h-14 flex items-center justify-center">
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={(e) => handleNavClick(item.path, e)}
                  className="relative px-2 py-2 rounded-lg transition-all"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-1 sm:gap-2 px-2 py-1 rounded-lg transition-all ${
                      isActive 
                        ? 'text-white' 
                        : 'text-gray-200 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline font-medium text-xs sm:text-sm">{item.label}</span>
                  </motion.div>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-quabble-yellow-500 rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-gray-800 z-50">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={(e) => handleNavClick(item.path, e)}
                className="flex flex-col items-center p-2 min-w-0 flex-1"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex flex-col items-center ${
                    isActive 
                      ? 'text-quabble-yellow-500' 
                      : 'text-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5 mb-1" />
                  <span className="text-xs truncate max-w-full">
                    {item.label.split(' ')[0]}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="mobileActiveTabRegular"
                      className="w-4 h-0.5 bg-quabble-yellow-500 rounded-full mt-1"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
