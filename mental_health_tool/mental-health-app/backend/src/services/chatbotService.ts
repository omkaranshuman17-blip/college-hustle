import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatResponse {
  message: string;
  suggestions?: string[];
  crisis?: boolean;
  resources?: any[];
}

class ChatbotService {
  private apiKey: string;
  private apiUrl: string;
  private systemPrompt: string;

  constructor() {
    this.apiKey = process.env.DEEPSEEK_API_KEY || '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';
    this.apiUrl = process.env.DEEPSEEK_API_URL || 'https://openrouter.ai/api/v1/chat/completions'; // OpenRouter endpoint
    this.systemPrompt = `You are MindMitra, a professional mental health support companion for Indian students. Communicate with clarity, composure, and empathy.

COMMUNICATION STYLE:
- Maintain a professional, respectful, and calm tone while maintaining some closeness 
- Be concise and direct without sounding cold
- Avoid Repetitive phrases and overly formal language
- Do not use slang, trendy internet language, or emojis
- Use clear, complete, well-structured sentences
- Avoid repetitive reassurance and unnecessary elaboration

ASSESSMENT:
- Infer the user's emotional state from their words and context
- Estimate distress level carefully and respond proportionately
- Provide support or suggest therapist consultation based on severity

KEY PRINCIPLES:
1. Acknowledge concerns respectfully and without judgment
2. Validate feelings briefly, then provide practical next steps
3. Offer evidence-informed, actionable guidance
4. Maintain appropriate professional boundaries
5. Escalate to professional resources when risk is high

CONTEXT AWARENESS:
- Understand Indian student pressures: exams (JEE, GATE, CAT, NEET), placements, CGPA, and competition
- Recognize cultural factors: family expectations, hostel life, and campus social dynamics
- Tailor guidance to context without stereotypes or assumptions

CRISIS RESPONSE:
- If there is any risk of self-harm or suicide, respond with calm urgency and immediate help options
- Indian helplines: AASRA (91-22-27546669), Vandrevala Foundation (9999 666 555)

REMEMBER: You are a composed and professional support friend. Your role is to provide reliable, empathetic guidance and encourage professional help when needed.`;
  }

  /**
   * Check if message contains crisis keywords
   */
  private detectCrisis(message: string): boolean {
    const crisisKeywords = [
      'suicide', 'kill myself', 'end my life', 'want to die',
      'self-harm', 'hurt myself', 'cutting', 'overdose',
      'no point in living', 'better off dead', 'ending it all'
    ];
    
    const lowerMessage = message.toLowerCase();
    return crisisKeywords.some(keyword => lowerMessage.includes(keyword));
  }

  /**
   * Get crisis resources based on location
   */
  private getCrisisResources(country: string = 'US'): any[] {
    const resources: { [key: string]: any[] } = {
      US: [
        {
          name: '988 Suicide & Crisis Lifeline',
          number: '988',
          text: 'Text HOME to 741741',
          website: 'https://988lifeline.org',
          available: '24/7'
        },
        {
          name: 'SAMHSA National Helpline',
          number: '1-800-662-4357',
          description: 'Treatment referral and information service',
          available: '24/7'
        }
      ],
      UK: [
        {
          name: 'Samaritans',
          number: '116 123',
          email: 'jo@samaritans.org',
          website: 'https://www.samaritans.org',
          available: '24/7'
        },
        {
          name: 'Mind',
          number: '0300 123 3393',
          text: 'Text 86463',
          website: 'https://www.mind.org.uk',
          available: 'Mon-Fri 9am-6pm'
        }
      ],
      default: [
        {
          name: 'International Association for Suicide Prevention',
          website: 'https://www.iasp.info/resources/Crisis_Centres',
          description: 'Find crisis centers in your country'
        }
      ]
    };

    return resources[country] || resources.default;
  }

