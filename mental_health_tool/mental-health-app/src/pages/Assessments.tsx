import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { 
  ClipboardDocumentCheckIcon,
  HeartIcon,
  ExclamationTriangleIcon,
  SparklesIcon,
  FireIcon,
  MoonIcon,
  ChartBarIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import PHQ9Assessment from '../components/assessments/PHQ9Assessment';
import GAD7Assessment from '../components/assessments/GAD7Assessment';
import MBTIAssessment from '../components/assessments/MBTIAssessment';
import BurnoutAssessment from '../components/assessments/BurnoutAssessment';
import SleepAssessment from '../components/assessments/SleepAssessment';
import MoodTracker from '../components/assessments/MoodTracker';
import CapybaraMascot from '../components/CapybaraMascot';

const Assessments: React.FC = () => {
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null);
  const [completedAssessments, setCompletedAssessments] = useState<string[]>([]);

  const assessments = [
    {
      id: 'phq9',
      title: 'PHQ-9 Depression Screening',
      description: 'Evaluate depression symptoms over the past 2 weeks',
      icon: HeartIcon,
      color: 'from-blue-400 to-blue-600',
      duration: '2-3 min',
      questions: 9,
      component: PHQ9Assessment,
      splineUrl: 'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode'
    },
    {
      id: 'gad7',
      title: 'GAD-7 Anxiety Assessment',
      description: 'Measure anxiety levels and symptoms',
      icon: ExclamationTriangleIcon,
      color: 'from-purple-400 to-purple-600',
      duration: '2 min',
      questions: 7,
      component: GAD7Assessment,
      splineUrl: 'https://prod.spline.design/FvWxH7eOyXJtRNil/scene.splinecode'
    },
    {
      id: 'mbti',
      title: 'MBTI Personality Test',
      description: 'Discover your MBTI personality type',
      icon: SparklesIcon,
      color: 'from-amber-500 to-orange-600',
      duration: '5 min',
      questions: 20,
      component: MBTIAssessment,
      splineUrl: 'https://prod.spline.design/Ux0OZCvZSl8Pl5gJ/scene.splinecode'
    },
    {
      id: 'burnout',
      title: 'Burnout Assessment',
      description: 'Check for signs of burnout and exhaustion',
      icon: FireIcon,
      color: 'from-red-500 to-orange-600',
      duration: '3 min',
      questions: 10,
      component: BurnoutAssessment,
      splineUrl: 'https://prod.spline.design/1HiW5KpHQXKsTKQW/scene.splinecode'
    },
    {
      id: 'sleep',
      title: 'Sleep Quality Assessment',
      description: 'Evaluate your sleep patterns and quality',
      icon: MoonIcon,
      color: 'from-indigo-400 to-purple-500',
      duration: '2 min',
      questions: 8,
      component: SleepAssessment,
      splineUrl: 'https://prod.spline.design/NtJqOdXx8WJiH-vE/scene.splinecode'
    },
    {
      id: 'mood',
      title: 'Daily Mood Check-in',
      description: 'Quick mood tracking and insights',
      icon: ChartBarIcon,
      color: 'from-green-400 to-teal-500',
      duration: '1 min',
      questions: 3,
      component: MoodTracker,
      splineUrl: 'https://prod.spline.design/iDGzvpLhMm-QhD8F/scene.splinecode'
    }
  ];

  const handleComplete = (assessmentId: string) => {
    setCompletedAssessments([...completedAssessments, assessmentId]);
    setSelectedAssessment(null);
  };

  const selectedAssessmentData = assessments.find(a => a.id === selectedAssessment);
  const SelectedComponent = selectedAssessmentData?.component;

  return (
    <div className="min-h-screen pt-8 pb-20 px-4">
      <AnimatePresence mode="wait">
        {!selectedAssessment ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-6xl mx-auto"
          >
            {/* Header with 3D Background */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative mb-8 overflow-hidden rounded-3xl glass-effect p-8"
            >
              <div className="absolute inset-0 -z-10">
                <div className="w-full h-full bg-gradient-to-br from-purple-400 to-blue-400 opacity-20 animate-pulse" />
              </div>

              <div className="relative z-10">
                <h1 className="text-4xl font-bold text-white mb-2">
                  Mental Health Assessments
                </h1>
                <div className="flex justify-center mb-4">
                  <CapybaraMascot mood="calm" size="medium" className="w-20 h-20" />
                </div>
                <p className="text-white opacity-90">
                  Take validated assessments to understand your mental health better. All results are private and secure.
                </p>
                
                {/* Stats */}
                <div className="flex flex-wrap gap-4 mt-6">
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-5 h-5 text-green-400" />
                    <span className="text-sm text-white">
                      {completedAssessments.length} Completed Today
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ClipboardDocumentCheckIcon className="w-5 h-5 text-blue-400" />
                    <span className="text-sm text-white">
                      6 Assessments Available
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Assessment Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assessments.map((assessment, index) => {
                const Icon = assessment.icon;
                const isCompleted = completedAssessments.includes(assessment.id);
                
                return (
                  <motion.div
                    key={assessment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <div className="card h-full relative overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all">

                      <div className="relative z-10">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${assessment.color} flex items-center justify-center`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          {isCompleted && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                              Completed
                            </span>
                          )}
                        </div>

                        {/* Content */}
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {assessment.title}
                        </h3>
                        <p className="text-white opacity-90 text-sm mb-4">
                          {assessment.description}
                        </p>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-xs text-white opacity-80 mb-4">
                          <span>⏱️ {assessment.duration}</span>
                          <span>📝 {assessment.questions} questions</span>
                        </div>

                        {/* Action Button */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedAssessment(assessment.id)}
                          className={`w-full py-2 rounded-lg bg-gradient-to-r ${assessment.color} text-white font-medium flex items-center justify-center space-x-2 hover:shadow-lg transition-all`}
                        >
                          <span>{isCompleted ? 'Retake' : 'Start'} Assessment</span>
                          <ArrowRightIcon className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Tips Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 card"
            >
              <h2 className="text-xl font-semibold text-white mb-4">📋 Important Information</h2>
              <div className="space-y-3 text-sm text-white opacity-90">
                <p>• These assessments are screening tools, not diagnostic instruments</p>
                <p>• Your responses are completely private and encrypted</p>
                <p>• For severe symptoms, please consult a mental health professional</p>
                <p>• Crisis support is available 24/7: Call 988 or text HOME to 741741</p>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="assessment"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-3xl mx-auto"
          >
            {SelectedComponent && (
              <SelectedComponent 
                onComplete={() => handleComplete(selectedAssessment)}
                onBack={() => setSelectedAssessment(null)}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Assessments;
