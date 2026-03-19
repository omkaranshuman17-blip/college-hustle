import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  HeartIcon,
  ClockIcon,
  FlagIcon,
  StarIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

interface User {
  id: string;
  username: string;
  avatar: string;
  role: 'member' | 'volunteer' | 'moderator';
  joinDate: string;
  helpfulPosts: number;
  isOnline: boolean;
  badges: string[];
}

interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  timestamp: string;
  category: 'general' | 'anxiety' | 'depression' | 'stress' | 'relationships' | 'study-tips';
  replies: Reply[];
  likes: number;
  isLiked: boolean;
  isAnonymous: boolean;
  tags: string[];
  status: 'open' | 'resolved' | 'moderated';
}

interface Reply {
  id: string;
  content: string;
  author: User;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  isHelpful: boolean;
}

interface TrainingModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  topics: string[];
}

// Sample data
const sampleUsers: User[] = [
  {
    id: '1',
    username: 'Simran',
    avatar: '👩‍⚕️',
    role: 'volunteer',
    joinDate: '2023-08-15',
    helpfulPosts: 45,
    isOnline: true,
    badges: ['Supportive', 'Active Listener', 'Crisis Helper']
  },
  {
    id: '2',
    username: 'MindfulMisi',
    avatar: '🧘‍♂️',
    role: 'member',
    joinDate: '2023-11-20',
    helpfulPosts: 12,
    isOnline: false,
    badges: ['Grateful', 'Mindful']
  },
  {
    id: '3',
    username: 'Dr_Jasaswi',
    avatar: '👩‍🏫',
    role: 'moderator',
    joinDate: '2023-01-10',
    helpfulPosts: 156,
    isOnline: true,
    badges: ['Expert', 'Moderator', 'Crisis Specialist', 'Mentor']
  }
];

const samplePosts: Post[] = [
  {
    id: '1',
    title: 'Feeling overwhelmed with college stress',
    content: 'I\'m in my third year of college and feeling incredibly overwhelmed. Between coursework, part-time work, and personal relationships, I feel like I\'m drowning. Has anyone else experienced this? How did you cope?',
    author: sampleUsers[1],
    timestamp: '2024-01-15T10:30:00Z',
    category: 'stress',
    replies: [
      {
        id: '1-1',
        content: 'I completely understand how you\'re feeling. College can be incredibly overwhelming. What helped me was breaking down my tasks into smaller, manageable chunks and prioritizing self-care. Have you tried creating a daily schedule that includes time for relaxation?',
        author: sampleUsers[0],
        timestamp: '2024-01-15T11:45:00Z',
        likes: 8,
        isLiked: false,
        isHelpful: true
      }
    ],
    likes: 15,
    isLiked: false,
    isAnonymous: false,
    tags: ['college', 'stress', 'time-management'],
    status: 'open'
  },
  {
    id: '2',
    title: 'Anonymous: Struggling with social anxiety',
    content: 'I find it really hard to talk to people, even in everyday situations like ordering food or asking questions in class. It\'s affecting my daily life and I don\'t know where to start improving.',
    author: { ...sampleUsers[1], username: 'Anonymous User', avatar: '😷' },
    timestamp: '2024-01-14T16:20:00Z',
    category: 'anxiety',
    replies: [
      {
        id: '2-1',
        content: 'Thank you for sharing this - it takes courage to reach out. Social anxiety is very common and you\'re not alone. Starting small can help - maybe practice brief interactions in low-pressure situations. Would you like some specific techniques to try?',
        author: sampleUsers[2],
        timestamp: '2024-01-14T17:00:00Z',
        likes: 12,
        isLiked: false,
        isHelpful: true
      }
    ],
    likes: 23,
    isLiked: false,
    isAnonymous: true,
    tags: ['social-anxiety', 'daily-life', 'support'],
    status: 'open'
  }
];

