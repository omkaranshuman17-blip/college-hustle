import React, { useRef, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HomeIcon, 
  ClipboardDocumentCheckIcon, 
  PuzzlePieceIcon, 
  CalendarDaysIcon, 
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  ChatBubbleLeftRightIcon,
  BookOpenIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { useAuthStore } from '../store/authStore';
import ThemeToggle from './ThemeToggle';
import useNavigationPerfmon from '../hooks/useNavigationPerfmon';
import '../styles/electric-beam.css';

const NavigationUpgraded: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const {
    startRenderTimer,
    endRenderTimer,
    startInteractionTimer,
    endInteractionTimer
  } = useNavigationPerfmon();

  // Refs for the electric beam navigation
  const navRef = useRef<HTMLElement>(null);
  const activeElementRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { path: '/dashboard', icon: HomeIcon, label: 'Dashboard' },
    { path: '/assessments', icon: ClipboardDocumentCheckIcon, label: 'Assessments' },
    { path: '/games', icon: PuzzlePieceIcon, label: 'Games' },
    { path: '/resources', icon: BookOpenIcon, label: 'Resources' },
    { path: '/support', icon: UserGroupIcon, label: 'Peer Support' },
    { path: '/tasks', icon: CalendarDaysIcon, label: 'Daily Tasks' },
    { path: '/chatbot', icon: ChatBubbleLeftRightIcon, label: 'CapyChat AI' },
    { path: '/profile', icon: UserCircleIcon, label: 'Profile' },
  ];

  const animateElectricBeam = useCallback(() => {
    const activeElement = activeElementRef.current;
    if (!activeElement) return;
    
    activeElement.style.animation = 'none';
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    activeElement.offsetHeight; // Force reflow
    activeElement.style.animation = 'electricBeam 0.6s ease-out';
  }, []);

  // Handle navigation clicks with performance monitoring
  const handleNavClick = useCallback((path: string, e: React.MouseEvent) => {
    startInteractionTimer();
    
    // Prevent default link behavior to handle navigation manually
    e.preventDefault();
    
    // Trigger electric beam animation
    animateElectricBeam();
    
    // Navigate and end interaction timer
    navigate(path);
    
    // End interaction timer after a short delay to capture navigation response
    setTimeout(() => {
      endInteractionTimer('navigation');
    }, 0);
  }, [navigate, startInteractionTimer, endInteractionTimer, animateElectricBeam]);

  // Update active element position
  useEffect(() => {
    if (navRef.current && activeElementRef.current) {
      const activeButton = navRef.current.querySelector('.active button') as HTMLElement;
      if (activeButton) {
        const navRect = navRef.current.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();
        const relativeLeft = buttonRect.left - navRect.left;
        const buttonWidth = buttonRect.width;
        
        const activeElement = activeElementRef.current;
        activeElement.style.left = `${relativeLeft}px`;
        activeElement.style.width = `${buttonWidth}px`;
        activeElement.style.opacity = '0.7';
        activeElement.style.display = 'block';
        activeElement.style.background = 'linear-gradient(90deg, transparent, #00fffc, transparent)';
        activeElement.style.boxShadow = '0 0 8px #00fffc, inset 0 0 4px #ffffff';
      }
    }
  }, [location.pathname]);


  // Initialize electric beam for current route
  useEffect(() => {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      if (activeElementRef.current) {
        activeElementRef.current.style.opacity = '0.7';
        activeElementRef.current.style.display = 'block';
      }
    }, 100);
  }, []);

  // Performance monitoring for component lifecycle
  useEffect(() => {
    startRenderTimer();
    
    // Use requestAnimationFrame to measure after render
    requestAnimationFrame(() => {
      endRenderTimer();
    });
  }, [location.pathname, startRenderTimer, endRenderTimer]);


  return (
    <>
      {/* Main Navigation - Two Lines */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-gradient-to-r from-slate-900/95 via-black/98 to-slate-900/95 shadow-2xl border-b border-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20"
        style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(0, 0, 0, 0.98) 50%, rgba(15, 23, 42, 0.95) 100%)',
          borderBottom: '1px solid rgba(6, 182, 212, 0.3)',
          boxShadow: '0 4px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(6, 182, 212, 0.1)',
          height: '120px' // Two lines: 64px + 56px
        }}
      >
        <div className="max-w-7xl mx-auto px-8">
          {/* First Line: Logo and User Info */}
          <div className="flex justify-between items-center h-16 border-b border-cyan-500/20">
            {/* Enhanced Logo */}
            <Link to="/dashboard" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                className="relative w-10 h-10 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-cyan-500/25 transition-all duration-300"
                style={{
                  boxShadow: '0 4px 15px rgba(6, 182, 212, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                <span className="text-white font-black text-lg drop-shadow-md">CH</span>
              </motion.div>
              <div className="flex flex-col">
                <span className="font-black text-lg text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-blue-200 leading-tight">
                  College Hustle
                </span>
                <span className="text-xs text-cyan-300/70 leading-tight font-medium">
                  Your mental health matters
                </span>
              </div>
            </Link>

            {/* User Section */}
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <div className="text-right">
                <p className="text-sm font-medium text-white">{user?.username}</p>
                <p className="text-xs text-gray-300">
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
            <nav ref={navRef} className="electric-nav relative z-10">
              <ul className="flex gap-4 sm:gap-6 lg:gap-8 m-0 p-0 list-none">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <li key={item.path} className={isActive ? 'active' : ''}>
                      <Link to={item.path}>
                        <button 
                          onClick={(e) => handleNavClick(item.path, e)}
                          className="flex items-center gap-1 sm:gap-2 bg-transparent border-none cursor-pointer p-2 m-0 font-inter font-semibold text-sm leading-4 text-white transition-colors duration-250 hover:text-gray-400 rounded-lg hover:bg-white/5"
                          style={{
                            color: isActive ? '#00fffc' : undefined
                          }}
                        >
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span className="hidden sm:inline text-xs sm:text-sm">{item.label}</span>
                        </button>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              
              {/* Active Element for Electric Beam */}
              <div 
                ref={activeElementRef}
                className="active-element absolute left-0 h-1 w-8 rounded-full opacity-0"
                style={{
                  bottom: '-6px',
                  background: 'linear-gradient(90deg, transparent, #00fffc, transparent)',
                  boxShadow: '0 0 8px #00fffc, inset 0 0 4px #ffffff',
                  '--active-element-scale-x': 1,
                  '--active-element-scale-y': 1,
                  '--active-element-show': 0,
                  '--active-element-opacity': 0,
                  '--active-element-width': '0px',
                  '--active-element-strike-x': '0%',
                  '--active-element-mask-position': '0%',
                } as React.CSSProperties}
              />
            </nav>
          </div>
        </div>
      </motion.div>

      {/* Mobile Navigation - Bottom Tab Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-cyan-500/20 z-50">
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
                    isActive ? 'text-cyan-400' : 'text-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5 mb-1" />
                  <span className="text-xs truncate max-w-full">
                    {item.label.split(' ')[0]} {/* Show only first word on mobile */}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="mobileActiveTab"
                      className="w-4 h-0.5 bg-cyan-400 rounded-full mt-1"
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
    </>
  );
};

export default NavigationUpgraded;
