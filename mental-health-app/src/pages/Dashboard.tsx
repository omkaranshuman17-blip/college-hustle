import React, { Suspense, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { 
  HeartIcon, 
  SparklesIcon, 
  ChatBubbleLeftRightIcon, 
  CpuChipIcon,
  ArrowTrendingUpIcon,
  FireIcon,
  StarIcon,
  TrophyIcon,
  BookOpenIcon,
  UserGroupIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard';
import CapybaraMascot from '../components/CapybaraMascot';

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const [userMood, setUserMood] = useState('happy');

  useEffect(() => {
    const storedMood = localStorage.getItem('userMood');
    if (storedMood) {
      setUserMood(storedMood);
    }
  }, []);

  const stats = [
    { label: 'Daily Streak', value: user?.streakCount || 0, icon: FireIcon, color: 'from-saffron-400 to-saffron-600' },
    { label: 'Campus Points', value: user?.totalPoints || 0, icon: TrophyIcon, color: 'from-gold-400 to-gold-600' },
    { label: 'Self-Check', value: 12, icon: ChartBarIcon, color: 'from-college-400 to-college-600' },
    { label: 'Mind Games', value: 24, icon: SparklesIcon, color: 'from-emerald-400 to-emerald-600' },
  ];

  const quickActions = [
    { 
      title: 'Morning Check-in', 
      description: 'Start your campus day mindfully',
      icon: HeartIcon,
      link: '/assessments',
      color: 'from-saffron-400 to-saffron-600',
      splineUrl: 'https://prod.spline.design/FvWxH7eOyXJtRNil/scene.splinecode'
    },
    { 
      title: 'Study Break Games', 
      description: 'Refresh between subjects',
      icon: SparklesIcon,
      link: '/games',
      color: 'from-emerald-400 to-emerald-600',
      splineUrl: 'https://prod.spline.design/Ux0OZCvZSl8Pl5gJ/scene.splinecode'
    },
    { 
      title: 'Campus Activities', 
      description: '3 wellness tasks today',
      icon: ArrowTrendingUpIcon,
      link: '/tasks',
      color: 'from-college-400 to-college-600',
      splineUrl: 'https://prod.spline.design/1HiW5KpHQXKsTKQW/scene.splinecode'
    },
  ];

  return (
    <div className="min-h-screen pt-8 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <CapybaraMascot mood={userMood as any} size="large" className="w-16 h-16" />
            <h1 className="text-4xl font-bold dark:text-white text-gray-800">
              Welcome back, {user?.username}!
            </h1>
          </div>
          <p className="dark:text-gray-300 text-gray-600 text-lg">
            Your wellness journey continues. How are you feeling today?
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="dark:bg-gray-800 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-10 rounded-full -mr-10 -mt-10`} />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="dark:text-gray-400 text-gray-600 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold dark:text-white text-gray-800">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions with Feature Cards */}
        <h2 className="text-2xl font-bold dark:text-white text-gray-800 mb-6 text-center">Today's Wellness Activities</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          
          <FeatureCard
            title="Mind Workouts"
            subtitle="Challenge your mind"
            description="Boost cognitive abilities with fun exercises"
            backgroundGradient="dark:bg-gradient-to-br dark:from-pink-900 dark:to-pink-800 bg-gradient-to-br from-pink-200 to-pink-300"
            textColor="dark:text-pink-300 text-pink-800"
            link="/games"
            mascotMood="happy"
          >
            <div className="flex items-center space-x-2 dark:text-pink-300 text-pink-700">
              <CpuChipIcon className="w-5 h-5" />
              <span className="text-sm">Ready to play?</span>
            </div>
          </FeatureCard>

          <FeatureCard
            title="Express Yourself"
            subtitle="Anonymous support"
            description="Share thoughts in a safe environment"
            backgroundGradient="dark:bg-gradient-to-br dark:from-blue-900 dark:to-blue-800 bg-gradient-to-br from-blue-400 to-blue-600"
            textColor="text-white"
            link="/chatbot"
            mascotMood="calm"
          >
            <div className="flex items-center space-x-2 text-blue-100">
              <ChatBubbleLeftRightIcon className="w-5 h-5" />
              <span className="text-sm">Chat now</span>
            </div>
          </FeatureCard>

          <FeatureCard
            title="Daily Check-in"
            subtitle="Track your mood"
            description="Reflect on your current state of mind"
            backgroundGradient="dark:bg-gradient-to-br dark:from-green-900 dark:to-green-800 bg-gradient-to-br from-green-400 to-green-600"
            textColor="text-white"
            link="/assessments"
            mascotMood="meditate"
          >
            <div className="flex items-center space-x-2 text-green-100">
              <HeartIcon className="w-5 h-5" />
              <span className="text-sm">How are you?</span>
            </div>
          </FeatureCard>

          <FeatureCard
            title="Learning Hub"
            subtitle="Educational resources"
            description="Videos, audio guides & articles in your language"
            backgroundGradient="dark:bg-gradient-to-br dark:from-purple-900 dark:to-purple-800 bg-gradient-to-br from-purple-400 to-purple-600"
            textColor="text-white"
            link="/resources"
            mascotMood="happy"
          >
            <div className="flex items-center space-x-2 text-purple-100">
              <BookOpenIcon className="w-5 h-5" />
              <span className="text-sm">Explore resources</span>
            </div>
          </FeatureCard>

          <FeatureCard
            title="Peer Support"
            subtitle="Community forum"
            description="Connect with others & get support from volunteers"
            backgroundGradient="dark:bg-gradient-to-br dark:from-orange-900 dark:to-orange-800 bg-gradient-to-br from-orange-400 to-orange-600"
            textColor="text-white"
            link="/support"
            mascotMood="happy"
          >
            <div className="flex items-center space-x-2 text-orange-100">
              <UserGroupIcon className="w-5 h-5" />
              <span className="text-sm">Join community</span>
            </div>
          </FeatureCard>
        </div>

        {/* Mood Tracker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="dark:bg-blue-600 bg-blue-400 rounded-2xl p-6 shadow-lg mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-black dark:text-black">Your Mood Journey</h2>
            <Link to="/assessments" className="dark:text-green-100 dark:hover:text-green-100 text-green-400 hover:text-green-800 font-medium">
              Track Today →
            </Link>
          </div>

          <div className="h-64 relative dark:bg-gradient-to-br dark:from-blue-700 dark:to-blue-600 bg-gradient-to-br from-blue-100 to-green-200 rounded-xl flex items-center justify-center mb-4">
            <div className="text-center">
              <CapybaraMascot mood={userMood as any} size="large" className="w-20 h-20 mb-4" />
              <p className="dark:text-gray-400 text-gray-600">Mood visualization coming soon</p>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
              <div key={day} className="text-center">
                <div className={`rounded-lg bg-gradient-to-t ${
                  userMood === 'happy' ? 'from-green-200 to-green-400' :
                  userMood === 'calm' ? 'from-blue-200 to-blue-400' :
                  'from-purple-200 to-purple-400'
                } mb-2`} style={{ height: `${40 + index * 10}px` }} />
                <p className="text-sm text-black dark:text-white">{day}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-bold dark:text-white text-gray-800 mb-6 text-center">Wellness Suggestions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="dark:bg-pink-280 bg-pink-400 rounded-2xl p-6 shadow-lg border-l-4 border-green-400">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-200 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <HeartIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold dark:text-white text-gray-800">Mindful Breathing</h3>
                  <p className="dark:text-gray-800 text-gray-1000 text-sm mt-1">
                    Take 5 minutes for deep breathing exercises to reduce stress and improve focus.
                  </p>
                </div>
              </div>
            </div>

            <div className="dark:bg-cyan-200 bg-cyan-500 rounded-2xl p-6 shadow-lg border-l-4 border-red-400">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-300 to-red-600 flex items-center justify-center flex-shrink-0">
                  <SparklesIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold dark:text-white text-gray-800">Brain Training</h3>
                  <p className="dark:text-gray-800 text-gray-1000 text-sm mt-1">
                    Challenge yourself with cognitive exercises designed to boost mental agility.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
