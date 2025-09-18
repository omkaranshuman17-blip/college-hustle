import React from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import {
  UserCircleIcon,
  PencilSquareIcon,
  HeartIcon,
  SparklesIcon,
  ShieldCheckIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  BellAlertIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const Profile: React.FC = () => {
  const { user, logout } = useAuthStore();

  const preferences = [
    { id: 'music', label: 'Play calming music on start', enabled: true },
    { id: 'animations', label: 'Enable cute animations', enabled: true },
    { id: 'notifications', label: 'Daily wellness reminders', enabled: false },
  ];

  return (
    <div className="min-h-screen pt-8 pb-20 px-4 text-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="card-cute p-6 flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full flex items-center justify-center">
              <UserCircleIcon className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white">{user?.username || 'Student'}</h1>
              <p className="text-white opacity-90">Campus Wellness Member</p>
              <div className="mt-2 flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1 text-white">
                  <StarIcon className="w-4 h-4" />
                  <span>{user?.totalPoints || 0} points</span>
                </div>
                <div className="text-white opacity-60">•</div>
                <div className="text-white opacity-90">{user?.streakCount || 0} day streak</div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cute-pink-500 to-cute-purple-500"
            >
              <PencilSquareIcon className="w-5 h-5 inline mr-2" /> Edit Profile
            </motion.button>
          </div>
        </motion.div>

        {/* Profile Sections */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Personal Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-cute md:col-span-2"
          >
            <h2 className="text-xl font-bold mb-4 text-white">Personal Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="w-5 h-5 text-white opacity-80" />
                <span className="text-white">{user?.email || 'anonymous@student.edu'}</span>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon className="w-5 h-5 text-white opacity-80" />
                <span className="text-white">+91-XXXX-XXXXXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPinIcon className="w-5 h-5 text-white opacity-80" />
                <span className="text-white">Campus: Main Block</span>
              </div>
              <div className="flex items-center space-x-3">
                <ShieldCheckIcon className="w-5 h-5 text-white opacity-80" />
                <span className="text-white">Privacy: Anonymous Mode</span>
              </div>
            </div>
          </motion.div>

          {/* Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-cute"
          >
            <h2 className="text-xl font-bold mb-4 text-white">Preferences</h2>
            <div className="space-y-3">
              {preferences.map((pref) => (
                <div key={pref.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-slate-800/90 border-gray-200 dark:border-slate-700/50">
                  <span className="dark:text-white text-gray-900 font-medium">{pref.label}</span>
                  <button className={`w-12 h-6 rounded-full transition-all ${pref.enabled ? 'bg-cute-pink-500' : 'bg-gray-600'}`}
                    aria-pressed={pref.enabled}
                  >
                    <span className={`block w-6 h-6 bg-white rounded-full transform transition-all ${pref.enabled ? 'translate-x-6' : ''}`} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Wellness Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="card-cute mt-6"
        >
          <h2 className="text-xl font-bold mb-4 text-white">Wellness Summary</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-800/90 border-gray-200 dark:border-cute-purple-500/30">
              <h3 className="text-sm dark:text-white text-gray-900 font-semibold mb-2">Mood Trend</h3>
              <div className="h-24 rounded-xl bg-gradient-to-br from-cute-pink-500/20 to-cute-purple-500/20 flex items-center justify-center dark:text-white text-gray-900 font-medium">
                Coming soon 🌈
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-800/90 border-gray-200 dark:border-cute-purple-500/30">
              <h3 className="text-sm dark:text-white text-gray-900 font-semibold mb-2">Recent Achievements</h3>
              <ul className="text-sm dark:text-white text-gray-900 space-y-1">
                <li>• Completed 3-day streak</li>
                <li>• Earned "Daily Champion" badge</li>
                <li>• Finished 2 mind games today</li>
              </ul>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-800/90 border-gray-200 dark:border-cute-purple-500/30">
              <h3 className="text-sm dark:text-white text-gray-900 font-semibold mb-2">Recommendations</h3>
              <ul className="text-sm dark:text-white text-gray-900 space-y-1">
                <li>• Try Breathing Bubbles for 5 minutes</li>
                <li>• Complete Evening Reflection before bed</li>
                <li>• Aim for 30 mins phone-free time</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Account Actions */}
        <div className="mt-6 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-500"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5 inline mr-2" /> Logout
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
