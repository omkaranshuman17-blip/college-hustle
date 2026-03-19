import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, PlayIcon, PauseIcon } from '@heroicons/react/24/outline';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  popped: boolean;
}

interface BreathingBubblesProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const BreathingBubbles: React.FC<BreathingBubblesProps> = ({ onComplete, onClose }) => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute game
  const [isPlaying, setIsPlaying] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathCount, setBreathCount] = useState(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const bubbleIdRef = useRef(0);

  // Breathing cycle: 4s inhale, 4s hold, 4s exhale
  useEffect(() => {
    if (!isPlaying) return;

    const breathInterval = setInterval(() => {
      setBreathPhase(prev => {
        if (prev === 'inhale') return 'hold';
        if (prev === 'hold') return 'exhale';
        setBreathCount(c => c + 1);
        return 'inhale';
      });
    }, 4000);

    return () => clearInterval(breathInterval);
  }, [isPlaying]);

  // Game timer
  useEffect(() => {
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

  // Generate bubbles
  useEffect(() => {
    if (!isPlaying) return;

    const bubbleInterval = setInterval(() => {
      const newBubble: Bubble = {
        id: bubbleIdRef.current++,
        x: Math.random() * (gameAreaRef.current?.clientWidth || 400),
        y: (gameAreaRef.current?.clientHeight || 600) + 50,
        size: Math.random() * 40 + 20,
        color: ['bg-cute-blue-400', 'bg-cute-purple-400', 'bg-cute-pink-400', 'bg-cute-green-400'][Math.floor(Math.random() * 4)],
        speed: Math.random() * 2 + 1,
        popped: false
      };

      setBubbles(prev => [...prev.slice(-10), newBubble]); // Keep max 10 bubbles
    }, 2000);

    return () => clearInterval(bubbleInterval);
  }, [isPlaying]);

  // Move bubbles
  useEffect(() => {
    if (!isPlaying) return;

    const moveInterval = setInterval(() => {
      setBubbles(prev => prev.map(bubble => ({
        ...bubble,
        y: bubble.y - bubble.speed
      })).filter(bubble => bubble.y > -50)); // Remove bubbles that float off screen
    }, 50);

    return () => clearInterval(moveInterval);
  }, [isPlaying]);

  const popBubble = (bubbleId: number) => {
    setBubbles(prev => prev.map(bubble =>
      bubble.id === bubbleId ? { ...bubble, popped: true } : bubble
    ));

    setScore(prev => prev + 10);

    // Remove popped bubble after animation
    setTimeout(() => {
      setBubbles(prev => prev.filter(bubble => bubble.id !== bubbleId));
    }, 300);
  };

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(60);
    setBreathCount(0);
    setBubbles([]);
  };

  const pauseGame = () => {
    setIsPlaying(false);
  };

  const resumeGame = () => {
    setIsPlaying(true);
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
            <h2 className="text-2xl font-bold text-white">Breathing Bubbles 🫧</h2>
            <div className="text-sm text-gray-300">
              Score: <span className="text-cute-blue-400 font-bold">{score}</span>
            </div>
            <div className="text-sm text-gray-300">
              Time: <span className="text-cute-purple-400 font-bold">{timeLeft}s</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {!isPlaying && timeLeft === 60 && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={startGame}
          className="flex items-center space-x-2 bg-cute-green-500 hover:bg-cute-green-600 text-white px-4 py-2 rounded-full font-medium"
          aria-label="Start breathing bubbles game"
        >
          <PlayIcon className="w-4 h-4" aria-hidden="true" />
          <span>Start</span>
        </motion.button>
            )}

            {isPlaying && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={pauseGame}
                className="flex items-center space-x-2 bg-cute-yellow-500 hover:bg-cute-yellow-600 text-white px-4 py-2 rounded-full font-medium"
                aria-label="Pause breathing bubbles game"
              >
                <PauseIcon className="w-4 h-4" aria-hidden="true" />
                <span>Pause</span>
              </motion.button>
            )}

            {!isPlaying && timeLeft < 60 && timeLeft > 0 && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={resumeGame}
                className="flex items-center space-x-2 bg-cute-blue-500 hover:bg-cute-blue-600 text-white px-4 py-2 rounded-full font-medium"
                aria-label="Resume breathing bubbles game"
              >
                <PlayIcon className="w-4 h-4" aria-hidden="true" />
                <span>Resume</span>
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-medium"
              aria-label="Close breathing bubbles game"
            >
              <XMarkIcon className="w-4 h-4" aria-hidden="true" />
              <span>Close</span>
            </motion.button>
          </div>
        </div>

        {/* Breathing Guide */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center space-x-4 bg-slate-700/50 rounded-full px-6 py-3">
            <div className="text-white font-medium">
              {breathPhase === 'inhale' && '🌬️ Inhale slowly...'}
              {breathPhase === 'hold' && '⏸️ Hold your breath...'}
              {breathPhase === 'exhale' && '💨 Exhale gently...'}
            </div>
            <div className="text-cute-purple-400 font-bold">
              Breath #{breathCount}
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div
          ref={gameAreaRef}
          className="relative w-full h-96 bg-gradient-to-b from-cute-blue-900/20 to-cute-purple-900/20 rounded-2xl overflow-hidden border-2 border-slate-600"
        >
          <AnimatePresence>
            {bubbles.map(bubble => (
              <motion.div
                key={bubble.id}
                initial={{ scale: 0, y: bubble.y }}
                animate={{
                  scale: bubble.popped ? 1.5 : 1,
                  y: bubble.y,
                  opacity: bubble.popped ? 0 : 1
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`absolute rounded-full cursor-pointer ${bubble.color} shadow-lg flex items-center justify-center text-white font-bold text-xs`}
                style={{
                  left: bubble.x,
                  top: bubble.y,
                  width: bubble.size,
                  height: bubble.size,
                }}
                onClick={() => !bubble.popped && popBubble(bubble.id)}
              >
                {!bubble.popped && '🫧'}
              </motion.div>
            ))}
          </AnimatePresence>

          {!isPlaying && timeLeft === 60 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-6xl mb-4">🫧</div>
                <h3 className="text-xl font-bold mb-2">Breathing Bubbles</h3>
                <p className="text-gray-300 max-w-md">
                  Pop the bubbles while following the breathing guide. Focus on your breath and stay calm!
                </p>
              </div>
            </div>
          )}

          {!isPlaying && timeLeft < 60 && timeLeft > 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="text-center text-white">
                <PauseIcon className="w-16 h-16 mx-auto mb-4 text-cute-yellow-400" />
                <h3 className="text-xl font-bold">Game Paused</h3>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-4 text-center text-sm text-gray-400">
          Pop bubbles by clicking/tapping them • Follow the breathing rhythm • Stay mindful and present
        </div>
      </motion.div>
    </div>
  );
};

export default BreathingBubbles;