const trainingModules: TrainingModule[] = [
  {
    id: '1',
    title: 'Active Listening Fundamentals',
    description: 'Learn the core skills of active listening to provide better peer support.',
    duration: '45 minutes',
    completed: true,
    topics: ['Empathy', 'Non-judgmental responses', 'Reflective listening']
  },
  {
    id: '2',
    title: 'Crisis Recognition and Response',
    description: 'Identify signs of mental health crises and learn appropriate response protocols.',
    duration: '60 minutes',
    completed: true,
    topics: ['Warning signs', 'De-escalation', 'Resource referrals']
  },
  {
    id: '3',
    title: 'Cultural Sensitivity in Mental Health',
    description: 'Understand cultural differences in mental health experiences and expressions.',
    duration: '30 minutes',
    completed: false,
    topics: ['Cultural awareness', 'Inclusive communication', 'Diverse perspectives']
  },
  {
    id: '4',
    title: 'Boundaries and Self-Care for Volunteers',
    description: 'Learn to maintain healthy boundaries while providing peer support.',
    duration: '40 minutes',
    completed: false,
    topics: ['Setting limits', 'Avoiding burnout', 'Self-care strategies']
  }
];

const categories = [
  { id: 'all', name: 'All Discussions', icon: ChatBubbleLeftRightIcon, color: 'bg-purple-300 text-purple-700' },
  { id: 'general', name: 'General Support', icon: HeartIcon, color: 'bg-pink-300 text-pink-700' },
  { id: 'anxiety', name: 'Anxiety', icon: ShieldCheckIcon, color: 'bg-blue-300 text-blue-700' },
  { id: 'depression', name: 'Depression', icon: HeartIcon, color: 'bg-green-300 text-green-700' },
  { id: 'stress', name: 'Stress Management', icon: ExclamationTriangleIcon, color: 'bg-red-300 text-red-700' },
  { id: 'relationships', name: 'Relationships', icon: UserGroupIcon, color: 'bg-yellow-300 text-yellow-700' },
  { id: 'study-tips', name: 'Study Tips', icon: AcademicCapIcon, color: 'bg-indigo-300 text-indigo-700' }
];

