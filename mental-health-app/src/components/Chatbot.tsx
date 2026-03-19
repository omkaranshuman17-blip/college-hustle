import React, { useState, useEffect, useRef } from 'react';
import { Send, AlertTriangle, Phone, MapPin, Book, X, Bot, Heart, Smile, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import axios from 'axios';

// Declare Web Speech API types
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  start(): void;
  stop(): void;
}

declare global {
  interface Window {
    SpeechRecognition: {
      new(): SpeechRecognition;
    };
    webkitSpeechRecognition: {
      new(): SpeechRecognition;
    };
  }
}

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  crisis?: boolean;
  suggestions?: string[];
  resources?: any[];
}

interface Therapist {
  id: string;
  name: string;
  specialty: string[];
  address: string;
  phone: string;
  distance?: number;
  rating?: number;
  acceptingNewPatients: boolean;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [showTherapists, setShowTherapists] = useState(false);
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [showEducation, setShowEducation] = useState(false);
  const [educationTopic, setEducationTopic] = useState('');
  const [showCrisisResources, setShowCrisisResources] = useState(false);
  const [botEmotion, setBotEmotion] = useState<'caring' | 'supportive' | 'concerned' | 'celebrating'>('caring');
  const [isTypingWithHeart, setIsTypingWithHeart] = useState(false);
  
  // Voice input/output states
  const [isRecording, setIsRecording] = useState(false);
  const [isTTSEnabled, setIsTTSEnabled] = useState(true);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add welcome message
    setMessages([
        {
          id: '1',
          role: 'assistant',
          content: "Hey there! 🙏💚 I'm CapyBro, your digital friend who genuinely cares.\n\n✨ Whatever you're going through - exam stress, family pressure, loneliness, or anything else - you're not alone. I'm here to listen and support you.\n\n💙 How are you feeling today, mate?",
          timestamp: new Date(),
          suggestions: [
            '😰 Academic stress is overwhelming me',
            '👨‍👩‍👧 Family pressure about career choices', 
            '🏠 Feeling homesick in hostel',
            '🧘 Show me Indian coping techniques',
            '💚 I need someone to talk to right now',
            '🎓 Connect me with campus counselor'
          ]
        }
    ]);