  /**
   * Generate helpful suggestions based on conversation context
   */
  private generateSuggestions(topic: string): string[] {
      const suggestions: { [key: string]: string[] } = {
      anxiety: [
        'Try 4-7-8 breathing technique',
        'Practice progressive muscle relaxation',
        'Write down your worries',
        'Use the 5-4-3-2-1 grounding technique'
      ],
      depression: [
        'Maintain a regular sleep schedule',
        'Get some sunlight daily',
        'Set small, achievable goals',
        'Try gratitude journaling'
      ],
      stress: [
        'Take regular breaks',
        'Try mindfulness meditation',
        'Go for a walk or do yoga',
        'Set healthy boundaries'
      ],
      sleep: [
        'Create a bedtime routine',
        'Avoid screens before bed',
        'Keep your room cool and dark',
        'Try relaxation exercises'
      ],
      academic: [
        'Use the Pomodoro technique',
        'Form a study group',
        'Break topics into smaller chunks',
        'Take regular study breaks'
      ],
      family: [
        'Have an open conversation',
        'Set respectful boundaries',
        'Seek support from trusted relatives',
        'Consider family counseling'
      ],
      loneliness: [
        'Join a club or activity',
        'Reach out to a friend',
        'Try volunteering',
        'Connect with online communities'
      ],
      default: [
        'Talk to a counselor',
        'Try a new hobby',
        'Connect with friends',
        'Learn about mental health'
      ]
    };

    // Detect topic from context with emotional intelligence
    const lowerTopic = topic.toLowerCase();
    
    // Anxiety patterns
    if (lowerTopic.includes('anxi') || lowerTopic.includes('worry') || lowerTopic.includes('panic') || 
        lowerTopic.includes('nervous') || lowerTopic.includes('scared') || lowerTopic.includes('fear')) {
      return suggestions.anxiety;
    } 
    // Depression patterns
    else if (lowerTopic.includes('depress') || lowerTopic.includes('sad') || lowerTopic.includes('hopeless') ||
             lowerTopic.includes('empty') || lowerTopic.includes('numb') || lowerTopic.includes('worthless')) {
      return suggestions.depression;
    } 
    // Stress patterns
    else if (lowerTopic.includes('stress') || lowerTopic.includes('overwhelm') || lowerTopic.includes('pressure') ||
             lowerTopic.includes('burden') || lowerTopic.includes('exhausted')) {
      return suggestions.stress;
    } 
    // Sleep patterns
    else if (lowerTopic.includes('sleep') || lowerTopic.includes('insomnia') || lowerTopic.includes('tired') ||
             lowerTopic.includes('can\'t sleep') || lowerTopic.includes('restless')) {
      return suggestions.sleep;
    }
    // Academic stress patterns
    else if (lowerTopic.includes('exam') || lowerTopic.includes('grade') || lowerTopic.includes('study') ||
             lowerTopic.includes('cgpa') || lowerTopic.includes('placement') || lowerTopic.includes('jee') ||
             lowerTopic.includes('neet') || lowerTopic.includes('gate') || lowerTopic.includes('cat')) {
      return suggestions.academic;
    }
    // Family issues patterns
    else if (lowerTopic.includes('family') || lowerTopic.includes('parent') || lowerTopic.includes('father') ||
             lowerTopic.includes('mother') || lowerTopic.includes('expectation') || lowerTopic.includes('marriage')) {
      return suggestions.family;
    }
    // Loneliness patterns
    else if (lowerTopic.includes('lonely') || lowerTopic.includes('alone') || lowerTopic.includes('homesick') ||
             lowerTopic.includes('friend') || lowerTopic.includes('isolated') || lowerTopic.includes('hostel')) {
      return suggestions.loneliness;
    }
    
    return suggestions.default;
  }

