import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CapybaraMascot from './CapybaraMascot';

interface FeatureCardProps {
  title: string;
  subtitle: string;
  description: string;
  backgroundGradient: string;
  textColor: string;
  link: string;
  mascotMood?: 'happy' | 'calm' | 'sleeping' | 'excited' | 'meditate' | 'confused' | 'lazy' | 'studying' | 'waiting' | 'leaving' | 'okay' | 'tired' | 'flying' | 'enjoying' | 'rainy' | 'nonchalant' | 'stunned' | 'curious' | 'merchant' | 'tourist';
  icon?: React.ReactNode;
  children?: React.ReactNode;
  quabbleStyle?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  subtitle,
  description,
  backgroundGradient,
  textColor,
  link,
  mascotMood = 'happy',
  icon,
  children,
  quabbleStyle = true
}) => {
  const [isHovered, setIsHovered] = useState(false);
  // Quabble-style bounce effect
  const cardVariants = {
    initial: { opacity: 0, y: 20, rotate: 0 },
    animate: {
      opacity: 1,
      y: 0
    },
    hover: quabbleStyle ? {
      scale: 1.03,
      y: -8,
      rotate: [-1, 1]
    } : {
      scale: 1.02,
      y: -5
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      variants={cardVariants}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={link} className="block h-full">
        <div className={`${backgroundGradient} rounded-3xl p-6 h-full min-h-[300px] relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300`}>
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.3) 0%, transparent 50%),
                               radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)`
            }} />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col">
            
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className={`text-2xl font-bold ${textColor} mb-1`}>
                  {title}
                </h3>
                <p className={`text-sm ${textColor} opacity-90`}>
                  {subtitle}
                </p>
              </div>
              
              {/* Icon or Mascot with Quabble interactions */}
              <div className="ml-4 flex-shrink-0">
                {icon || (
                  <CapybaraMascot 
                    mood={mascotMood} 
                    size="small" 
                    className="w-16 h-16" 
                    interactive={quabbleStyle}
                    animated={true}
                  />
                )}
              </div>
            </div>

            {/* Description */}
            <p className={`${textColor} opacity-80 mb-6 flex-1`}>
              {description}
            </p>

            {/* Custom Content */}
            {children && (
              <div className="mb-4">
                {children}
              </div>
            )}

            {/* Footer */}
            <div className="mt-auto">
              <motion.div
                whileHover={{ x: 5 }}
                className={`flex items-center ${textColor} font-medium`}
              >
                <span>Get Started</span>
                <svg 
                  className="w-5 h-5 ml-2 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.div>
            </div>
          </div>

          {/* Quabble-style floating elements */}
          {quabbleStyle && (
            <>
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full opacity-60"
                style={{ 
                  background: 'radial-gradient(circle, #f9d23f 0%, transparent 70%)',
                  filter: isHovered ? 'blur(0px)' : 'blur(2px)'
                }}
              />
              
              <motion.div
                animate={{ 
                  y: [0, 12, 0],
                  x: [0, 5, 0],
                  rotate: [0, -360]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute bottom-8 left-8 w-6 h-6 rounded-full opacity-50"
                style={{ 
                  background: 'radial-gradient(circle, #94a088 0%, transparent 70%)',
                  filter: isHovered ? 'blur(0px)' : 'blur(2px)'
                }}
              />

              {/* Extra Quabble sparkle on hover */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                >
                  <span className="text-4xl">✨</span>
                </motion.div>
              )}
            </>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default FeatureCard;
