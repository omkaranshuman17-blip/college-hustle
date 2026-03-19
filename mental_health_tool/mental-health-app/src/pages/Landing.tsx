import React, { useState, Suspense, useEffect } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { HeartIcon, SparklesIcon, UserGroupIcon, ShieldCheckIcon, CpuChipIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '../store/authStore';
import FeatureCard from '../components/FeatureCard';
import CapybaraMascot from '../components/CapybaraMascot';
import MoodAssessment from '../components/MoodAssessment';

const Landing: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mainCapybaraMood, setMainCapybaraMood] = useState<any>('happy');
  const [showAssessment, setShowAssessment] = useState(false);
  const { login, register, loginAnonymously, isLoading } = useAuthStore();

  // Rotate through different capybara moods
  const capybaraMoods = ['happy', 'calm', 'curious', 'enjoying', 'nonchalant', 'okay'];
  const [moodIndex, setMoodIndex] = useState(0);

  useEffect(() => {
    const storedMood = localStorage.getItem('userMood');
    if (storedMood) {
      setMainCapybaraMood(storedMood);
      // For testing, always show assessment
      setShowAssessment(true);
    } else {
      setShowAssessment(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(username, password);
      } else {
        await register(username, email, password);
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  const handleAnonymousLogin = async () => {
    try {
      await loginAnonymously();
    } catch (error) {
      console.error('Anonymous login error:', error);
    }
  };

  return (
    <div className="min-h-screen relative overflow-visible">
      {showAssessment && (
        <MoodAssessment
          key="mood-assessment"
          onComplete={(mood) => {
            setMainCapybaraMood(mood);
            localStorage.setItem('userMood', mood);
            setShowAssessment(false);
          }}
          onClose={() => setShowAssessment(false)}
        />
      )}
      {/* Modern gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full">
        </div>
      </div>

      {/* Floating Capybara Companions - Quabble style */}
      <div className="absolute inset-0 pointer-events-none z-5">
        {/* Top left floating capybara */}
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10"
        >
          <CapybaraMascot mood="flying" size="small" className="opacity-60" />
        </motion.div>

        {/* Top right floating capybara */}
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 25, 0],
            rotate: [0, -15, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-32 right-20 hidden md:block"
        >
          <CapybaraMascot mood="tourist" size="small" className="opacity-50" />
        </motion.div>

        {/* Bottom left floating capybara */}
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute bottom-40 left-20 hidden lg:block"
        >
          <CapybaraMascot mood="merchant" size="small" className="opacity-40" />
        </motion.div>

        {/* Middle right floating capybara */}
        <motion.div
          animate={{
            x: [0, -25, 0],
            y: [0, 15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute top-1/2 right-10 hidden xl:block"
        >
          <CapybaraMascot mood="rainy" size="small" className="opacity-45" />
        </motion.div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen px-4 py-8">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-4">
            Mind Wellness
          </h1>
          <p className="text-xl text-black mb-8">We've got a wide range of mind workouts for you</p>
          
          {/* Central Interactive Mascot */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 10 }}
            className="flex justify-center mb-8 cursor-pointer"
            onClick={() => {
              const nextIndex = (moodIndex + 1) % capybaraMoods.length;
              setMoodIndex(nextIndex);
              setMainCapybaraMood(capybaraMoods[nextIndex]);
            }}
          >
            <CapybaraMascot 
              mood={mainCapybaraMood} 
              size="xlarge" 
              className="w-48 h-48" 
              interactive={true}
              animated={true}
            />
          </motion.div>
          
          {/* Capybara mood indicator */}
          <motion.p 
            key={mainCapybaraMood}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-center text-sm text-gray-500 mb-4"
          >
            Click the capybara to change its mood! Currently: {mainCapybaraMood}
          </motion.p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            
            {/* Mind Workouts Card */}
            <FeatureCard
              title="Mind Workouts"
              subtitle="Challenge your mind"
              description="Boost your cognitive abilities with fun, engaging exercises designed to improve focus and mental agility."
              backgroundGradient="bg-gradient-to-br from-pink-200 to-pink-300"
              textColor="text-pink-800"
              link="/games"
              mascotMood="studying"
              quabbleStyle={true}
            >
              <div className="flex items-center space-x-2 text-pink-700">
                <CpuChipIcon className="w-5 h-5" />
                <span className="text-sm">Daily Exercises</span>
              </div>
            </FeatureCard>

            {/* Express Yourself Card */}
            <FeatureCard
              title="Express Yourself"
              subtitle="Anonymously & get support"
              description="Share your thoughts and feelings in a safe, supportive environment. Your message will be delivered safely."
              backgroundGradient="bg-gradient-to-br from-blue-400 to-blue-600"
              textColor="text-white"
              link="/chatbot"
              mascotMood="waiting"
              quabbleStyle={true}
            >
              <div className="flex items-center space-x-2 text-blue-100">
                <ChatBubbleLeftRightIcon className="w-5 h-5" />
                <span className="text-sm">Safe Space</span>
              </div>
            </FeatureCard>

            {/* Emotional Well-being Card */}
            <FeatureCard
              title="Improve Emotional"
              subtitle="Well-being with specially designed practices"
              description="Take a moment to reflect on grateful memories with our Gratitude Jar practice."
              backgroundGradient="bg-gradient-to-br from-green-400 to-green-600"
              textColor="text-white"
              link="/tasks"
              mascotMood="meditate"
            >
              <div className="flex items-center space-x-2 text-green-100">
                <HeartIcon className="w-5 h-5" />
                <span className="text-sm">Gratitude Jar</span>
              </div>
            </FeatureCard>

            {/* Stress Relief Card */}
            <FeatureCard
              title="Ease Stress,"
              subtitle="Anxiety & Depression"
              description="Discover effective techniques to manage stress and improve your overall mental well-being with guided practices."
              backgroundGradient="bg-gradient-to-br from-cyan-200 to-cyan-400"
              textColor="text-cyan-800"
              link="/assessments"
              mascotMood="lazy"
              quabbleStyle={true}
            >
              <div className="flex items-center space-x-2 text-cyan-700">
                <SparklesIcon className="w-5 h-5" />
                <span className="text-sm">Box Breathing</span>
              </div>
            </FeatureCard>
          </div>
        </div>

        {/* Auth Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="max-w-md mx-auto"
        >
          {/* Auth Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-effect rounded-3xl p-8 backdrop-blur-xl bg-white/80 shadow-2xl"
          >
            <div className="mb-6">
              <div className="flex justify-center space-x-4 mb-6">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`px-4 py-2 rounded-full transition-all ${
                    isLogin 
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`px-4 py-2 rounded-full transition-all ${
                    !isLogin 
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur border border-gray-200 focus:border-blue-500 focus:outline-none transition-all"
                    required
                  />
                </div>

                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur border border-gray-200 focus:border-blue-500 focus:outline-none transition-all"
                      required={!isLogin}
                    />
                  </motion.div>
                )}

                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur border border-gray-200 focus:border-blue-500 focus:outline-none transition-all"
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold hover:from-blue-600 hover:to-green-600 transition-all shadow-lg disabled:opacity-50"
                >
                  {isLoading ? 'Loading...' : (isLogin ? 'Sign In' : 'Create Account')}
                </motion.button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white/80 text-gray-500">Or continue with</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAnonymousLogin}
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-400 text-white font-semibold hover:from-cyan-500 hover:to-blue-500 transition-all shadow-lg disabled:opacity-50"
              >
                <span className="flex items-center justify-center space-x-2">
                  <ShieldCheckIcon className="w-5 h-5" />
                  <span>Continue Anonymously</span>
                </span>
              </motion.button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Your privacy is our priority. All data is encrypted and anonymous options available.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating 3D Elements */}
      <motion.div
        className="absolute top-20 right-20 w-20 h-20 bg-gradient-to-br from-saffron-400 to-gold-400 rounded-full opacity-30 blur-xl"
        animate={{
          y: [0, 30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-br from-emerald-400 to-college-400 rounded-full opacity-30 blur-xl"
        animate={{
          y: [0, -20, 0],
          x: [0, -10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default Landing;
