import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, PlayIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface Plant {
  id: number;
  emotion: string;
  x: number;
  y: number;
  growth: number; // 0-100
  color: string;
  emoji: string;
}

interface MoodGardenProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const MoodGarden: React.FC<MoodGardenProps> = ({ onComplete, onClose }) => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90); // 1.5 minute game
  const [isPlaying, setIsPlaying] = useState(false);
  const [gardenHealth, setGardenHealth] = useState(100);

  const emotions = [
    { name: 'Happy', color: 'text-yellow-400', emoji: '😊', plantEmoji: '🌻' },
    { name: 'Calm', color: 'text-blue-400', emoji: '😌', plantEmoji: '🌸' },
    { name: 'Excited', color: 'text-pink-400', emoji: '🤩', plantEmoji: '🌺' },
    { name: 'Peaceful', color: 'text-purple-400', emoji: '🕊️', plantEmoji: '🌷' },
    { name: 'Grateful', color: 'text-green-400', emoji: '🙏', plantEmoji: '🌿' },
    { name: 'Hopeful', color: 'text-orange-400', emoji: '🌅', plantEmoji: '🌼' }
  ];

  // Game timer
  React.useEffect(() => {
    if (!isPlaying || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsPlaying(false);
          onComplete(score);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, score, onComplete]);

  // Plant growth
  React.useEffect(() => {
    if (!isPlaying) return;

    const growthInterval = setInterval(() => {
      setPlants(prev => prev.map(plant => ({
        ...plant,
        growth: Math.min(plant.growth + 2, 100)
      })));
    }, 1000);

    return () => clearInterval(growthInterval);
  }, [isPlaying]);

  // Garden health decay (plants need care)
  React.useEffect(() => {
    if (!isPlaying) return;

    const healthInterval = setInterval(() => {
      setGardenHealth(prev => Math.max(prev - 0.5, 0));
    }, 2000);

    return () => clearInterval(healthInterval);
  }, [isPlaying]);

  const plantSeed = (emotion: string, event: React.MouseEvent) => {
    if (!isPlaying) return;

    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const gardenRect = document.getElementById('garden-area')?.getBoundingClientRect();
    if (!gardenRect) return;

    const x = event.clientX - gardenRect.left;
    const y = event.clientY - gardenRect.top;

    const emotionData = emotions.find(e => e.name === emotion);
    if (!emotionData) return;

    const newPlant: Plant = {
      id: Date.now(),
      emotion,
      x,
      y,
      growth: 0,
      color: emotionData.color,
      emoji: emotionData.plantEmoji
    };

    setPlants(prev => [...prev, newPlant]);
    setScore(prev => prev + 25);
    setGardenHealth(prev => Math.min(prev + 5, 100));
  };

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(90);
    setPlants([]);
    setGardenHealth(100);
  };

  const getPlantSize = (growth: number) => {
    return Math.max(20, growth * 0.8);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/95 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 max-w-4xl w-full max-h-[90vh] overflow-hidden relative"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-white">Mood Garden 🌸</h2>
            <div className="text-sm text-gray-300">
              Score: <span className="text-green-400 font-bold">{score}</span>
            </div>
            <div className="text-sm text-gray-300">
              Time: <span className="text-purple-400 font-bold">{timeLeft}s</span>
            </div>
            <div className="text-sm text-gray-300">
              Garden Health: <span className="text-pink-400 font-bold">{Math.round(gardenHealth)}%</span>
            </div>
          </div>

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

        {/* Emotion Selector */}
        {isPlaying && (
          <div className="mb-4">
            <p className="text-white text-center mb-2">Click on the garden to plant seeds of your current emotions:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {emotions.map(emotion => (
                <motion.button
                  key={emotion.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedEmotion(emotion.name)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-full font-medium transition-all ${
                    selectedEmotion === emotion.name
                      ? 'bg-white/20 border-2 border-white text-white'
                      : 'bg-slate-700/50 hover:bg-slate-600/50 text-gray-300 hover:text-white'
                  }`}
                >
                  <span>{emotion.emoji}</span>
                  <span>{emotion.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Garden Area */}
        <div
          id="garden-area"
          className="relative w-full h-96 bg-gradient-to-b from-green-900/30 to-green-800/50 rounded-2xl overflow-hidden border-2 border-green-600/50 cursor-crosshair"
          onClick={(e) => selectedEmotion && plantSeed(selectedEmotion, e)}
        >
          {/* Background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-4 left-4 text-4xl">🌱</div>
            <div className="absolute top-8 right-8 text-3xl">🌿</div>
            <div className="absolute bottom-4 left-1/4 text-2xl">🍃</div>
            <div className="absolute bottom-8 right-1/3 text-2xl">🌾</div>
          </div>

          {/* Plants */}
          <AnimatePresence>
            {plants.map(plant => (
              <motion.div
                key={plant.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: plant.growth > 20 ? 1 : 0.7,
                  y: plant.growth > 50 ? -10 : 0
                }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute"
                style={{
                  left: plant.x - getPlantSize(plant.growth) / 2,
                  top: plant.y - getPlantSize(plant.growth) / 2,
                  fontSize: `${getPlantSize(plant.growth)}px`
                }}
              >
                <div className="relative">
                  {plant.emoji}
                  {plant.growth > 80 && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute -top-2 -right-2 text-yellow-400"
                    >
                      ✨
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Garden Health Indicator */}
          <div className="absolute top-2 right-2 bg-black/50 rounded-full px-3 py-1">
            <div className="flex items-center space-x-1">
              <div className="w-16 h-2 bg-gray-600 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-red-500 to-green-500"
                  style={{ width: `${gardenHealth}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="text-xs text-white">{Math.round(gardenHealth)}%</span>
            </div>
          </div>

          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-6xl mb-4">🌸</div>
                <h3 className="text-xl font-bold mb-2">Mood Garden</h3>
                <p className="text-gray-300 max-w-md">
                  Plant seeds representing your emotions. Watch your garden grow and bloom as you nurture positive feelings!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-4 text-center text-sm text-gray-400">
          {selectedEmotion ? `Selected: ${selectedEmotion} - Click anywhere in the garden to plant!` : 'Select an emotion above, then click in the garden to plant seeds'}
        </div>

        {/* Stats */}
        {isPlaying && (
          <div className="mt-4 flex justify-center space-x-6 text-sm text-gray-300">
            <div>Plants: <span className="text-green-400 font-bold">{plants.length}</span></div>
            <div>Growing: <span className="text-blue-400 font-bold">{plants.filter(p => p.growth < 100).length}</span></div>
            <div>Bloomed: <span className="text-yellow-400 font-bold">{plants.filter(p => p.growth >= 100).length}</span></div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MoodGarden;
