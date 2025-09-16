import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon, PlayIcon } from '@heroicons/react/24/outline';

interface PeacefulPuzzleProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const puzzleImages = [
  '🌄', // Mountain sunrise
  '🌊', // Ocean waves
  '🌳', // Forest
  '🏞️', // National park
  '🌸', // Cherry blossoms
  '🗻', // Mountain peak
  '🌅', // Sunset
  '🌌'  // Night sky
];

const PeacefulPuzzle: React.FC<PeacefulPuzzleProps> = ({ onComplete, onClose }) => {
  const [puzzle, setPuzzle] = useState<(string | null)[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes

  const gridSize = 3; // 3x3 grid
  const totalTiles = gridSize * gridSize;

  // Shuffle puzzle
  const shufflePuzzle = () => {
    const tiles: (string | null)[] = puzzleImages.slice(0, totalTiles - 1);
    tiles.push(null); // Empty space
    const shuffled = tiles.sort(() => Math.random() - 0.5);
    setPuzzle(shuffled);
    setMoves(0);
    setScore(0);
    setIsPlaying(true);
    setTimeLeft(180);
  };

  // Check if puzzle is solved
  const isSolved = () => {
    for (let i = 0; i < totalTiles - 1; i++) {
      if (puzzle[i] !== puzzleImages[i]) return false;
    }
    return puzzle[totalTiles - 1] === null;
  };

  // Move tile
  const moveTile = (index: number) => {
    if (!isPlaying) return;

    const emptyIndex = puzzle.indexOf(null);
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    const emptyRow = Math.floor(emptyIndex / gridSize);
    const emptyCol = emptyIndex % gridSize;

    // Check if adjacent
    if (Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1) {
      const newPuzzle = [...puzzle];
      newPuzzle[emptyIndex] = newPuzzle[index];
      newPuzzle[index] = null;
      setPuzzle(newPuzzle);
      setMoves(prev => prev + 1);
    }
  };

  // Timer
  useEffect(() => {
    if (!isPlaying) return;
    if (timeLeft <= 0) {
      setIsPlaying(false);
      onComplete(score);
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isPlaying, onComplete, score]);

  // Check win condition
  useEffect(() => {
    if (isPlaying && isSolved()) {
      const timeBonus = Math.max(0, timeLeft * 2);
      const movePenalty = Math.max(0, 50 - moves);
      const finalScore = 100 + timeBonus + movePenalty;
      setScore(finalScore);
      setIsPlaying(false);
      onComplete(finalScore);
    }
  }, [puzzle, isPlaying, timeLeft, moves, onComplete]);

  return (
    <div className="fixed inset-0 bg-slate-900/95 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 max-w-md w-full max-h-[90vh] overflow-auto relative"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Peaceful Puzzle 🧩</h2>
          <div className="flex items-center space-x-2">
            {!isPlaying && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={shufflePuzzle}
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

        {/* Stats */}
        {isPlaying && (
          <div className="flex justify-between text-sm text-gray-300 mb-4">
            <div>Moves: {moves}</div>
            <div>Time: {timeLeft}s</div>
          </div>
        )}

        {/* Puzzle Grid */}
        <div className={`grid grid-cols-${gridSize} gap-2 mb-4`}>
          {puzzle.map((tile, index) => (
            <motion.div
              key={index}
              className={`w-20 h-20 rounded-lg flex items-center justify-center text-3xl cursor-pointer select-none ${
                tile === null ? 'bg-slate-600' : 'bg-slate-700 hover:bg-slate-600'
              }`}
              onClick={() => moveTile(index)}
              whileTap={{ scale: 0.95 }}
            >
              {tile}
            </motion.div>
          ))}
        </div>

        {!isPlaying && (
          <div className="text-center text-gray-300">
            <p>Solve adorable puzzles of serene landscapes. Gentle on your mind!</p>
            {score > 0 && (
              <div className="mt-4">
                <p className="text-green-400 font-bold">Puzzle solved! You earned {score} points!</p>
                <p className="text-sm">Moves: {moves} | Time left: {timeLeft}s</p>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PeacefulPuzzle;
