import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircleIcon,
  ClockIcon,
  HeartIcon,
  SparklesIcon,
  SunIcon,
  MoonIcon,
  CloudIcon,
  StarIcon,
  FireIcon,
  GiftIcon,
  FaceSmileIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid';
import CapybaraMascot from '../components/CapybaraMascot';

interface DailyTask {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  duration: string;
  points: number;
  category: 'Morning' | 'Afternoon' | 'Evening' | 'Anytime';
  completed: boolean;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  emoji: string;
  pointsRequired: number;
  unlocked: boolean;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<DailyTask[]>([
    {
      id: 'morning-gratitude',
      title: 'Morning Gratitude',
      description: 'Write down 3 things you\'re grateful for today! Start your day with positivity ☀️',
      emoji: '🙏',
      color: 'from-cute-blue-400 to-cute-purple-400',
      duration: '5 min',
      points: 25,
      category: 'Morning',
      completed: true
    },
    {
      id: 'breathing-exercise',
      title: 'Breathing Break',
      description: 'Take 5 deep breaths and feel your stress melt away like morning mist 🌸',
      emoji: '🌸',
      color: 'from-cute-pink-400 to-cute-purple-500',
      duration: '3 min',
      points: 20,
      category: 'Anytime',
      completed: false
    },
    {
      id: 'mindful-walk',
      title: 'Mindful Steps',
      description: 'Take a short walk and notice 5 beautiful things around you 🌿',
      emoji: '🚶‍♀️',
      color: 'from-cute-blue-300 to-cute-pink-400',
      duration: '10 min',
      points: 35,
      category: 'Afternoon',
      completed: false
    },
    {
      id: 'kind-gesture',
      title: 'Spread Kindness',
      description: 'Do something nice for someone today. Even a smile counts! 💝',
      emoji: '💝',
      color: 'from-cute-pink-400 to-cute-purple-400',
      duration: '2 min',
      points: 30,
      category: 'Anytime',
      completed: false
    },
    {
      id: 'digital-detox',
      title: 'Phone-Free Time',
      description: 'Enjoy 30 minutes without your phone. Read, draw, or just daydream! 📚',
      emoji: '📱',
      color: 'from-cute-purple-400 to-cute-blue-500',
      duration: '30 min',
      points: 50,
      category: 'Evening',
      completed: false
    },
    {
      id: 'evening-reflection',
      title: 'Evening Reflection',
      description: 'Think about one positive thing that happened today before bed 🌙',
      emoji: '🌙',
      color: 'from-cute-purple-300 to-cute-blue-400',
      duration: '5 min',
      points: 25,
      category: 'Evening',
      completed: false
    }
  ]);

  const [userPoints, setUserPoints] = useState(2840);
  const [currentStreak, setCurrentStreak] = useState(7);

