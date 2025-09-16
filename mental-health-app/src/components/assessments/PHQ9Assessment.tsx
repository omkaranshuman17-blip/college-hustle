import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';
import Confetti from 'react-confetti';

interface PHQ9Props {
  onComplete: () => void;
  onBack: () => void;
}

const PHQ9Assessment: React.FC<PHQ9Props> = ({ onComplete, onBack }) => {
  const { user } = useAuthStore();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(9).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const questions = [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling or staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
    "Trouble concentrating on things, such as reading the newspaper or watching television",
    "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
    "Thoughts that you would be better off dead or of hurting yourself in some way"
  ];

  const options = [
    { value: 0, label: "Not at all", color: "bg-green-400" },
    { value: 1, label: "Several days", color: "bg-yellow-400" },
    { value: 2, label: "More than half the days", color: "bg-orange-400" },
    { value: 3, label: "Nearly every day", color: "bg-red-400" }
  ];

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);

    // Auto-advance to next question after a short delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
    }, 300);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = async () => {
    const score = answers.reduce((sum, val) => sum + val, 0);
    
    let severity = '';
    let recommendation = '';
    let color = '';
    if (score == 0) {
      severity = 'No depression';
      recommendation = 'Your symptoms suggest have no depression. maintain your positive habits.';
      color = 'text-green-600';
      setShowConfetti(true);

    } else if (score <= 4) {
      severity = 'Minimal Depression';
      recommendation = 'Your symptoms suggest minimal depression. Continue with self-care practices and maintain your positive habits.';
      color = 'text-green-600';
      
    } else if (score <= 9) {
      severity = 'Mild Depression';
      recommendation = 'Your symptoms suggest mild depression. Consider stress management techniques, regular exercise, and monitoring your mood.';
      color = 'text-yellow-600';
    } else if (score <= 14) {
      severity = 'Moderate Depression';
      recommendation = 'Your symptoms suggest moderate depression. Consider talking to a counselor or therapist for support.';
      color = 'text-orange-600';
    } else if (score <= 19) {
      severity = 'Moderately Severe Depression';
      recommendation = 'Your symptoms suggest moderately severe depression. Professional support with therapy and/or medication is recommended.';
      color = 'text-orange-700';
    } else {
      severity = 'Severe Depression';
      recommendation = 'Your symptoms suggest severe depression. Please seek immediate professional help. You don\'t have to face this alone.';
      color = 'text-red-600';
    }

    // Check for critical response (question 9)
    const criticalResponse = answers[8] > 0;

    setResults({
      score,
      severity,
      recommendation,
      color,
      criticalResponse,
      needsHelp: score >= 15 || criticalResponse
    });

    // Save to backend
    try {
      await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/assessments/phq9`, {
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
          <p className="text-gray-600">Thank you for completing the PHQ-9 assessment</p>
        </div>

        {/* Score Display */}
        <div className="bg-blue-700 rounded-xl p-6 mb-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Your PHQ-9 Score</p>
            <p className="text-5xl font-bold text-gray-800">{results.score}/27</p>
            <p className={`text-xl font-semibold mt-2 ${results.color}`}>{results.severity}</p>
          </div>
        </div>

        {/* Critical Warning */}
        {results.criticalResponse && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-700 border-l-4 border-red-500 p-4 mb-6"
          >
            <div className="flex items-start">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-red-800">Important Notice</h3>
                <p className="text-red-700 mt-1">
                  Your responses indicate you may be having thoughts of self-harm. Please reach out for help immediately:
                </p>
                <div className="mt-3 space-y-2">
                  <p className="font-semibold text-red-800">📞 Crisis Hotline: 988</p>
                  <p className="font-semibold text-red-800">💬 Crisis Text: Text HOME to 741741</p>
                  <p className="text-red-700">You are not alone, and help is available 24/7.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Recommendation */}
        <div className="bg-gray-500 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Recommendation</h3>
          <p className="text-gray-700">{results.recommendation}</p>
        </div>

        {/* Score Interpretation */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Score Interpretation</h3>
          <div className="space-y-2">
            {[
              { range: '0-4', label: 'Minimal', active: results.score <= 4 },
              { range: '5-9', label: 'Mild', active: results.score >= 5 && results.score <= 9 },
              { range: '10-14', label: 'Moderate', active: results.score >= 10 && results.score <= 14 },
              { range: '15-19', label: 'Moderately Severe', active: results.score >= 15 && results.score <= 19 },
              { range: '20-27', label: 'Severe', active: results.score >= 20 }
            ].map((level) => (
              <div
                key={level.range}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  level.active ? 'bg-blue-500 border-2 border-blue-800' : 'bg-gray-500'
                }`}
              >
                <span className={`font-medium ${level.active ? 'text-blue-800' : 'text-gray-600'}`}>
                  {level.label}
                </span>
                <span className={`text-sm ${level.active ? 'text-blue-700' : 'text-gray-500'}`}>
                  {level.range}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-700 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Suggested Next Steps</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Track your mood daily using our mood tracker</li>
            <li>• Try our therapeutic games for stress relief</li>
            <li>• Complete daily wellness tasks</li>
            {results.score >= 10 && <li>• Consider scheduling a consultation with a mental health professional</li>}
            <li>• Retake this assessment in 2 weeks to track progress</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onComplete}
            className="flex-1 py-3 bg-purple-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Done
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.print()}
            className="px-6 py-3 bg-blue-700 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
          >
            Save Results
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
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
        </button>
        <div className="text-center flex-1">
          <h2 className="text-2xl font-bold text-gray-800">PHQ-9 Depression Screening</h2>
          <p className="text-sm text-gray-600 mt-1">Question {currentQuestion + 1} of {questions.length}</p>
        </div>
        <div className="w-9" /> {/* Spacer for centering */}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-700 rounded-full h-2 mb-8">
        <motion.div
          className="bg-blue-500 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Question */}
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
          <p className="text-lg text-gray-700">
            {questions[currentQuestion]}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Answer Options */}
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
                ? `border-purple-500 ${option.color} text-white`
                : `border-gray-200 hover:border-gray-300 ${option.color} text-white`
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

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
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
            onClick={handleNext}
            disabled={answers[currentQuestion] === -1 || currentQuestion === questions.length - 1}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              answers[currentQuestion] === -1 || currentQuestion === questions.length - 1
                ? 'bg-blue-400 text-blue-800 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg'
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

export default PHQ9Assessment;
