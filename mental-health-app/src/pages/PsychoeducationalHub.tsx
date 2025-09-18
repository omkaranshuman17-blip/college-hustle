import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlayIcon, 
  PauseIcon, 
  BookOpenIcon, 
  VideoCameraIcon, 
  SpeakerWaveIcon,
  LanguageIcon,
  HeartIcon,
  LightBulbIcon,
  MoonIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'audio' | 'guide';
  category: 'stress' | 'anxiety' | 'depression' | 'sleep' | 'mindfulness' | 'relationships';
  language: 'english' | 'hindi' | 'spanish' | 'tamil' | 'telugu' | 'bengali';
  duration?: string;
  url?: string;
  content?: string;
  thumbnail?: string;
}

const sampleResources: Resource[] = [
  {
    id: '1',
    title: 'Deep Breathing for Anxiety Relief',
    description: 'Learn effective breathing techniques to manage anxiety and stress in daily life.',
    type: 'video',
    category: 'anxiety',
    language: 'english',
    duration: '8:45',
    url: '/videos/breathing-anxiety.mp4',
    thumbnail: '/thumbnails/breathing.jpg'
  },
  {
    id: '2',
    title: 'चिंता से निपटने के तरीके',
    description: 'दैनिक जीवन में चिंता को कम करने के लिए प्रभावी तकनीकें सीखें।',
    type: 'audio',
    category: 'anxiety',
    language: 'hindi',
    duration: '12:30',
    url: '/audio/anxiety-hindi.mp3'
  },
  {
    id: '3',
    title: 'Sleep Hygiene Guide',
    description: 'Complete guide to better sleep habits and creating a restful environment.',
    type: 'guide',
    category: 'sleep',
    language: 'english',
    content: `# Sleep Hygiene Guide

## Creating the Perfect Sleep Environment
- Keep your bedroom cool (60-67°F)
- Use blackout curtains or eye masks
- Minimize noise with earplugs or white noise
- Invest in a comfortable mattress and pillows

## Pre-Sleep Routine
- Establish a consistent bedtime routine
- Stop screen time 1 hour before bed
- Practice relaxation techniques
- Consider light stretching or meditation

## Daily Habits for Better Sleep
- Get sunlight exposure in the morning
- Avoid caffeine after 2 PM
- Exercise regularly, but not close to bedtime
- Limit naps to 20-30 minutes before 3 PM`
  },
  {
    id: '4',
    title: 'Mindfulness Meditation',
    description: 'Guided meditation session for beginners to practice mindfulness.',
    type: 'audio',
    category: 'mindfulness',
    language: 'english',
    duration: '15:00',
    url: '/audio/mindfulness-meditation.mp3'
  },
  {
    id: '5',
    title: 'তানাখার সাথে মোকাবিলা',
    description: 'স্ট্রেস এবং চাপের সাথে কিভাবে কার্যকরভাবে মোকাবিলা করবেন।',
    type: 'video',
    category: 'stress',
    language: 'bengali',
    duration: '10:20',
    url: '/videos/stress-bengali.mp4'
  },
  {
    id: '6',
    title: 'Building Healthy Relationships',
    description: 'Learn communication skills and boundary setting for healthier relationships.',
    type: 'guide',
    category: 'relationships',
    language: 'english',
    content: `# Building Healthy Relationships

## Communication Fundamentals
- Practice active listening
- Use "I" statements instead of "you" statements
- Express your needs clearly and kindly
- Ask open-ended questions

## Setting Boundaries
- Identify your limits and values
- Communicate boundaries clearly
- Be consistent in enforcing boundaries
- Respect others' boundaries

## Conflict Resolution
- Address issues early before they escalate
- Focus on the behavior, not the person
- Look for win-win solutions
- Take breaks when emotions are high`
  }
];

const categories = [
  { id: 'all', name: 'All Resources', icon: BookOpenIcon, color: 'bg-purple-300 text-purple-900' },
  { id: 'stress', name: 'Stress Management', icon: ShieldCheckIcon, color: 'bg-red-300 text-red-900' },
  { id: 'anxiety', name: 'Anxiety Relief', icon: HeartIcon, color: 'bg-blue-300 text-blue-900' },
  { id: 'depression', name: 'Depression Support', icon: LightBulbIcon, color: 'bg-green-300 text-green-900' },
  { id: 'sleep', name: 'Sleep Health', icon: MoonIcon, color: 'bg-indigo-300 text-indigo-900' },
  { id: 'mindfulness', name: 'Mindfulness', icon: LightBulbIcon, color: 'bg-teal-300 text-teal-900' },
  { id: 'relationships', name: 'Relationships', icon: HeartIcon, color: 'bg-pink-300 text-pink-900' }
];

const languages = [
  { id: 'all', name: 'All Languages', flag: '🌐' },
  { id: 'english', name: 'English', flag: '🇺🇸' },
  { id: 'hindi', name: 'हिंदी', flag: '🇮🇳' },
  { id: 'spanish', name: 'Español', flag: '🇪🇸' },
  { id: 'tamil', name: 'தமிழ்', flag: '🇮🇳' },
  { id: 'telugu', name: 'తెలుగు', flag: '🇮🇳' },
  { id: 'bengali', name: 'বাংলা', flag: '🇧🇩' }
];