    // Setup SpeechRecognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsRecording(false);
        // Optionally auto-send after voice input
        // handleSendMessage(); // Uncomment if auto-send desired
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    } else {
      console.warn('SpeechRecognition API not supported in this browser.');
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const detectEmotionalContext = (message: string): 'caring' | 'supportive' | 'concerned' | 'celebrating' => {
    const lowerMessage = message.toLowerCase();
    
    // Crisis or very negative emotions
    if (lowerMessage.includes('suicide') || lowerMessage.includes('die') || lowerMessage.includes('hopeless') ||
        lowerMessage.includes('worthless') || lowerMessage.includes('can\'t go on')) {
      return 'concerned';
    }
    // Positive emotions or achievements
    else if (lowerMessage.includes('better') || lowerMessage.includes('good') || lowerMessage.includes('happy') ||
             lowerMessage.includes('grateful') || lowerMessage.includes('accomplished') || lowerMessage.includes('proud')) {
      return 'celebrating';
    }
    // Stress, anxiety, sadness - need extra support
    else if (lowerMessage.includes('stress') || lowerMessage.includes('anxi') || lowerMessage.includes('overwhelm') ||
             lowerMessage.includes('sad') || lowerMessage.includes('depress') || lowerMessage.includes('lonely')) {
      return 'supportive';
    }
    // Default caring state
    return 'caring';
  };


  const getEmotionalIcon = (emotion: string) => {
    switch (emotion) {
      case 'concerned':
        return <Heart className="w-6 h-6 text-red-400 animate-pulse" />;
      case 'celebrating':
        return <Smile className="w-6 h-6 text-green-500 animate-bounce" />;
      case 'supportive':
        return <Heart className="w-6 h-6 text-purple-400 animate-pulse" />;
      default: // caring
        return <Heart className="w-6 h-6 text-emerald-400 animate-pulse" />;
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsTypingWithHeart(true);
    
    // Detect emotional context and update bot's state
    const emotionalContext = detectEmotionalContext(inputMessage);
    setBotEmotion(emotionalContext);

    try {
      const response = await axios.post('http://localhost:5000/api/ai/chat', {
        message: inputMessage,
        sessionId: sessionId,
        userId: localStorage.getItem('userId') // If user is logged in
      });

      const { message, suggestions, crisis, resources, sessionId: newSessionId } = response.data;

      if (!sessionId && newSessionId) {
        setSessionId(newSessionId);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: message,
        timestamp: new Date(),
        crisis,
        suggestions,
        resources
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Show crisis resources automatically if crisis detected
      if (crisis) {
        setShowCrisisResources(true);
        setBotEmotion('concerned');
      }

      // Text-to-Speech for assistant message if enabled
      if (isTTSEnabled && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
      }
      
      // Add a small delay to show the bot "thinking with care"
      setTimeout(() => setIsTypingWithHeart(false), 500);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment. If you\'re in crisis, please call 988 or your local emergency services.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setBotEmotion('caring'); // Stay caring even during errors
    } finally {
      setIsLoading(false);
      setIsTypingWithHeart(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const findTherapists = async () => {
    setIsLoading(true);
    try {
      // Try to get user's location
      const locationResponse = await axios.get('http://localhost:5000/api/ai/location');
      const location = locationResponse.data.location || 'New York, NY'; // Default location

      const response = await axios.post('http://localhost:5000/api/ai/therapists/nearby', {
        location,
        radius: 10000,
        specialty: ''
      });

      setTherapists(response.data.therapists);
      setShowTherapists(true);
    } catch (error) {
      console.error('Error finding therapists:', error);
      // Use mock data if API fails
      setTherapists([
        {
          id: '1',
          name: 'Dr. Sarah Johnson, PhD',
          specialty: ['Anxiety', 'Depression', 'CBT'],
          address: '123 Wellness Center Dr',
          phone: '(555) 123-4567',
          distance: 2.5,
          rating: 4.8,
          acceptingNewPatients: true
        }
      ]);
      setShowTherapists(true);
    } finally {
      setIsLoading(false);
    }
  };

  const getCrisisResources = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/ai/crisis-resources/US');
      return response.data.hotlines;
    } catch (error) {
      // Return default resources
      return [
        {
          name: '988 Suicide & Crisis Lifeline',
          number: '988',
          text: 'Text HOME to 741741',
          available: '24/7'
        }
      ];
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto dark:bg-gray-800 bg-white rounded-lg shadow-xl">
      {/* Header */}
      <div className="college-header text-white p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Bot className="w-8 h-8" />
              <div className="absolute -top-1 -right-1">
                {getEmotionalIcon(botEmotion)}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold font-college flex items-center gap-2">
                CapyBro - Campus Wellness Companion
                {isTypingWithHeart && <Heart className="w-4 h-4 animate-pulse text-pink-200" />}
              </h2>
              <p className="text-xs opacity-90 namaste-greeting">
                🙏 With love for Students • 💚 Need to share? I am here!
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowCrisisResources(!showCrisisResources)}
              className="p-2 bg-red-500 rounded-lg hover:bg-red-600 transition"
              title="Emergency Help"
            >
              <Phone className="w-5 h-5" />
            </button>
            <button
              onClick={findTherapists}
              className="p-2 bg-emerald-500 rounded-lg hover:bg-emerald-600 transition"
              title="Find Campus Counselors"
            >
              <MapPin className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowEducation(!showEducation)}
              className="p-2 bg-college-500 rounded-lg hover:bg-college-600 transition"
              title="Study Resources"
            >
              <Book className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Crisis Resources Alert */}
      {showCrisisResources && (
        <div className="bg-gradient-to-r from-pink-50 to-red-50 border-l-4 border-pink-400 p-4 m-4 rounded-lg shadow-lg">
          <div className="flex items-start">
            <div className="mr-3 flex-shrink-0 mt-1">
              <Heart className="w-6 h-6 text-pink-500 animate-pulse" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                💙 Immediate Support With Love - आपके लिए मदद उपलब्ध है
                <Heart className="w-4 h-4 text-pink-500 animate-pulse" />
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                🤗 Dear friend, you're not alone. These caring people are here for you right now:
              </p>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-emerald-400 hover:shadow-md transition-shadow">
                  <p className="font-semibold text-emerald-800 flex items-center gap-2">
                    💚 AASRA Suicide Prevention Helpline
                  </p>
                  <p className="text-sm text-gray-600">Call: 91-22-27546669 | 24/7 caring support in multiple languages</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-purple-400 hover:shadow-md transition-shadow">
                  <p className="font-semibold text-purple-800 flex items-center gap-2">
                    🤗 Vandrevala Foundation
                  </p>
                  <p className="text-sm text-gray-600">Call: 9999 666 555 | Free, confidential emotional support</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-blue-400 hover:shadow-md transition-shadow">
                  <p className="font-semibold text-blue-800 flex items-center gap-2">
                    🌟 iCALL Psychosocial Helpline
                  </p>
                  <p className="text-sm text-gray-600">Call: 022-25521111 | Professional counselors who care</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-yellow-400 hover:shadow-md transition-shadow">
                  <p className="font-semibold text-yellow-800 flex items-center gap-2">
                    🏋️ Campus Wellness Center
                  </p>
                  <p className="text-sm text-gray-600">💙 Visit your college counselor - they're trained to help with love</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowCrisisResources(false)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`${
                message.role === 'user'
                  ? 'chatbot-bubble-user'
                  : message.role === 'system'
                  ? 'chatbot-bubble-system'
                  : `chatbot-bubble-assistant emotion-${botEmotion}`
              }`}
            >
              <div className="message-content">{message.content}</div>
              
              {message.suggestions && message.suggestions.length > 0 && (
                <div className="chatbot-suggestions">
                  <p className="suggestions-label">Suggestions:</p>
                  {message.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="chatbot-suggestion-button"
                    >
                      • {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {message.crisis && message.resources && (
                <div className="chatbot-crisis-resources">
                  <p className="crisis-title">Immediate Help Available:</p>
                  {message.resources.map((resource: any, index: number) => (
                    <div key={index} className="chatbot-crisis-resource">
                      <p className="resource-name">{resource.name}</p>
                      <p>Call: {resource.number}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="chatbot-typing-bubble">
              <div className="chatbot-typing-indicator">
                <div className="chatbot-typing-dots">
                  <div className="chatbot-typing-dot"></div>
                  <div className="chatbot-typing-dot"></div>
                  <div className="chatbot-typing-dot"></div>
                </div>
                <span className="chatbot-typing-text">
                  {isTypingWithHeart ? '💙 Thinking with care...' : 'CapyBro is typing...'}
                </span>
                {isTypingWithHeart && <Heart className="w-4 h-4 text-pink-400 animate-pulse" />}
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Campus Counselors Modal */}
      {showTherapists && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-bold font-college">Campus Counselors & Support</h3>
              <button
                onClick={() => setShowTherapists(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              {therapists.map((therapist) => (
                <div key={therapist.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold">{therapist.name}</h4>
                      <p className="text-sm text-gray-600">{therapist.specialty.join(', ')}</p>
                      <p className="text-sm mt-1">{therapist.address}</p>
                      <p className="text-sm">{therapist.phone}</p>
                    </div>
                    <div className="text-right">
                      {therapist.distance && (
                        <p className="text-sm text-gray-600">{therapist.distance} miles</p>
                      )}
                      {therapist.rating && (
                        <p className="text-sm">⭐ {therapist.rating}</p>
                      )}
                      <p className="text-xs mt-1">
                        {therapist.acceptingNewPatients ? (
                          <span className="text-green-600">Accepting new patients</span>
                        ) : (
                          <span className="text-red-600">Not accepting new patients</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t p-4">
        <div className="flex space-x-2 items-center">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message here..."
            className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 bg-white shadow-sm placeholder-gray-500"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm font-medium"
          >
            <Send className="w-5 h-5" />
          </button>
          {/* Voice input toggle button */}
          <button
            onClick={() => {
              if (isRecording) {
                recognitionRef.current?.stop();
                setIsRecording(false);
              } else {
                try {
                  recognitionRef.current?.start();
                  setIsRecording(true);
                } catch (error) {
                  console.error('Speech recognition start error:', error);
                }
              }
            }}
            disabled={isLoading}
            className="p-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 transition text-white"
            title={isRecording ? 'Stop voice input' : 'Start voice input'}
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          {/* TTS toggle button */}
          <button
            onClick={() => setIsTTSEnabled(!isTTSEnabled)}
            className={`p-2 rounded-lg transition text-white ${isTTSEnabled ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-gray-400 hover:bg-gray-500'}`}
            title={isTTSEnabled ? 'Disable Text-to-Speech' : 'Enable Text-to-Speech'}
          >
            {isTTSEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
          <Heart className="w-3 h-3 text-pink-400" />
          Remember: I'm an AI companion who truly cares, but I'm not a replacement for professional care. 
          If you're in crisis, please reach out for immediate help. You matter deeply. 💙
        </p>
      </div>
    </div>
  );
};

export default Chatbot;
