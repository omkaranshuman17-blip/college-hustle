import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';
import Confetti from 'react-confetti';

interface GAD7Props {
  onComplete: () => void;
  onBack: () => void;
}

const GAD7Assessment: React.FC<GAD7Props> = ({ onComplete, onBack }) => {
  const { user } = useAuthStore();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(7).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const questions = [
    "Feeling nervous, anxious, or on edge",
    "Not being able to stop or control worrying",
    "Worrying too much about different things",
    "Trouble relaxing",
    "Being so restless that it is hard to sit still",
    "Becoming easily annoyed or irritable",
    "Feeling afraid, as if something awful might happen"
  ];

  const options = [
    { value: 0, label: "Not at all", color: "from-green-400 to-green-500" },
    { value: 1, label: "Several days", color: "from-yellow-400 to-yellow-500" },
    { value: 2, label: "More than half the days", color: "from-orange-400 to-orange-500" },
    { value: 3, label: "Nearly every day", color: "from-red-400 to-red-500" }
  ];

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
    }, 300);
  };

  const calculateResults = async () => {
    const score = answers.reduce((sum, val) => sum + val, 0);
    
    let severity = '';
    let recommendation = '';
    let color = '';
    
    if (score <= 4) {
      severity = 'Minimal Anxiety';
      recommendation = 'Your anxiety levels are minimal. Continue with your current wellness practices and stress management techniques.';
      color = 'text-green-600';
      setShowConfetti(true);
    } else if (score <= 9) {
      severity = 'Mild Anxiety';
      recommendation = 'You\'re experiencing mild anxiety. Try mindfulness exercises, meditation, and regular physical activity.';
      color = 'text-yellow-600';
    } else if (score <= 14) {
      severity = 'Moderate Anxiety';
      recommendation = 'Your anxiety is at a moderate level. Consider professional evaluation and anxiety management techniques.';
      color = 'text-orange-600';
    } else {
      severity = 'Severe Anxiety';
      recommendation = 'You\'re experiencing severe anxiety. Professional treatment is strongly recommended. Please reach out to a mental health provider.';
      color = 'text-red-600';
    }

    setResults({
      score,
      severity,
      recommendation,
      color,
      needsHelp: score >= 10
    });

    try {
      await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/assessments/gad7`, {
        userId: user?.id,
        answers
      });
    } catch (error) {
      console.error('Failed to save assessment:', error);
    }

    setShowResults(true);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const canSubmit = answers.every(a => a !== -1);

  if (showResults && results) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card max-w-2xl mx-auto"
      >
        {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
        
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Assessment Complete</h2>
          <p className="text-gray-600">Your GAD-7 anxiety assessment results</p>
        </div>

        <div className="bg-gradient-to-r from-purple-400 to-blue-500 rounded-xl p-6 mb-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Your GAD-7 Score</p>
            <p className="text-5xl font-bold text-gray-800">{results.score}/21</p>
            <p className={`text-xl font-semibold mt-2 ${results.color}`}>{results.severity}</p>
          </div>
        </div>

        <div className="bg-gray-500 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Recommendation</h3>
          <p className="text-gray-700">{results.recommendation}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Score Interpretation</h3>
          <div className="space-y-2">
            {[
              { range: '0-4', label: 'Minimal', active: results.score <= 4 },
              { range: '5-9', label: 'Mild', active: results.score >= 5 && results.score <= 9 },
              { range: '10-14', label: 'Moderate', active: results.score >= 10 && results.score <= 14 },
              { range: '15-21', label: 'Severe', active: results.score >= 15 }
            ].map((level) => (
              <div
                key={level.range}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  level.active ? 'bg-purple-500 border-2 border-purple-800' : 'bg-gray-450'
                }`}
              >
                <span className={`font-medium ${level.active ? 'text-purple-800' : 'text-gray-600'}`}>
                  {level.label}
                </span>
                <span className={`text-sm ${level.active ? 'text-purple-700' : 'text-gray-500'}`}>
                  {level.range}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-purple-500 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Anxiety Management Tips</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Practice deep breathing exercises (4-7-8 technique)</li>
            <li>• Try progressive muscle relaxation</li>
            <li>• Engage in regular physical activity</li>
            <li>• Limit caffeine and alcohol intake</li>
            <li>• Maintain a consistent sleep schedule</li>
            {results.score >= 10 && <li>• Consider cognitive-behavioral therapy (CBT)</li>}
          </ul>
        </div>

        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onComplete}
            className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Done
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="card max-w-2xl mx-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-500 rounded-lg transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
        </button>
        <div className="text-center flex-1">
          <h2 className="text-2xl font-bold text-gray-800">GAD-7 Anxiety Assessment</h2>
          <p className="text-sm text-gray-600 mt-1">Question {currentQuestion + 1} of {questions.length}</p>
        </div>
        <div className="w-9" />
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <motion.div
          className="bg-gradient-to-r from-purple-400 to-blue-500 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Over the last 2 weeks, how often have you been bothered by:
          </h3>
          <p className="text-lg text-gray-700 font-medium">
            {questions[currentQuestion]}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="space-y-3 mb-8">
        {options.map((option, index) => (
          <motion.button
            key={option.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAnswer(option.value)}
            className={`w-full p-4 rounded-xl border-2 transition-all ${
              answers[currentQuestion] === option.value
                ? `border-purple-500 bg-gradient-to-r ${option.color} text-white`
                : `border-gray-200 hover:border-gray-300 bg-gradient-to-r ${option.color} text-white`
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{option.label}</span>
              <div className={`w-6 h-6 rounded-full border-2 ${
                answers[currentQuestion] === option.value
                  ? 'border-white bg-white'
                  : 'border-gray-300'
              }`}>
                {answers[currentQuestion] === option.value && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-full h-full rounded-full bg-purple-500"
                  />
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1)}
          className="flex items-center space-x-2 px-3 py-1 rounded-lg transition-all bg-blue-400 text-black cursor-not-allowed text-sm"
          style={{ fontSize: '0.75rem' }}
        >
          <ArrowLeftIcon className="w-3 h-3" />
          <span>Previous</span>
        </button>

        {currentQuestion === questions.length - 1 && canSubmit ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={calculateResults}
            className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            <span>Complete Assessment</span>
          </motion.button>
        ) : (
          <button
            onClick={() => currentQuestion < questions.length - 1 && setCurrentQuestion(currentQuestion + 1)}
            disabled={answers[currentQuestion] === -1 || currentQuestion === questions.length - 1}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              answers[currentQuestion] === -1 || currentQuestion === questions.length - 1
                ? 'bg-blue-400 text-blue-800 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-400 to-blue-500 text-white hover:shadow-lg'
            }`}
          >
            <span>Next</span>
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default GAD7Assessment;
