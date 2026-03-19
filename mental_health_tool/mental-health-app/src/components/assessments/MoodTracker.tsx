import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';
import Confetti from 'react-confetti';

interface MoodTrackerProps {
  onComplete: () => void;
  onBack: () => void;
}

const MoodTracker: React.FC<MoodTrackerProps> = ({ onComplete, onBack }) => {
  const { user } = useAuthStore();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [activities, setActivities] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const moods = [
    { value: 1, emoji: '😔', label: 'Very Sad', color: 'from-gray-400 to-gray-600' },
    { value: 2, emoji: '😟', label: 'Sad', color: 'from-blue-400 to-blue-600' },
    { value: 3, emoji: '😕', label: 'Down', color: 'from-indigo-400 to-indigo-600' },
    { value: 4, emoji: '😐', label: 'Okay', color: 'from-purple-400 to-purple-600' },
    { value: 5, emoji: '🙂', label: 'Fine', color: 'from-yellow-400 to-yellow-600' },
    { value: 6, emoji: '😊', label: 'Good', color: 'from-orange-400 to-orange-600' },
    { value: 7, emoji: '😄', label: 'Happy', color: 'from-pink-400 to-pink-600' },
    { value: 8, emoji: '😁', label: 'Great', color: 'from-red-400 to-red-600' },
    { value: 9, emoji: '🤗', label: 'Amazing', color: 'from-green-400 to-green-600' },
    { value: 10, emoji: '🥳', label: 'Fantastic', color: 'from-teal-400 to-teal-600' }
  ];

  const activityOptions = [
    '🏃 Exercise',
    '🧘 Meditation',
    '📚 Reading',
    '🎵 Music',
    '👥 Socializing',
    '🎮 Gaming',
    '🍳 Cooking',
    '🌳 Nature',
    '💤 Rest',
    '💼 Work',
    '🎨 Creative',
    '📺 Entertainment'
  ];

  const toggleActivity = (activity: string) => {
    if (activities.includes(activity)) {
      setActivities(activities.filter(a => a !== activity));
    } else {
      setActivities([...activities, activity]);
    }
  };

  const submitMood = async () => {
    if (!selectedMood) return;

    if (selectedMood >= 8) {
      setShowConfetti(true);
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/ai/mood-analysis`, {
        userId: user?.id,
        moodScore: selectedMood,
        activities,
        notes
      });
    } catch (error) {
      console.error('Failed to save mood:', error);
    }

    setShowResults(true);
  };

  const getMoodMessage = () => {
    if (!selectedMood) return '';
    
    if (selectedMood <= 3) {
      return "It's okay to have tough days. Consider trying some self-care activities or reaching out to someone you trust.";
    } else if (selectedMood <= 6) {
      return "You're doing okay! Keep up with your wellness routines and remember that it's normal to have ups and downs.";
    } else {
      return "That's wonderful! Your positive mood is great to see. Keep doing what makes you feel good!";
    }
  };

  if (showResults) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card max-w-2xl mx-auto text-center"
      >
        {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
        
        <div className="mb-6">
          <div className="text-6xl mb-4">
            {moods.find(m => m.value === selectedMood)?.emoji}
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Mood Logged!</h2>
          <p className="text-gray-600">Thank you for checking in today</p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 mb-6">
          <p className="text-gray-700">{getMoodMessage()}</p>
        </div>

        {activities.length > 0 && (
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Today's Activities</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {activities.map(activity => (
                <span key={activity} className="px-3 py-1 bg-white rounded-full text-sm">
                  {activity}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="bg-blue-50 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Mood Boosting Tips</h3>
          <ul className="text-left space-y-2 text-gray-700">
            <li>• Take a 5-minute walk outside</li>
            <li>• Practice gratitude - write 3 things you're thankful for</li>
            <li>• Connect with a friend or loved one</li>
            <li>• Try a quick breathing exercise</li>
          </ul>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onComplete}
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          Done
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="card max-w-3xl mx-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Daily Mood Check-in</h2>
        <div className="w-9" />
      </div>

      {/* Mood Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">How are you feeling today?</h3>
        <div className="grid grid-cols-5 gap-3">
          {moods.map((mood, index) => (
            <motion.button
              key={mood.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMood(mood.value)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedMood === mood.value
                  ? `border-purple-500 bg-gradient-to-br ${mood.color} shadow-lg`
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="text-3xl mb-1">{mood.emoji}</div>
              <div className={`text-xs ${selectedMood === mood.value ? 'text-white' : 'text-gray-600'}`}>
                {mood.label}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Activities */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">What have you been doing today?</h3>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {activityOptions.map((activity) => (
            <motion.button
              key={activity}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleActivity(activity)}
              className={`px-3 py-2 rounded-lg border transition-all text-sm ${
                activities.includes(activity)
                  ? 'border-purple-500 bg-purple-100 text-purple-700'
                  : 'border-gray-200 hover:border-gray-300 bg-white text-gray-700'
              }`}
            >
              {activity}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Any thoughts to share? (Optional)</h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="How was your day? What's on your mind?"
          className="w-full p-4 border border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none"
          rows={4}
        />
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={submitMood}
        disabled={!selectedMood}
        className={`w-full py-3 rounded-xl font-semibold transition-all ${
          selectedMood
            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        Log Mood
      </motion.button>
    </motion.div>
  );
};

export default MoodTracker;
