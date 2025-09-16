import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon, PlayIcon } from '@heroicons/react/24/outline';

interface GratitudeCloudsProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const GratitudeClouds: React.FC<GratitudeCloudsProps> = ({ onComplete, onClose }) => {
  const [entries, setEntries] = useState<string[]>(['', '', '']);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setEntries(['', '', '']);
  };

  const handleChange = (index: number, value: string) => {
    const newEntries = [...entries];
    newEntries[index] = value;
    setEntries(newEntries);
  };

  const handleSubmit = () => {
    const filledCount = entries.filter(entry => entry.trim() !== '').length;
    if (filledCount < 3) {
      alert('Please fill in all 3 gratitude entries.');
      return;
    }
    setScore(filledCount * 30);
    setIsPlaying(false);
    onComplete(filledCount * 30);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/95 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 max-w-md w-full max-h-[90vh] overflow-auto relative"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Gratitude Clouds ☁️</h2>
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

        {/* Entries Form */}
        {isPlaying ? (
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSubmit();
            }}
            className="space-y-4"
          >
            {[0, 1, 2].map(i => (
              <div key={i} className="flex items-center space-x-2">
                <span className="text-3xl">☁️</span>
                <input
                  type="text"
                  placeholder={`I'm grateful for... #${i + 1}`}
                  value={entries[i]}
                  onChange={e => handleChange(i, e.target.value)}
                  className="flex-grow rounded-md px-3 py-2 text-black"
                  maxLength={100}
                  required
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-cute-purple-500 hover:bg-cute-purple-600 text-white py-2 rounded-md font-semibold"
            >
              Submit
            </button>
          </form>
        ) : (
          <div className="text-center text-gray-300">
            <p>Write things you're grateful for and watch them float away as fluffy clouds!</p>
            {score > 0 && <p className="mt-4 text-green-400 font-bold">You earned {score} points!</p>}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default GratitudeClouds;
