import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CapybaraMascot from './CapybaraMascot';

interface MoodAssessmentProps {
  onComplete: (mood: string) => void;
  onClose: () => void;
}

const MoodAssessment: React.FC<MoodAssessmentProps> = ({ onComplete, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const questions = [
    {
      question: "How are you feeling right now?",
      options: ["Very happy", "Happy", "Neutral", "Sad or down"]
    },
    {
      question: "What's your energy level?",
      options: ["High energy", "Moderate energy", "Low energy", "Very low energy"]
    },
    {
      question: "How stressed are you feeling?",
      options: ["Not stressed at all", "A little stressed", "Moderately stressed", "Very stressed"]
    },
    {
      question: "How focused are you right now?",
      options: ["Very focused", "Somewhat focused", "Distracted", "Can't focus at all"]
    },
    {
      question: "Overall, how would you describe your mood?",
      options: ["Excited and positive", "Calm and content", "Anxious or worried", "Tired or exhausted"]
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate mood
      const mood = calculateMood(newAnswers);
      onComplete(mood);
    }
  };

  const calculateMood = (answers: number[]): string => {
    // Simple scoring: lower index = more positive
    const score = answers.reduce((sum, ans) => sum + ans, 0);
    const avg = score / answers.length;

    if (avg < 1) return 'happy';
    if (avg < 2) return 'calm';
    if (avg < 2.5) return 'okay';
    if (avg < 3) return 'tired';
    return 'sleeping';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      className="bg-gray-900 bg-opacity-90 rounded-3xl p-4 max-w-sm w-full max-h-[90vh] shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="text-center mb-6">
          <CapybaraMascot mood="curious" size="medium" className="mx-auto mb-4" />
          <h2 className="text-2xl font-extrabold text-white mb-1 drop-shadow-lg tracking-wide leading-tight">How are you feeling?</h2>
          <p className="text-white text-base font-semibold mb-2 drop-shadow-sm leading-snug">Let's find the perfect capybara companion for your mood!</p>
        </div>

        <div className="mb-4 px-3">
          <div className="flex justify-between text-base font-bold text-white mb-3 max-w-md mx-auto drop-shadow-sm">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-4 max-w-md mx-auto shadow-lg">
            <motion.div
              className="bg-gradient-to-r from-blue-700 to-green-700 h-4 rounded-full shadow-md"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-black mb-4">
            {questions[currentQuestion].question}
          </h3>
          <div
            className="space-y-3 max-h-64 overflow-y-scroll pr-2 flex-1"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#3b82f6 #d1d5db',
            }}
          >
            {questions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleAnswer(index)}
                className="w-full p-4 text-left bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 rounded-2xl border border-gray-300 dark:border-gray-500 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              >
                {option}
              </motion.button>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
};

export default MoodAssessment;
