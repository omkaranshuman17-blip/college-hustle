import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  SparklesIcon,
  StarIcon,
  TrophyIcon,
  PauseIcon,
  PlayIcon,
  FireIcon
} from '@heroicons/react/24/outline';
import CapybaraMascot from '../components/CapybaraMascot';

import BreathingBubbles from '../components/games/BreathingBubbles';
import MoodGarden from '../components/games/MoodGarden';
import StarlightMemory from '../components/games/StarlightMemory';
import GratitudeClouds from '../components/games/GratitudeClouds';
import EmotionRainbow from '../components/games/EmotionRainbow';
import PeacefulPuzzle from '../components/games/PeacefulPuzzle';

interface MindGame {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  points: number;
}

const Games: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userPoints, setUserPoints] = useState(2840);

  const mindGames: MindGame[] = [
    {
      id: 'breathing-bubbles',
      title: 'Breathing Bubbles',
      description: 'Pop colorful bubbles while focusing on your breath. Perfect for anxiety relief! 🫧',
      emoji: '🫧',
      color: 'from-cute-blue-400 to-cute-purple-500',
      difficulty: 'Easy',
      duration: '5-10 min',
      points: 50
    },
    {
      id: 'mood-garden',
      title: 'Mood Garden',
      description: 'Plant seeds based on your emotions and watch your virtual garden bloom! 🌸',
      emoji: '🌸',
      color: 'from-cute-pink-400 to-cute-purple-400',
      difficulty: 'Easy',
      duration: '10-15 min',
      points: 75
    },
    {
      id: 'starlight-memory',
      title: 'Starlight Memory',
      description: 'Match twinkling stars while practicing mindfulness. Cute and calming! ✨',
      emoji: '✨',
      color: 'from-cute-purple-400 to-cute-blue-500',
      difficulty: 'Medium',
      duration: '8-12 min',
      points: 100
    },
    {
      id: 'gratitude-clouds',
      title: 'Gratitude Clouds',
      description: 'Write things you\'re grateful for and watch them float away as fluffy clouds! ☁️',
      emoji: '☁️',
      color: 'from-cute-blue-300 to-cute-purple-400',
      difficulty: 'Easy',
      duration: '5-8 min',
      points: 60
    },
    {
      id: 'emotion-rainbow',
      title: 'Emotion Rainbow',
      description: 'Color your feelings across a beautiful rainbow spectrum. So therapeutic! 🌈',
      emoji: '🌈',
      color: 'from-cute-pink-400 to-cute-blue-400',
      difficulty: 'Medium',
      duration: '10-15 min',
      points: 90
    },
    {
      id: 'peaceful-puzzle',
      title: 'Peaceful Puzzle',
      description: 'Solve adorable puzzles of serene landscapes. Gentle on your mind! 🧩',
      emoji: '🧩',
      color: 'from-cute-purple-300 to-cute-pink-400',
      difficulty: 'Hard',
      duration: '15-20 min',
      points: 150
    }
  ];

  const startGame = (gameId: string) => {
    setSelectedGame(gameId);
    setIsPlaying(true);
  };

  const endGame = (pointsEarned: number) => {
    setUserPoints(prev => prev + pointsEarned);
    setIsPlaying(false);
    setSelectedGame(null);
  };

  const renderGame = () => {
    switch (selectedGame) {
      case 'breathing-bubbles':
        return <BreathingBubbles onComplete={endGame} onClose={() => setSelectedGame(null)} />;
      case 'mood-garden':
        return <MoodGarden onComplete={endGame} onClose={() => setSelectedGame(null)} />;
      case 'starlight-memory':
        return <StarlightMemory onComplete={endGame} onClose={() => setSelectedGame(null)} />;
      case 'gratitude-clouds':
        return <GratitudeClouds onComplete={endGame} onClose={() => setSelectedGame(null)} />;
      case 'emotion-rainbow':
        return <EmotionRainbow onComplete={endGame} onClose={() => setSelectedGame(null)} />;
      case 'peaceful-puzzle':
        return <PeacefulPuzzle onComplete={endGame} onClose={() => setSelectedGame(null)} />;
      default:
        return null;
    }
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
            Mind Games 🎮✨
          </h1>
          <div className="flex justify-center mb-4">
            <CapybaraMascot mood="excited" size="medium" className="w-20 h-20" />
          </div>
          <p className="text-white opacity-90 text-lg max-w-2xl mx-auto">
            Relax, play, and boost your mental wellness with our collection of cute, therapeutic games!
          </p>
          
          {/* Points Display */}
          <motion.div 
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-cute-purple-500/20 to-cute-pink-500/20 rounded-full px-6 py-3 mt-4 border border-cute-purple-400/30"
            whileHover={{ scale: 1.05 }}
          >
            <TrophyIcon className="w-6 h-6 text-yellow-400" />
            <span className="text-lg font-semibold text-white">{userPoints} points</span>
            <SparklesIcon className="w-5 h-5 text-cute-purple-400" />
          </motion.div>
        </motion.div>

        {/* Games Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mindGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="card-cute relative overflow-hidden group cursor-pointer"
              onClick={() => !isPlaying && startGame(game.id)}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
              
              {/* Game Content */}
              <div className="relative z-10">
                {/* Game Icon */}
                <div className="text-center mb-4">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${game.color} text-white text-3xl font-bold shadow-lg`}>
                    {game.emoji}
                  </div>
                </div>

                {/* Game Info */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
                  <p className="text-gray-100 text-sm leading-relaxed">{game.description}</p>
                </div>

                {/* Game Stats */}
                <div className="flex justify-between items-center mb-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      game.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                      game.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {game.difficulty}
                    </span>
                  </div>
                  <div className="text-gray-300">
                    {game.duration}
                  </div>
                </div>

                {/* Points & Play Button */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-1 text-white">
                    <StarIcon className="w-4 h-4" />
                    <span className="font-semibold">{game.points} pts</span>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all ${
                      selectedGame === game.id && isPlaying
                        ? 'bg-cute-purple-500/30 text-cute-purple-300'
                        : 'bg-gradient-to-r from-cute-pink-500 to-cute-purple-500 text-white hover:shadow-lg'
                    }`}
                    disabled={isPlaying}
                  >
                    {selectedGame === game.id && isPlaying ? (
                      <>
                        <PauseIcon className="w-4 h-4" />
                        <span>Playing...</span>
                      </>
                    ) : (
                      <>
                        <PlayIcon className="w-4 h-4" />
                        <span>Play</span>
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Loading Animation for Active Game */}
                {selectedGame === game.id && isPlaying && (
                  <motion.div 
                    className="absolute inset-0 bg-slate-800/80 rounded-3xl flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="text-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-12 h-12 border-4 border-cute-purple-400 border-t-transparent rounded-full mx-auto mb-4"
                      />
                      <p className="text-white font-medium">Starting {game.title}...</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Daily Challenge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 card-cute text-center"
        >
          <div className="flex items-center justify-center mb-4">
            <FireIcon className="w-8 h-8 text-orange-400 mr-3" />
            <h2 className="text-2xl font-bold text-white">Daily Mindfulness Challenge</h2>
            <FireIcon className="w-8 h-8 text-orange-400 ml-3" />
          </div>
          
          <p className="text-gray-100 mb-6">
            Complete any 3 games today to unlock bonus rewards and maintain your wellness streak! 🌟
          </p>
          
          <div className="flex justify-center items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-2 bg-cute-pink-500 rounded-full" />
              <div className="w-8 h-2 bg-cute-purple-500 rounded-full" />
              <div className="w-8 h-2 bg-gray-600 rounded-full" />
            </div>
            <span className="text-white font-medium">2/3 completed</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Games;
