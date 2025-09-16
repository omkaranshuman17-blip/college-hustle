import React from 'react';
import { motion } from 'framer-motion';

interface DuckMascotProps {
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
  className?: string;
}

const DuckMascot: React.FC<DuckMascotProps> = ({ 
  size = 'medium', 
  animated = true,
  className = ''
}) => {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-32 h-32',
    large: 'w-48 h-48'
  };

  const duckComponent = (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${sizeClasses[size]} ${className}`}
    >
      {/* Duck body */}
      <ellipse
        cx="100"
        cy="120"
        rx="45"
        ry="50"
        fill="white"
        stroke="#e0f2fe"
        strokeWidth="2"
      />
      
      {/* Duck head */}
      <circle
        cx="100"
        cy="75"
        r="35"
        fill="white"
        stroke="#e0f2fe"
        strokeWidth="2"
      />
      
      {/* Duck beak */}
      <path
        d="M 70 75 L 60 80 L 70 85 Z"
        fill="#fbbf24"
        stroke="#f59e0b"
        strokeWidth="1"
      />
      
      {/* Duck eyes */}
      <circle cx="90" cy="70" r="3" fill="#1f2937" />
      <circle cx="110" cy="70" r="3" fill="#1f2937" />
      <circle cx="91" cy="69" r="1" fill="white" />
      <circle cx="111" cy="69" r="1" fill="white" />
      
      {/* Cute blush */}
      <ellipse cx="85" cy="82" rx="8" ry="5" fill="#fecaca" opacity="0.5" />
      <ellipse cx="115" cy="82" rx="8" ry="5" fill="#fecaca" opacity="0.5" />
      
      {/* Wings */}
      <ellipse
        cx="65"
        cy="115"
        rx="15"
        ry="25"
        fill="#f0f9ff"
        stroke="#e0f2fe"
        strokeWidth="1"
        transform="rotate(-20 65 115)"
      />
      <ellipse
        cx="135"
        cy="115"
        rx="15"
        ry="25"
        fill="#f0f9ff"
        stroke="#e0f2fe"
        strokeWidth="1"
        transform="rotate(20 135 115)"
      />
      
      {/* Meditation headband (optional cute detail) */}
      <rect x="65" y="55" width="70" height="8" rx="4" fill="#a5f3fc" opacity="0.7" />
      <circle cx="100" cy="59" r="3" fill="#06b6d4" />
    </svg>
  );

  if (animated) {
    return (
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {duckComponent}
      </motion.div>
    );
  }

  return duckComponent;
};

export default DuckMascot;
