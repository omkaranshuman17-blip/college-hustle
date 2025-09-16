import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CapybaraMascotProps {
  className?: string;
  mood?: 'happy' | 'calm' | 'sleeping' | 'excited' | 'meditate' | 'confused' | 'lazy' | 'studying' | 'waiting' | 'leaving' | 'okay' | 'tired' | 'flying' | 'enjoying' | 'rainy' | 'nonchalant' | 'stunned' | 'curious' | 'merchant' | 'tourist';
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  animated?: boolean;
  onClick?: () => void;
  interactive?: boolean;
}

const CapybaraMascot: React.FC<CapybaraMascotProps> = ({
  className = '',
  mood = 'calm',
  size = 'medium',
  animated = true,
  onClick,
  interactive = false
}) => {
  const [currentMood, setCurrentMood] = useState(mood);
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32',
    xlarge: 'w-48 h-48'
  };

  // Comprehensive mood to image mapping using actual capybara assets
  const moodToImage: Record<string, string> = {
    happy: '/capybara/enjoying.png',
    calm: '/capybara/idle.png',
    sleeping: '/capybara/sleepy.png',
    excited: '/capybara/enjoying a lot.png',
    meditate: '/capybara/half asleep.png',
    confused: '/capybara/confused.png',
    lazy: '/capybara/lazy.png',
    studying: '/capybara/nerd.png',
    waiting: '/capybara/I am waiting.png',
    leaving: '/capybara/I am going away.png',
    okay: '/capybara/okay.png',
    tired: '/capybara/Its too late let me sleep.png',
    flying: '/capybara/fly.png',
    enjoying: '/capybara/enjoying.png',
    rainy: '/capybara/rainy.png',
    nonchalant: '/capybara/non chalant.png',
    stunned: '/capybara/stunned.png',
    curious: '/capybara/what you doing.png',
    merchant: '/capybara/merchant.png',
    tourist: '/capybara/tourist.png'
  };

  // Interactive mood changes on hover
  const hoverMoodMap: Record<string, string> = {
    calm: 'curious',
    happy: 'excited',
    sleeping: 'tired',
    meditate: 'calm',
    studying: 'confused'
  };

  useEffect(() => {
    setCurrentMood(mood);
  }, [mood]);

  const handleMouseEnter = () => {
    if (interactive && hoverMoodMap[mood]) {
      setCurrentMood(hoverMoodMap[mood] as any);
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setCurrentMood(mood);
      setIsHovered(false);
    }
  };

  // Quabble-style floating animation
  const animationProps = animated ? {
    animate: {
      y: [0, -8, 0],
      rotate: isHovered ? 5 : 0,
      scale: isHovered ? 1.1 : 1
    },
    transition: {
      y: {
        duration: 4,
        repeat: Infinity,
        ease: [0.42, 0, 0.58, 1] as any
      },
      rotate: {
        duration: 0.5,
        ease: [0, 0, 0.58, 1] as any
      },
      scale: {
        duration: 0.3,
        ease: [0.42, 0, 0.58, 1] as any
      }
    }
  } : {};

  // Quabble-style click animation
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const imageSrc = moodToImage[currentMood] || '/capybara/idle.png';

  return (
    <motion.div 
      className={`${sizeClasses[size]} ${className} ${interactive ? 'cursor-pointer' : ''} relative`}
      {...animationProps}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileHover={interactive ? { scale: 1.05 } : {}}
      whileTap={interactive ? { scale: 0.95 } : {}}
    >
      {/* Main capybara image */}
      <img
        src={imageSrc}
        alt={`Capybara - ${currentMood}`}
        className={`w-full h-full object-contain drop-shadow-xl transition-all duration-300 ${
          isHovered ? 'brightness-110' : ''
        }`}
        style={{
          filter: isHovered ? 'drop-shadow(0 10px 20px rgba(176, 133, 84, 0.3))' : ''
        }}
      />
      
      {/* Quabble-style mood indicator bubble */}
      {interactive && isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1 shadow-lg"
          style={{ backgroundColor: '#f9d23f' }}
        >
          <span className="text-xs">💭</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CapybaraMascot;
