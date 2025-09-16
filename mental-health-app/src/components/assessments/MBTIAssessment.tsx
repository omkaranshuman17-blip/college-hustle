import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import CapybaraMascot from '../../components/CapybaraMascot';

interface MBTIQuestion {
  id: number;
  question: string;
  options: {
    a: string;
    b: string;
  };
  dimension: 'EI' | 'SN' | 'TF' | 'JP'; // Extraversion/Introversion, Sensing/Intuition, Thinking/Feeling, Judging/Perceiving
}

const MBTIAssessment: React.FC<{ onComplete: (result: any) => void; onBack: () => void }> = ({ onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: 'a' | 'b' }>({});
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<any>(null);

  React.useEffect(() => {
    if (showResults && result) {
      // Scroll to top when results are shown
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showResults, result]);

  // Sample MBTI questions (simplified version with 12 questions)
  const questions: MBTIQuestion[] = [
    {
      id: 1,
      question: "At a party, do you:",
      options: {
        a: "Interact with many people, including strangers",
        b: "Interact with a few people you know well"
      },
      dimension: 'EI'
    },
    {
      id: 2,
      question: "Are you more:",
      options: {
        a: "Realistic than speculative",
        b: "Speculative than realistic"
      },
      dimension: 'SN'
    },
    {
      id: 3,
      question: "Is it worse to:",
      options: {
        a: "Have your 'head in the clouds'",
        b: "Be 'in a rut'"
      },
      dimension: 'SN'
    },
    {
      id: 4,
      question: "Are you more impressed by:",
      options: {
        a: "Principles",
        b: "Emotions"
      },
      dimension: 'TF'
    },
    {
      id: 5,
      question: "Are you more drawn toward the:",
      options: {
        a: "Convincing",
        b: "Touching"
      },
      dimension: 'TF'
    },
    {
      id: 6,
      question: "Do you prefer to work:",
      options: {
        a: "To deadlines",
        b: "Just 'whenever'"
      },
      dimension: 'JP'
    },
    {
      id: 7,
      question: "Do you tend to choose:",
      options: {
        a: "Rather carefully",
        b: "Somewhat impulsively"
      },
      dimension: 'JP'
    },
    {
      id: 8,
      question: "At parties do you:",
      options: {
        a: "Stay late, with increasing energy",
        b: "Leave early with decreased energy"
      },
      dimension: 'EI'
    },
    {
      id: 9,
      question: "Are you more attracted to:",
      options: {
        a: "Sensible people",
        b: "Imaginative people"
      },
      dimension: 'SN'
    },
    {
      id: 10,
      question: "In judging others are you more swayed by:",
      options: {
        a: "Laws than circumstances",
        b: "Circumstances than laws"
      },
      dimension: 'TF'
    },
    {
      id: 11,
      question: "In approaching others is your inclination to be somewhat:",
      options: {
        a: "Objective",
        b: "Personal"
      },
      dimension: 'TF'
    },
    {
      id: 12,
      question: "Does it bother you more having things:",
      options: {
        a: "Incomplete",
        b: "Completed"
      },
      dimension: 'JP'
    }
  ];

  const handleAnswer = (answer: 'a' | 'b') => {
    setAnswers({ ...answers, [currentQuestion]: answer });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate results
      const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

      Object.entries(answers).forEach(([qIndex, ans]) => {
        const question = questions[parseInt(qIndex)];
        const dimension = question.dimension;

        if (dimension === 'EI') {
          if (ans === 'a') scores.E++;
          else scores.I++;
        } else if (dimension === 'SN') {
          if (ans === 'a') scores.S++;
          else scores.N++;
        } else if (dimension === 'TF') {
          if (ans === 'a') scores.T++;
          else scores.F++;
        } else if (dimension === 'JP') {
          if (ans === 'a') scores.J++;
          else scores.P++;
        }
      });

      // Add current answer
      const currentQ = questions[currentQuestion];
      if (currentQ.dimension === 'EI') {
        if (answer === 'a') scores.E++;
        else scores.I++;
      } else if (currentQ.dimension === 'SN') {
        if (answer === 'a') scores.S++;
        else scores.N++;
      } else if (currentQ.dimension === 'TF') {
        if (answer === 'a') scores.T++;
        else scores.F++;
      } else if (currentQ.dimension === 'JP') {
        if (answer === 'a') scores.J++;
        else scores.P++;
      }

      const personalityType = `${scores.E > scores.I ? 'E' : 'I'}${scores.S > scores.N ? 'S' : 'N'}${scores.T > scores.F ? 'T' : 'F'}${scores.J > scores.P ? 'J' : 'P'}`;

      const assessmentResult = {
        type: personalityType,
        scores,
        description: getPersonalityDescription(personalityType)
      };

      setResult(assessmentResult);
      setShowResults(true);
      onComplete(assessmentResult);
    }
  };

  const getPersonalityDescription = (type: string) => {
    const descriptions: { [key: string]: string } = {
      'INTJ': 'The Architect: Imaginative and strategic thinkers, with a plan for everything.',
      'INTP': 'The Logician: Innovative inventors with an unquenchable thirst for knowledge.',
      'ENTJ': 'The Commander: Bold, imaginative and strong-willed leaders.',
      'ENTP': 'The Debater: Smart and curious thinkers who cannot resist an intellectual challenge.',
      'INFJ': 'The Advocate: Quiet and mystical, yet very inspiring and tireless idealists.',
      'INFP': 'The Mediator: Poetic, kind and altruistic people, always eager to help a good cause.',
      'ENFJ': 'The Protagonist: Charismatic and inspiring leaders, able to mesmerize their listeners.',
      'ENFP': 'The Campaigner: Enthusiastic, creative and sociable free spirits.',
      'ISTJ': 'The Logistician: Practical and fact-focused individuals, whose reliability cannot be doubted.',
      'ISFJ': 'The Defender: Very dedicated and warm protectors, always ready to defend their loved ones.',
      'ESTJ': 'The Executive: Excellent administrators, unsurpassed at managing things or people.',
      'ESFJ': 'The Consul: Extraordinarily caring, social and popular people.',
      'ISTP': 'The Virtuoso: Bold and practical experimenters, masters of all kinds of tools.',
      'ISFP': 'The Adventurer: Flexible and charming artists, always ready to explore new things.',
      'ESTP': 'The Entrepreneur: Smart, energetic and perceptive people.',
      'ESFP': 'The Entertainer: Spontaneous, energetic and enthusiastic people.'
    };
    return descriptions[type] || 'A unique personality type with its own strengths and characteristics.';
  };

  const progress = ((Object.keys(answers).length + (currentQuestion < questions.length ? 1 : 0)) / questions.length) * 100;

  if (showResults) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card max-w-2xl mx-auto"
      >
        <div className="text-center mb-6">
          <CheckCircleIcon className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-2">Assessment Complete</h2>
          <p className="text-white mb-4">Your MBTI personality type has been determined.</p>
          <p className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{result.type}</p>
          <p className="text-gray-900 dark:text-gray-300 mb-6">{result.description}</p>
        </div>

        <div className="bg-gradient-to-r from-purple-700 to-blue-700 rounded-xl p-6 mb-6 text-white">
          <h3 className="text-lg font-semibold mb-4">Your MBTI Scores</h3>
          <div className="grid grid-cols-2 gap-4">
            <div><strong>E:</strong> {result.scores.E}</div>
            <div><strong>I:</strong> {result.scores.I}</div>
            <div><strong>S:</strong> {result.scores.S}</div>
            <div><strong>N:</strong> {result.scores.N}</div>
            <div><strong>T:</strong> {result.scores.T}</div>
            <div><strong>F:</strong> {result.scores.F}</div>
            <div><strong>J:</strong> {result.scores.J}</div>
            <div><strong>P:</strong> {result.scores.P}</div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Back to Assessments
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-white opacity-80 hover:opacity-100 transition-opacity"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Back</span>
        </button>
        <div className="text-center">
          <CapybaraMascot mood="curious" size="small" className="w-12 h-12 mx-auto mb-2" />
          <h2 className="text-xl font-bold text-white">MBTI Personality Assessment</h2>
        </div>
        <div className="w-16"></div> {/* Spacer */}
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-white opacity-80 mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-6">
          {questions[currentQuestion].question}
        </h3>

        <div className="space-y-4">
          {Object.entries(questions[currentQuestion].options).map(([key, option]) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswer(key as 'a' | 'b')}
              className="w-full p-4 text-left bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-600 hover:border-purple-400 transition-all"
            >
              <span className="text-white">{option}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-white opacity-70">
        Choose the option that best describes you. There are no right or wrong answers.
      </div>
    </motion.div>
  );
};

export default MBTIAssessment;
