import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CapybaraMascot from './CapybaraMascot';
import MoodTracker from './MoodTracker';
import { 
  HeartIcon, 
  SparklesIcon, 
  SunIcon,
  MoonIcon,
  CloudIcon 
} from '@heroicons/react/24/outline';

interface MeditationUIProps {
  username?: string;
}

const MeditationUI: React.FC<MeditationUIProps> = ({ username = 'Friend' }) => {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [moodLevel, setMoodLevel] = useState(75);

  const activities = [
    {
      id: 'breathe',
      icon: CloudIcon,
      label: 'Breathe',
      color: 'from-meditation-sky-400 to-meditation-aqua-400'
    },
    {
      id: 'meditate',
      icon: SunIcon,
      label: 'Meditate',
      color: 'from-meditation-teal-400 to-meditation-ocean-400'
    },
    {
      id: 'relax',
      icon: HeartIcon,
      label: 'Relax',
      color: 'from-meditation-aqua-400 to-meditation-teal-400'
    },
    {
      id: 'sleep',
      icon: MoonIcon,
      label: 'Sleep',
      color: 'from-meditation-ocean-500 to-meditation-ocean-600'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Soothing Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-meditation-sky-100 via-meditation-aqua-100 to-meditation-teal-100">
        <div className="absolute inset-0 bg-gradient-to-tr from-meditation-ocean-200/30 via-transparent to-meditation-sky-200/30" />
        
        {/* Animated floating bubbles */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 rounded-full bg-meditation-sky-300/20 blur-xl"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-meditation-teal-300/20 blur-xl"
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-meditation-aqua-300/20 blur-xl"
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-meditation-ocean-700 mb-2">
            Ease stress, anxiety & depression
          </h1>
          <p className="text-meditation-teal-600 text-lg">
            Welcome back, {username}
          </p>
        </motion.div>

        {/* Central Mascot and Mood Tracker */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative mb-8"
        >
          <div className="relative">
            {/* Glowing background circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-meditation-sky-200 to-meditation-teal-200 opacity-50 blur-2xl" />
            </div>
            
            {/* Capybara Mascot in center */}
            <div className="relative z-10 flex items-center justify-center">
              <div className="bg-white/80 backdrop-blur-md rounded-full p-8 shadow-2xl">
                <CapybaraMascot mood="calm" className="w-32 h-32" />
              </div>
            </div>

            {/* Mood percentage overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md rounded-full px-6 py-2 shadow-lg"
            >
              <div className="flex items-center space-x-2">
                <SparklesIcon className="w-5 h-5 text-meditation-teal-500" />
                <span className="text-meditation-ocean-700 font-semibold">{moodLevel}%</span>
                <span className="text-meditation-teal-600 text-sm">feeling good</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Breathing Instruction */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-8"
        >
          <p className="text-2xl font-medium text-meditation-ocean-600 mb-2">
            Inhale
          </p>
          <p className="text-meditation-teal-500">
            Take a deep breath and relax
          </p>
        </motion.div>

        {/* Activity Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl w-full"
        >
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <motion.button
                key={activity.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedActivity(activity.id)}
                className={`p-6 rounded-2xl bg-white/80 backdrop-blur-md shadow-lg hover:shadow-xl transition-all ${
                  selectedActivity === activity.id ? 'ring-2 ring-meditation-teal-400' : ''
                }`}
              >
                <div className={`w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br ${activity.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-meditation-ocean-700 font-medium">{activity.label}</p>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Bottom Navigation Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex space-x-2 mt-12"
        >
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === 0 
                  ? 'w-8 bg-meditation-teal-500' 
                  : 'bg-meditation-teal-300'
              }`}
            />
          ))}
        </motion.div>

        {/* Floating Action Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-meditation-sky-400 to-meditation-teal-500 shadow-2xl flex items-center justify-center"
        >
          <HeartIcon className="w-8 h-8 text-white" />
        </motion.button>
      </div>
    </div>
  );
};

export default MeditationUI;