  const rewards: Reward[] = [
    {
      id: 'daily-champion',
      title: 'Daily Champion',
      description: 'Complete all tasks for 3 days in a row',
      emoji: '🏆',
      pointsRequired: 300,
      unlocked: true
    },
    {
      id: 'mindfulness-master',
      title: 'Mindfulness Master',
      description: 'Complete 50 mindfulness tasks',
      emoji: '🧘‍♀️',
      pointsRequired: 500,
      unlocked: false
    },
    {
      id: 'kindness-angel',
      title: 'Kindness Angel',
      description: 'Spread kindness 10 times',
      emoji: '👼',
      pointsRequired: 400,
      unlocked: false
    }
  ];

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const newCompleted = !task.completed;
        if (newCompleted) {
          setUserPoints(points => points + task.points);
        } else {
          setUserPoints(points => points - task.points);
        }
        return { ...task, completed: newCompleted };
      }
      return task;
    }));
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionPercentage = (completedTasks / totalTasks) * 100;

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Morning';
    if (hour < 17) return 'Afternoon';
    return 'Evening';
  };

  const currentTimeCategory = getTimeOfDay();

  const groupedTasks = {
    current: tasks.filter(task => task.category === currentTimeCategory || task.category === 'Anytime'),
    other: tasks.filter(task => task.category !== currentTimeCategory && task.category !== 'Anytime')
  };

  return (
    <div className="min-h-screen pt-8 pb-20 px-4 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Daily Wellness Tasks ✨🌸
          </h1>
          <div className="flex justify-center mb-4">
            <CapybaraMascot mood="happy" size="medium" className="w-20 h-20" />
          </div>
          <p className="text-white opacity-90 text-lg max-w-2xl mx-auto">
            Small steps, big smiles! Complete these cute tasks to boost your mental wellness.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Progress Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card-cute"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cute-pink-400 to-cute-purple-500 rounded-full mb-4">
                <CheckCircleIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Today's Progress</h3>
              <div className="text-3xl font-bold text-white mb-2">{completedTasks}/{totalTasks}</div>
              <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                <motion.div 
                  className="bg-gradient-to-r from-cute-pink-400 to-cute-purple-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <p className="text-sm text-gray-300">{Math.round(completionPercentage)}% complete</p>
            </div>
          </motion.div>

          {/* Streak Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card-cute"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mb-4">
                <FireIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Current Streak</h3>
              <div className="text-3xl font-bold text-white mb-2">{currentStreak} days</div>
              <p className="text-sm text-gray-300">Keep it going! 🔥</p>
            </div>
          </motion.div>

          {/* Points Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card-cute"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cute-blue-400 to-cute-purple-500 rounded-full mb-4">
                <StarIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Total Points</h3>
              <div className="text-3xl font-bold text-white mb-2">{userPoints}</div>
              <p className="text-sm text-gray-300">You're amazing! ⭐</p>
            </div>
          </motion.div>
        </div>

        {/* Current Time Tasks */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            {currentTimeCategory === 'Morning' && <SunIcon className="w-8 h-8 text-yellow-400 mr-3" />}
            {currentTimeCategory === 'Afternoon' && <SparklesIcon className="w-8 h-8 text-pink-400 mr-3" />}
            {currentTimeCategory === 'Evening' && <MoonIcon className="w-8 h-8 text-purple-400 mr-3" />}
            {currentTimeCategory} Wellness
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {groupedTasks.current.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                className={`card-cute cursor-pointer relative overflow-hidden transition-all duration-300 ${
                  task.completed ? 'ring-2 ring-cute-pink-400/50' : 'hover:ring-2 hover:ring-cute-purple-400/30'
                }`}
                onClick={() => toggleTask(task.id)}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${task.color} opacity-10 transition-opacity duration-300`} />
                
                {/* Task Content */}
                <div className="relative z-10 flex items-start space-x-4">
                  {/* Task Icon & Checkbox */}
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${task.color} flex items-center justify-center text-2xl mb-2`}>
                      {task.emoji}
                    </div>
                    <div className="text-center">
                      {task.completed ? (
                        <CheckCircleIconSolid className="w-6 h-6 text-cute-pink-400 mx-auto" />
                      ) : (
                        <div className="w-6 h-6 border-2 border-gray-400 rounded-full mx-auto" />
                      )}
                    </div>
                  </div>
                  
                  {/* Task Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className={`text-lg font-bold transition-colors ${
                        task.completed ? 'text-cute-pink-300 line-through' : 'text-white'
                      }`}>
                        {task.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <ClockIcon className="w-4 h-4" />
                        <span>{task.duration}</span>
                      </div>
                    </div>
                    
                    <p className={`text-sm leading-relaxed mb-4 transition-colors ${
                      task.completed ? 'text-gray-400 line-through' : 'text-gray-300'
                    }`}>
                      {task.description}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        task.category === 'Morning' ? 'bg-yellow-500/20 text-yellow-400' :
                        task.category === 'Afternoon' ? 'bg-cute-pink-500/20 text-cute-pink-400' :
                        task.category === 'Evening' ? 'bg-cute-purple-500/20 text-cute-purple-400' :
                        'bg-cute-blue-500/20 text-cute-blue-400'
                      }`}>
                        {task.category}
                      </span>
                      
                      <div className="flex items-center space-x-1 text-cute-purple-400">
                        <StarIcon className="w-4 h-4" />
                        <span className="font-semibold">{task.points} pts</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Other Tasks */}
        {groupedTasks.other.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <ClockIcon className="w-8 h-8 text-gray-400 mr-3" />
              Other Tasks
            </h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              {groupedTasks.other.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.02 }}
                  className={`card-cute cursor-pointer relative overflow-hidden opacity-70 transition-all duration-300 ${
                    task.completed ? 'ring-2 ring-cute-pink-400/50' : 'hover:opacity-90 hover:ring-2 hover:ring-cute-purple-400/30'
                  }`}
                  onClick={() => toggleTask(task.id)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${task.color} opacity-10`} />
                  
                  <div className="relative z-10 text-center">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${task.color} flex items-center justify-center text-xl mx-auto mb-3`}>
                      {task.emoji}
                    </div>
                    
                    <h3 className={`font-bold mb-2 transition-colors ${
                      task.completed ? 'text-cute-pink-300 line-through' : 'text-white'
                    }`}>
                      {task.title}
                    </h3>
                    
                    <div className="flex justify-center items-center space-x-4 text-sm text-gray-400">
                      <span>{task.category}</span>
                      <div className="flex items-center space-x-1">
                        <StarIcon className="w-3 h-3" />
                        <span>{task.points}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      {task.completed ? (
                        <CheckCircleIconSolid className="w-5 h-5 text-cute-pink-400 mx-auto" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-gray-500 rounded-full mx-auto" />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Rewards Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="card-cute"
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4">
              <GiftIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Wellness Rewards</h2>
            <p className="text-gray-300">Unlock these adorable badges as you progress on your wellness journey! 🎁</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            {rewards.map((reward) => (
              <div 
                key={reward.id} 
                className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                  reward.unlocked 
                    ? 'border-cute-pink-400/50 bg-cute-pink-500/10' 
                    : 'border-gray-600 bg-gray-700/30'
                }`}
              >
                <div className="text-center">
                  <div className={`text-4xl mb-3 ${reward.unlocked ? '' : 'grayscale opacity-50'}`}>
                    {reward.emoji}
                  </div>
                  <h3 className={`font-bold mb-2 ${
                    reward.unlocked ? 'text-cute-pink-300' : 'text-gray-400'
                  }`}>
                    {reward.title}
                  </h3>
                  <p className="text-xs text-gray-400 mb-3">{reward.description}</p>
                  <div className={`text-sm font-medium ${
                    reward.unlocked ? 'text-cute-purple-400' : 'text-gray-500'
                  }`}>
                    {reward.unlocked ? 'Unlocked! 🎉' : `${reward.pointsRequired} points needed`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Tasks;
