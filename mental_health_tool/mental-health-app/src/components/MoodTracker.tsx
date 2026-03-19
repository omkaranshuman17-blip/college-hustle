import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MoodTrackerProps {
  className?: string;
}

const MoodTracker: React.FC<MoodTrackerProps> = ({ className = '' }) => {
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [cycleCount, setCycleCount] = useState(0);
  const [isBreathing, setIsBreathing] = useState(false);
  const [moodScore, setMoodScore] = useState(75);

  useEffect(() => {
    if (!isBreathing) return;

    const breathingCycle = () => {
      // Inhale for 4 seconds
      setBreathPhase('inhale');
      setTimeout(() => {
        // Hold for 4 seconds
        setBreathPhase('hold');
        setTimeout(() => {
          // Exhale for 6 seconds
          setBreathPhase('exhale');
          setTimeout(() => {
            setCycleCount(prev => prev + 1);
            if (cycleCount < 3) {
              breathingCycle();
            } else {
              setIsBreathing(false);
              setCycleCount(0);
            }
          }, 6000);
        }, 4000);
      }, 4000);
    };

    breathingCycle();
  }, [isBreathing, cycleCount]);

  const breathingMessages = {
    inhale: 'Inhale slowly...',
    hold: 'Hold...',
    exhale: 'Exhale gently...'
  };

  const moodColors = {
    low: 'from-meditation-ocean-600 to-meditation-ocean-700',
    medium: 'from-meditation-teal-500 to-meditation-aqua-500',
    high: 'from-meditation-sky-400 to-meditation-teal-400'
  };

  const getMoodColor = () => {
    if (moodScore < 40) return moodColors.low;
    if (moodScore < 70) return moodColors.medium;
    return moodColors.high;
  };

  return (
    <div className={`relative ${className}`}>
      {/* Mood Score Circle */}
      <div className="flex flex-col items-center justify-center">
        <motion.div
          className={`relative w-48 h-48 rounded-full bg-gradient-to-br ${getMoodColor()} shadow-2xl flex items-center justify-center`}
          animate={{
            scale: isBreathing ? 
              (breathPhase === 'inhale' ? [1, 1.1] : 
               breathPhase === 'hold' ? 1.1 : 
               [1.1, 1]) : 1
          }}
          transition={{
            duration: breathPhase === 'inhale' ? 4 : 
                     breathPhase === 'hold' ? 4 : 6,
            ease: "easeInOut"
          }}
        >
          {/* Inner circle with percentage */}
          <div className="absolute inset-4 rounded-full bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-meditation-ocean-700">
              {moodScore}%
            </div>
            <div className="text-sm text-meditation-teal-600 font-medium">
              Feeling Good
            </div>
          </div>

          {/* Breathing indicator ring */}
          {isBreathing && (
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-white/30"
              animate={{
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.div>

        {/* Breathing Text */}
        <AnimatePresence mode="wait">
          {isBreathing && (
            <motion.div
              key={breathPhase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-8 text-center"
            >
              <p className="text-xl font-medium text-meditation-ocean-600">
                {breathingMessages[breathPhase]}
              </p>
              <p className="text-sm text-meditation-teal-500 mt-2">
                Cycle {cycleCount + 1} of 4
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Start Breathing Button */}
        {!isBreathing && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsBreathing(true)}
            className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-meditation-sky-400 to-meditation-teal-500 text-white font-medium shadow-lg hover:shadow-xl transition-all"
          >
            Start Breathing Exercise
          </motion.button>
        )}

        {/* Mood Adjustment Buttons */}
        <div className="mt-6 flex items-center space-x-4">
          <button
            onClick={() => setMoodScore(Math.max(0, moodScore - 5))}
            className="p-2 rounded-full bg-meditation-ocean-100 hover:bg-meditation-ocean-200 transition-colors"
          >
            <svg className="w-6 h-6 text-meditation-ocean-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <span className="text-meditation-ocean-600 font-medium">Adjust Mood</span>
          <button
            onClick={() => setMoodScore(Math.min(100, moodScore + 5))}
            className="p-2 rounded-full bg-meditation-ocean-100 hover:bg-meditation-ocean-200 transition-colors"
          >
            <svg className="w-6 h-6 text-meditation-ocean-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