const PsychoeducationalHub: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const filteredResources = sampleResources.filter(resource => {
    const categoryMatch = selectedCategory === 'all' || resource.category === selectedCategory;
    const languageMatch = selectedLanguage === 'all' || resource.language === selectedLanguage;
    return categoryMatch && languageMatch;
  });

  const handleResourceSelect = (resource: Resource) => {
    setSelectedResource(resource);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handlePlayPause = () => {
    if (!selectedResource || selectedResource.type !== 'audio') return;
    
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (selectedResource && selectedResource.type === 'audio' && audioRef.current) {
      audioRef.current.addEventListener('ended', () => setIsPlaying(false));
      audioRef.current.addEventListener('pause', () => setIsPlaying(false));
      audioRef.current.addEventListener('play', () => setIsPlaying(true));
    }
  }, [selectedResource]);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video': return VideoCameraIcon;
      case 'audio': return SpeakerWaveIcon;
      case 'guide': return BookOpenIcon;
      default: return BookOpenIcon;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-red-300 text-red-900';
      case 'audio': return 'bg-green-300 text-green-900';
      case 'guide': return 'bg-blue-300 text-blue-900';
      default: return 'bg-gray-300 text-gray-900';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-300 to-pink-400">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            📚 Psychoeducational Resource Hub
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover evidence-based mental health resources including videos, guided audio, 
            and comprehensive guides available in multiple regional languages.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <BookOpenIcon className="w-5 h-5" />
              Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                      selectedCategory === category.id
                        ? category.color + ' shadow-md scale-105'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <LanguageIcon className="w-5 h-5" />
              Languages
            </h3>
            <div className="flex flex-wrap gap-2">
              {languages.map((language) => (
                <button
                  key={language.id}
                  onClick={() => setSelectedLanguage(language.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    selectedLanguage === language.id
                      ? 'bg-purple-200 text-purple-700 shadow-md scale-105'
                      : 'bg-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{language.flag}</span>
                  {language.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Resource List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Resources ({filteredResources.length})
            </h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredResources.map((resource) => {
                const IconComponent = getResourceIcon(resource.type);
                return (
                  <motion.div
                    key={resource.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleResourceSelect(resource)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedResource?.id === resource.id
                        ? 'border-purple-300 bg-purple-300 shadow-md'
                        : 'border-gray-200 bg-gray-200 hover:border-gray-400 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${getTypeColor(resource.type)}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 text-sm mb-1">
                          {resource.title}
                        </h4>
                        <p className="text-xs text-gray-600 mb-2">
                          {resource.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="capitalize">{resource.type}</span>
                          {resource.duration && (
                            <>
                              <span>•</span>
                              <span>{resource.duration}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Resource Viewer */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <AnimatePresence mode="wait">
              {selectedResource ? (
                <motion.div
                  key={selectedResource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-gray-200 rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-lg ${getTypeColor(selectedResource.type)}`}>
                      {React.createElement(getResourceIcon(selectedResource.type), { className: "w-6 h-6" })}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {selectedResource.title}
                      </h3>
                      <p className="text-gray-600">
                        {selectedResource.description}
                      </p>
                    </div>
                  </div>

                  {/* Video Player */}
                  {selectedResource.type === 'video' && (
                    <div className="mb-6">
                      <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                        <div className="text-white text-center">
                          <VideoCameraIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <p className="text-lg">Video Player</p>
                          <p className="text-sm opacity-75">
                            Duration: {selectedResource.duration}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Audio Player */}
                  {selectedResource.type === 'audio' && (
                    <div className="mb-6">
                      <div className="bg-gradient-to-r from-purple-300 to-blue-400 rounded-lg p-6">
                        <div className="flex items-center justify-center mb-4">
                          <SpeakerWaveIcon className="w-16 h-16 text-purple-600" />
                        </div>
                        <div className="flex items-center justify-center gap-4">
                          <button
                            onClick={handlePlayPause}
                            className="p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                          >
                            {isPlaying ? (
                              <PauseIcon className="w-6 h-6" />
                            ) : (
                              <PlayIcon className="w-6 h-6" />
                            )}
                          </button>
                          <div className="text-center">
                            <p className="font-medium text-gray-700">
                              {selectedResource.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              Duration: {selectedResource.duration}
                            </p>
                          </div>
                        </div>
                        <audio
                          ref={audioRef}
                          src={selectedResource.url}
                          onEnded={() => setIsPlaying(false)}
                        />
                      </div>
                    </div>
                  )}

                  {/* Guide Content */}
                  {selectedResource.type === 'guide' && selectedResource.content && (
                    <div className="mb-6">
                      <div className="prose prose-gray max-w-none bg-gray-300 rounded-lg p-6">
                        <div className="whitespace-pre-line text-gray-700">
                          {selectedResource.content}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-gray-300 rounded-xl shadow-lg p-12 text-center"
                >
                  <BookOpenIcon className="w-24 h-24 mx-auto mb-6 text-gray-300" />
                  <h3 className="text-2xl font-bold text-gray-700 mb-4">
                    Select a Resource
                  </h3>
                  <p className="text-gray-800">
                    Choose from videos, audio guides, or written materials to begin your learning journey.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PsychoeducationalHub;