const PeerSupportPlatform: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'forum' | 'training' | 'volunteers'>('forum');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [posts, setPosts] = useState(samplePosts);

  const filteredPosts = posts.filter(post => {
    const categoryMatch = selectedCategory === 'all' || post.category === selectedCategory;
    const searchMatch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - postTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'moderator': return 'bg-red-200 text-red-700';
      case 'volunteer': return 'bg-green-200 text-green-700';
      case 'member': return 'bg-blue-200 text-blue-700';
      default: return 'bg-gray-200 text-gray-900';
    }
  };

  const NewPostModal = () => (
    <AnimatePresence>
      {isNewPostModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-600 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Create New Post</h3>
              <button
                onClick={() => setIsNewPostModalOpen(false)}
                className="p-2 hover:bg-gray-400 rounded-lg transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Title</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-800 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="What would you like to discuss?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Category</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  {categories.slice(1).map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Content</label>
                <textarea
                  rows={6}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Share your thoughts, questions, or experiences..."
                />
              </div>
              
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-900">Post anonymously</span>
                </label>
              </div>
              
              <div className="flex items-center gap-3 pt-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Create Post
                </button>
                <button
                  type="button"
                  onClick={() => setIsNewPostModalOpen(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-violet-500 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const ForumTab = () => (
    <div>
      {/* Search and Create Post */}
      <div className="bg-blue-300 rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setIsNewPostModalOpen(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <PlusIcon className="w-4 h-4" />
            New Post
          </button>
        </div>
        
        {/* Categories */}
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? category.color + ' shadow-md scale-105'
                      : 'bg-blue-300 text-gray-900 hover:bg-green-500'
                  }`}
                >
                  <IconComponent className="w-3 h-3" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <motion.div
            key={post.id}
            whileHover={{ scale: 1.01 }}
            className="bg-yellow-400 dow-sm p-6 cursor-pointer transition-all duration-200 hover:shadow-md"
            onClick={() => setSelectedPost(post)}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center text-lg">
                  {post.author.avatar}
                </div>
                {post.author.isOnline && (
                  <div className="w-3 h-3 bg-green-600 rounded-full border-2 border-white -mt-2 ml-7"></div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-gray-800">
                    {post.isAnonymous ? 'Anonymous User' : post.author.username}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getRoleColor(post.author.role)}`}>
                    {post.author.role}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatTimeAgo(post.timestamp)}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-900 mb-3 line-clamp-2">
                  {post.content}
                </p>
                
                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLikePost(post.id);
                    }}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
                      post.isLiked
                        ? 'bg-red-500 text-red-600'
                        : 'bg-pink-500 text-gray-900 hover:bg-pink-500'
                    }`}
                  >
                    {post.isLiked ? (
                      <HeartSolidIcon className="w-4 h-4" />
                    ) : (
                      <HeartIcon className="w-4 h-4" />
                    )}
                    {post.likes}
                  </button>
                  
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <ChatBubbleLeftRightIcon className="w-4 h-4" />
                    {post.replies.length} replies
                  </span>
                  
                  <div className="flex gap-1">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blue-200 text-blue-600 text-xs rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const TrainingTab = () => (
    <div>
      <div className="bg-pink-500 rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Volunteer Training Program</h2>
        <p className="text-gray-900">
          Complete these modules to become a certified peer support volunteer.
        </p>
      </div>
      
      <div className="grid gap-4">
        {trainingModules.map((module) => (
          <motion.div
            key={module.id}
            whileHover={{ scale: 1.01 }}
            className="bg-pink-500 rounded-xl shadow-sm p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{module.title}</h3>
                  {module.completed && (
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  )}
                </div>
                <p className="text-gray-900 mb-3">{module.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    {module.duration}
                  </span>
                </div>
                <div className="mt-3">
                  <div className="flex flex-wrap gap-1">
                    {module.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-1 bg-purple-200 text-purple-800 text-xs rounded"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="ml-4">
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    module.completed
                      ? 'bg-green-300 text-green-700 cursor-default'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                  disabled={module.completed}
                >
                  {module.completed ? 'Completed' : 'Start Module'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const VolunteersTab = () => (
    <div>
      <div className="bg-blue-300 rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Our Volunteers</h2>
        <p className="text-gray-800">
          Meet our trained peer support volunteers who are here to help.
        </p>
      </div>
      
      <div className="grid gap-4">
        {sampleUsers.filter(user => user.role !== 'member').map((volunteer) => (
          <motion.div
            key={volunteer.id}
            whileHover={{ scale: 1.01 }}
            className="bg-blue-300 rounded-xl shadow-sm p-6"
          >
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center text-2xl">
                  {volunteer.avatar}
                </div>
                {volunteer.isOnline && (
                  <div className="w-4 h-4 bg-green-400 rounded-full border-2 border-white absolute -bottom-1 -right-1"></div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{volunteer.username}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${getRoleColor(volunteer.role)}`}>
                    {volunteer.role}
                  </span>
                  <span className="text-sm text-gray-500">
                    {volunteer.isOnline ? '🟢 Online' : '⭕ Offline'}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-900 mb-3">
                  <span>Joined: {new Date(volunteer.joinDate).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1">
                    <StarIcon className="w-4 h-4" />
                    {volunteer.helpfulPosts} helpful posts
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {volunteer.badges.map((badge) => (
                    <span
                      key={badge}
                      className="px-2 py-1 bg-yellow-300 text-yellow-900 text-xs rounded border border-yellow-200"
                    >
                      🏆 {badge}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
                  Send Message
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  View Profile
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-blue-200 to-pink-500">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🤝 Peer Support Platform
          </h1>
          <p className="text-lg text-gray-900 max-w-3xl mx-auto">
            Connect with fellow students, share experiences, and get support from trained volunteers 
            in a safe, moderated community environment.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-pink-300 rounded-xl shadow-sm p-2 inline-flex">
            <button
              onClick={() => setActiveTab('forum')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'forum'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-gray-900 hover:bg-pink-500'
              }`}
            >
              <ChatBubbleLeftRightIcon className="w-5 h-5" />
              Forum
            </button>
            <button
              onClick={() => setActiveTab('training')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'training'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-gray-900 hover:bg-pink-500'
              }`}
            >
              <AcademicCapIcon className="w-5 h-5" />
              Training
            </button>
            <button
              onClick={() => setActiveTab('volunteers')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'volunteers'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-gray-900 hover:bg-pink-500'
              }`}
            >
              <UserGroupIcon className="w-5 h-5" />
              Volunteers
            </button>
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'forum' && <ForumTab />}
          {activeTab === 'training' && <TrainingTab />}
          {activeTab === 'volunteers' && <VolunteersTab />}
        </motion.div>
      </div>

      {/* New Post Modal */}
      <NewPostModal />
    </div>
  );
};

export default PeerSupportPlatform;
