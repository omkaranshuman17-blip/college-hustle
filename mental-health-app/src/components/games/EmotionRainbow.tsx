import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon, PlayIcon } from '@heroicons/react/24/outline';

interface EmotionRainbowProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const emotions = [
  { name: 'Happy', color: '#FFD700', emoji: '😊' },
  { name: 'Sad', color: '#4169E1', emoji: '😢' },
  { name: 'Angry', color: '#DC143C', emoji: '😠' },
  { name: 'Anxious', color: '#FF69B4', emoji: '😰' },
  { name: 'Calm', color: '#00CED1', emoji: '😌' },
  { name: 'Excited', color: '#FF4500', emoji: '🤩' },
  { name: 'Grateful', color: '#32CD32', emoji: '🙏' },
  { name: 'Hopeful', color: '#9370DB', emoji: '🌅' }
];

const EmotionRainbow: React.FC<EmotionRainbowProps> = ({ onComplete, onClose }) => {
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setSelectedEmotions([]);
  };

  const handleEmotionClick = (emotionName: string) => {
    if (!isPlaying) return;
    if (selectedEmotions.includes(emotionName)) {
      setSelectedEmotions(prev => prev.filter(e => e !== emotionName));
    } else {
      setSelectedEmotions(prev => [...prev, emotionName]);
    }
  };

  const handleSubmit = () => {
    const points = selectedEmotions.length * 20;
    setScore(points);
    setIsPlaying(false);
    onComplete(points);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/95 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 max-w-4xl w-full max-h-[90vh] overflow-auto relative"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Emotion Rainbow 🌈</h2>
          <div className="flex items-center space-x-2">
            {!isPlaying && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={startGame}
                className="flex items-center space-x-2 bg-cute-green-500 hover:bg-cute-green-600 text-white px-4 py-2 rounded-full font-medium"
              >
                <PlayIcon className="w-4 h-4" />
                <span>Start</span>
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-medium"
            >
              <XMarkIcon className="w-4 h-4" />
              <span>Close</span>
            </motion.button>
          </div>
        </div>

        {/* Rainbow */}
        <div className="mb-6">
          <div className="flex justify-center">
            <div className="w-96 h-32 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500 relative">
              {selectedEmotions.map((emotion, index) => {
                const emotionData = emotions.find(e => e.name === emotion);
                if (!emotionData) return null;
                return (
                  <motion.div
                    key={emotion}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute text-2xl"
                    style={{
                      left: `${20 + index * 10}%`,
                      top: `${20 + index * 5}%`,
                      color: emotionData.color
                    }}
                  >
                    {emotionData.emoji}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Emotion Buttons */}
        {isPlaying && (
          <div className="mb-6">
            <p className="text-white text-center mb-4">Color your feelings across the rainbow spectrum:</p>
            <div className="grid grid-cols-4 gap-4">
              {emotions.map(emotion => (
                <motion.button
                  key={emotion.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleEmotionClick(emotion.name)}
                  className={`p-4 rounded-lg text-center transition-all ${
                    selectedEmotions.includes(emotion.name)
                      ? 'bg-white/20 border-2 border-white'
                      : 'bg-slate-700/50 hover:bg-slate-600/50'
                  }`}
                  style={{ borderColor: selectedEmotions.includes(emotion.name) ? emotion.color : undefined }}
                >
                  <div className="text-3xl mb-2">{emotion.emoji}</div>
                  <div className="text-white font-medium">{emotion.name}</div>
                </motion.button>
              ))}
            </div>
            <div className="text-center mt-4">
              <button
                onClick={handleSubmit}
                className="bg-cute-purple-500 hover:bg-cute-purple-600 text-white px-6 py-2 rounded-full font-semibold"
              >
                Complete Rainbow
              </button>
            </div>
          </div>
        )}

        {!isPlaying && (
          <div className="text-center text-gray-300">
            <p>Color your emotions across a beautiful rainbow spectrum. So therapeutic!</p>
            {score > 0 && <p className="mt-4 text-green-400 font-bold">You earned {score} points!</p>}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default EmotionRainbow;