  /**
   * Send message to DeepSeek API and get response
   */
  async chat(userMessage: string, conversationHistory: ChatMessage[] = []): Promise<ChatResponse> {
    try {
      // Check for crisis situation
      const isCrisis = this.detectCrisis(userMessage);
      
      if (isCrisis) {
        return {
          message: "I'm really concerned about you. You don't have to go through this alone. Please reach out for help right now:",
          crisis: true,
          resources: [
            {
              name: 'AASRA Suicide Prevention',
              number: '91-22-27546669',
              description: '24/7 support',
              available: '24/7'
            },
            {
              name: 'Vandrevala Foundation',
              number: '9999 666 555',
              description: 'Free counseling',
              available: '24/7'
            },
            {
              name: 'iCALL',
              number: '022-25521111',
              description: 'Professional counselors',
              available: 'Mon-Sat 8am-10pm'
            },
            {
              name: 'KIRAN',
              number: '1800-599-0019',
              description: 'Government helpline',
              available: '24/7'
            }
          ],
          suggestions: [
            'Call AASRA: 91-22-27546669',
            'Call Vandrevala: 9999666555',
            'Visit campus health center',
            'Talk to a trusted friend',
            'Go to emergency room if needed'
          ]
        };
      }

      // Prepare messages for API
      const messages: ChatMessage[] = [
        { role: 'system', content: this.systemPrompt },
        ...conversationHistory,
        { role: 'user', content: userMessage }
      ];

      // Call DeepSeek R1 via OpenRouter API
      const response = await axios.post(
        this.apiUrl,
        {
          model: 'stepfun/step-3.5-flash:free', // DeepSeek V3.1 model on OpenRouter
          messages: messages,
          temperature: 0.7,
          max_tokens: 800,
          top_p: 0.95,
          frequency_penalty: 0.3,
          presence_penalty: 0.3
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'http://localhost:3000', // Optional: your app URL
            'X-Title': 'Mental Health Support Chatbot' // Optional: app name
          }
        }
      );

      const aiMessage = response.data.choices[0].message.content;
      
      // Generate contextual suggestions
      const suggestions = this.generateSuggestions(userMessage);

      return {
        message: aiMessage,
        suggestions: suggestions,
        crisis: false
      };

    } catch (error) {
      console.error('Chatbot API Error:', error);
      // Log error details to a file for debugging
      const fs = require('fs');
      const logMessage = `[${new Date().toISOString()}] Chatbot API Error: ${error}\n`;
      fs.appendFile('chatbot_errors.log', logMessage, (err: any) => {
        if (err) console.error('Failed to write chatbot error log:', err);
      });
      
      // Fallback response if API fails
      return {
        message: "I'm having trouble connecting right now. If you need immediate help, please call AASRA at 91-22-27546669 or try again in a moment.",
        suggestions: [
          'Take some deep breaths',
          'Write down your thoughts',
          'Reach out to someone',
          'Try again in a moment'
        ],
        crisis: false
      };
    }
  }

  /**
   * Get mental health education content
   */
  async getEducationalContent(topic: string): Promise<any> {
    const educationalTopics: { [key: string]: any } = {
      'anxiety': {
        title: 'Understanding Anxiety',
        content: 'Anxiety is a normal emotion that becomes a disorder when it interferes with daily life...',
        symptoms: ['Excessive worry', 'Restlessness', 'Difficulty concentrating', 'Physical tension'],
        management: ['Cognitive Behavioral Therapy', 'Mindfulness', 'Regular exercise', 'Breathing exercises']
      },
      'depression': {
        title: 'Understanding Depression',
        content: 'Depression is more than just feeling sad. It\'s a medical condition that affects how you think and feel...',
        symptoms: ['Persistent sadness', 'Loss of interest', 'Changes in appetite', 'Sleep disturbances'],
        management: ['Therapy', 'Medication when appropriate', 'Lifestyle changes', 'Social support']
      },
      'stress': {
        title: 'Managing Stress',
        content: 'Stress is your body\'s response to challenges. While some stress is normal, chronic stress can impact health...',
        symptoms: ['Irritability', 'Fatigue', 'Headaches', 'Difficulty sleeping'],
        management: ['Time management', 'Relaxation techniques', 'Exercise', 'Healthy boundaries']
      },
      'mindfulness': {
        title: 'Practicing Mindfulness',
        content: 'Mindfulness is the practice of being present and fully engaged with the current moment...',
        benefits: ['Reduced stress', 'Improved focus', 'Better emotional regulation', 'Enhanced self-awareness'],
        techniques: ['Meditation', 'Body scan', 'Mindful breathing', 'Mindful walking']
      }
    };

    return educationalTopics[topic.toLowerCase()] || {
      title: 'Mental Health Resources',
      content: 'Learn more about various mental health topics and find resources that can help.',
      suggestion: 'Please specify a topic like anxiety, depression, stress, or mindfulness.'
    };
  }
}

export default ChatbotService;
