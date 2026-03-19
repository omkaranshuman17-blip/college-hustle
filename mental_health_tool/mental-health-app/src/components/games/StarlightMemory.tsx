import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon, PlayIcon } from '@heroicons/react/24/outline';

interface Card {
  id: number;
  emoji: string;
  matched: boolean;
  flipped: boolean;
}

interface StarlightMemoryProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const emojis = ['✨', '🌟', '💫', '🌠', '⭐', '🌌'];

const StarlightMemory: React.FC<StarlightMemoryProps> = ({ onComplete, onClose }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [firstChoice, setFirstChoice] = useState<Card | null>(null);
  const [secondChoice, setSecondChoice] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes

  // Shuffle cards
  const shuffleCards = () => {
    const doubled = [...emojis, ...emojis];
    const shuffled = doubled
      .map((emoji, index) => ({ id: index, emoji, matched: false, flipped: false }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFirstChoice(null);
    setSecondChoice(null);
    setScore(0);
    setIsPlaying(true);
    setTimeLeft(120);
  };

  // Handle card click
  const handleChoice = (card: Card) => {
    if (disabled) return;
    if (card === firstChoice) return;

    if (!firstChoice) {
      setFirstChoice(card);
      setCards(prev =>
        prev.map(c => (c.id === card.id ? { ...c, flipped: true } : c))
      );
    } else {
      setSecondChoice(card);
      setCards(prev =>
        prev.map(c => (c.id === card.id ? { ...c, flipped: true } : c))
      );
      setDisabled(true);
    }
  };

  // Compare two selected cards
  useEffect(() => {
    if (firstChoice && secondChoice) {
      if (firstChoice.emoji === secondChoice.emoji) {
        setCards(prev =>
          prev.map(c =>
            c.emoji === firstChoice.emoji ? { ...c, matched: true } : c
          )
        );
        setScore(prev => prev + 50);
        resetTurn();
      } else {
        setTimeout(() => {
          setCards(prev =>
            prev.map(c =>
              c.id === firstChoice.id || c.id === secondChoice.id
                ? { ...c, flipped: false }
                : c
            )
          );
          resetTurn();
        }, 1000);
      }
    }
  }, [firstChoice, secondChoice]);

  // Reset choices & enable clicking
  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setDisabled(false);
  };

  // Timer countdown
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

  // Check if all matched
  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.matched)) {
      setIsPlaying(false);
      onComplete(score + 200); // bonus for perfect round
    }
  }, [cards, score, onComplete]);

  return (
    <div className="fixed inset-0 bg-slate-900/95 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 max-w-4xl w-full max-h-[90vh] overflow-auto relative"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Starlight Memory ✨</h2>
          <div className="flex items-center space-x-4">
            <div className="text-white font-semibold">Score: {score}</div>
            <div className="text-white font-semibold">Time: {timeLeft}s</div>
            <button
              onClick={shuffleCards}
              className="bg-cute-blue-500 hover:bg-cute-blue-600 text-white px-3 py-1 rounded"
            >
              Restart
            </button>
            <button
              onClick={onClose}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center space-x-1"
            >
              <XMarkIcon className="w-4 h-4" />
              <span>Close</span>
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-4 gap-4">
          {cards.map(card => (
            <motion.div
              key={card.id}
              className={`relative w-20 h-28 rounded-lg cursor-pointer select-none ${
                card.flipped || card.matched ? 'bg-cute-purple-500' : 'bg-slate-700'
              } flex items-center justify-center text-4xl text-white shadow-lg`}
              onClick={() => (isPlaying ? handleChoice(card) : null)}
              whileTap={{ scale: 0.95 }}
            >
              {(card.flipped || card.matched) ? card.emoji : '❓'}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default StarlightMemory;
