import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CapybaraMascot from './CapybaraMascot';

interface CapybaraMood {
  mood: any;
  label: string;
  description: string;
  color: string;
}

const CapybaraGallery: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<CapybaraMood | null>(null);

  const capybaraMoods: CapybaraMood[] = [
    { mood: 'happy', label: 'Happy', description: 'Enjoying life!', color: 'bg-yellow-100' },
    { mood: 'calm', label: 'Calm', description: 'Just vibing', color: 'bg-blue-100' },
    { mood: 'sleeping', label: 'Sleepy', description: 'Time for a nap', color: 'bg-purple-100' },
    { mood: 'excited', label: 'Excited', description: 'So much joy!', color: 'bg-pink-100' },
    { mood: 'meditate', label: 'Meditating', description: 'Finding inner peace', color: 'bg-green-100' },
    { mood: 'confused', label: 'Confused', description: 'What\'s happening?', color: 'bg-orange-100' },
    { mood: 'lazy', label: 'Lazy', description: 'Too comfy to move', color: 'bg-indigo-100' },
    { mood: 'studying', label: 'Studying', description: 'Learning new things', color: 'bg-teal-100' },
    { mood: 'waiting', label: 'Waiting', description: 'Patiently waiting', color: 'bg-gray-100' },
    { mood: 'leaving', label: 'Leaving', description: 'Time to go!', color: 'bg-red-100' },
    { mood: 'okay', label: 'Okay', description: 'Everything\'s fine', color: 'bg-lime-100' },
    { mood: 'tired', label: 'Tired', description: 'Need some rest', color: 'bg-amber-100' },
    { mood: 'flying', label: 'Flying', description: 'Up in the clouds!', color: 'bg-sky-100' },
    { mood: 'enjoying', label: 'Enjoying', description: 'Having a good time', color: 'bg-rose-100' },
    { mood: 'rainy', label: 'Rainy', description: 'Cozy weather', color: 'bg-slate-100' },
    { mood: 'nonchalant', label: 'Nonchalant', description: 'Whatever happens', color: 'bg-stone-100' },
    { mood: 'stunned', label: 'Stunned', description: 'Wow!', color: 'bg-violet-100' },
    { mood: 'curious', label: 'Curious', description: 'What\'s that?', color: 'bg-cyan-100' },
    { mood: 'merchant', label: 'Merchant', description: 'Open for business', color: 'bg-emerald-100' },
    { mood: 'tourist', label: 'Tourist', description: 'Exploring the world', color: 'bg-fuchsia-100' }
  ];

  return (
    <div className="p-8 bg-gradient-to-br from-yellow-50 to-brown-50 rounded-3xl">
      <h2 className="text-3xl font-bold text-center mb-2" style={{ color: '#b08554' }}>
        Capybara Mood Gallery
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Click on any capybara to see how they're feeling today!
      </p>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {capybaraMoods.map((capybaraMood, index) => (
          <motion.div
            key={capybaraMood.mood}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.1, rotate: [-2, 2, -2, 0] }}
            whileTap={{ scale: 0.95 }}
            className={`
              relative p-4 rounded-2xl cursor-pointer transition-all duration-300
              ${capybaraMood.color} hover:shadow-xl
              ${selectedMood?.mood === capybaraMood.mood ? 'ring-4 ring-yellow-400' : ''}
            `}
            onClick={() => setSelectedMood(capybaraMood)}
            style={{
              background: selectedMood?.mood === capybaraMood.mood 
                ? 'linear-gradient(135deg, #f9d23f 0%, #fefdfb 100%)' 
                : ''
            }}
          >
            <CapybaraMascot
              mood={capybaraMood.mood}
              size="medium"
              className="w-20 h-20 mx-auto mb-2"
              animated={true}
              interactive={false}
            />
            <p className="text-center text-sm font-semibold" style={{ color: '#5a3a1c' }}>
              {capybaraMood.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Selected Mood Details */}
      <AnimatePresence mode="wait">
        {selectedMood && (
          <motion.div
            key={selectedMood.mood}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 p-6 rounded-2xl shadow-lg"
            style={{ 
              background: 'linear-gradient(135deg, #fefdfb 0%, #f9d23f 100%)',
              border: '2px solid #b08554'
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <CapybaraMascot
                  mood={selectedMood.mood}
                  size="large"
                  className="w-24 h-24"
                  animated={true}
                  interactive={true}
                />
                <div>
                  <h3 className="text-2xl font-bold" style={{ color: '#5a3a1c' }}>
                    {selectedMood.label} Capybara
                  </h3>
                  <p className="text-lg" style={{ color: '#b08554' }}>
                    {selectedMood.description}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedMood(null)}
                className="px-4 py-2 rounded-full font-semibold"
                style={{ 
                  backgroundColor: '#b08554',
                  color: '#fefdfb'
                }}
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CapybaraGallery;
