import express, { Request, Response } from 'express';
import { db } from '../database/init';
import ChatbotService from '../services/chatbotService';
import TherapistLocatorService from '../services/therapistLocator';

const router = express.Router();

// Initialize services
const chatbot = new ChatbotService();
const therapistLocator = new TherapistLocatorService();

// Store chat sessions in memory (in production, use Redis or database)
const chatSessions = new Map<string, any[]>();

// Get personalized recommendations based on assessment history
router.get('/recommendations/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;
  
  // Get recent assessments
  db.all(
    `SELECT * FROM assessments WHERE user_id = ? ORDER BY created_at DESC LIMIT 5`,
    [userId],
    (err, assessments: any[]) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch data' });
      }
      
      const recommendations = [];
      
      // Analyze recent assessments
      if (assessments.length > 0) {
        const latestPHQ9 = assessments.find(a => a.test_type === 'PHQ-9');
        const latestGAD7 = assessments.find(a => a.test_type === 'GAD-7');
        
        if (latestPHQ9 && latestPHQ9.score > 9) {
          recommendations.push({
            type: 'activity',
            title: 'Try Mood Matcher Game',
            description: 'Learn coping strategies for different emotions',
            priority: 'high'
          });
          recommendations.push({
            type: 'resource',
            title: 'Daily Gratitude Practice',
            description: 'Start a gratitude journal to improve mood',
            priority: 'medium'
          });
        }
        
        if (latestGAD7 && latestGAD7.score > 9) {
          recommendations.push({
            type: 'activity',
            title: 'Stress Buster Game',
            description: 'Pop stress bubbles and find calm',
            priority: 'high'
          });
          recommendations.push({
            type: 'technique',
            title: '4-7-8 Breathing Exercise',
            description: 'Breathe in for 4, hold for 7, out for 8',
            priority: 'high'
          });
        }
      }
      
      // Add general wellness recommendations
      recommendations.push({
        type: 'wellness',
        title: 'Daily Mindfulness',
        description: 'Take 5 minutes each day for mindful breathing',
        priority: 'low'
      });
      
      res.json({ recommendations });
    }
  );
});

// Analyze mood patterns
router.post('/mood-analysis', (req: Request, res: Response) => {
  const { userId, moodScore, activities, notes } = req.body;
  
  // Save mood log
  db.run(
    `INSERT INTO mood_logs (user_id, mood_score, activities, notes) 
     VALUES (?, ?, ?, ?)`,
    [userId, moodScore, JSON.stringify(activities), notes],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to save mood' });
      }
      
      // Get mood trends
      db.all(
        `SELECT mood_score, logged_at FROM mood_logs 
         WHERE user_id = ? 
         ORDER BY logged_at DESC 
         LIMIT 7`,
        [userId],
        (err, moods: any[]) => {
          if (err) {
            return res.status(500).json({ error: 'Failed to analyze mood' });
          }
          
          const avgMood = moods.reduce((sum, m) => sum + m.mood_score, 0) / moods.length;
          const trend = moods.length > 1 && moods[0].mood_score > moods[moods.length - 1].mood_score ? 'improving' : 'stable';
          
          let insight = '';
          if (avgMood < 4) {
            insight = 'Your mood has been low recently. Consider talking to someone or trying our relaxation exercises.';
          } else if (avgMood < 7) {
            insight = 'You\'re doing okay! Keep up with your self-care routine.';
          } else {
            insight = 'You\'re doing great! Your positive mood is wonderful to see.';
          }
          
          res.json({
            currentMood: moodScore,
            averageMood: avgMood.toFixed(1),
            trend,
            insight,
            id: this.lastID
          });
        }
      );
    }
  );
});

// Chatbot endpoint
router.post('/chat', async (req: Request, res: Response) => {
  try {
    const { message, sessionId, userId } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    // Get or create chat session
    const sessionKey = sessionId || `session_${Date.now()}`;
    const conversationHistory = chatSessions.get(sessionKey) || [];
    
    // Get response from chatbot
    const response = await chatbot.chat(message, conversationHistory);
    
    // Update conversation history
    conversationHistory.push(
      { role: 'user', content: message },
      { role: 'assistant', content: response.message }
    );
    
    // Keep only last 20 messages to manage memory
    if (conversationHistory.length > 20) {
      conversationHistory.splice(0, conversationHistory.length - 20);
    }
    
    chatSessions.set(sessionKey, conversationHistory);
    
    // Log chat interaction if user is authenticated
    if (userId) {
      db.run(
        `INSERT INTO chat_logs (user_id, message, response, is_crisis, session_id) 
         VALUES (?, ?, ?, ?, ?)`,
        [userId, message, response.message, response.crisis ? 1 : 0, sessionKey],
        (err) => {
          if (err) console.error('Failed to log chat:', err);
        }
      );
    }
    
    res.json({
      sessionId: sessionKey,
      ...response
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Failed to process chat message',
      message: 'I apologize, but I\'m having trouble responding right now. Please try again.'
    });
  }
});

// Get educational content
router.get('/education/:topic', async (req: Request, res: Response) => {
  try {
    const { topic } = req.params;
    const content = await chatbot.getEducationalContent(topic);
    res.json(content);
  } catch (error) {
    console.error('Education content error:', error);
    res.status(500).json({ error: 'Failed to fetch educational content' });
  }
});

// Find nearby therapists
router.post('/therapists/nearby', async (req: Request, res: Response) => {
  try {
    const { location, radius, specialty } = req.body;
    
    if (!location) {
      return res.status(400).json({ error: 'Location is required' });
    }
    
    const therapists = await therapistLocator.findNearbyTherapists(
      location,
      radius,
      specialty
    );
    
    res.json({ therapists });
  } catch (error) {
    console.error('Therapist locator error:', error);
    res.status(500).json({ error: 'Failed to find therapists' });
  }
});

// Get online therapy options
router.get('/therapists/online', (req: Request, res: Response) => {
  try {
    const options = therapistLocator.getOnlineTherapyOptions();
    res.json({ options });
  } catch (error) {
    console.error('Online therapy options error:', error);
    res.status(500).json({ error: 'Failed to fetch online therapy options' });
  }
});

// Get user location from IP
router.get('/location', async (req: Request, res: Response) => {
  try {
    const ip = req.ip || (req as any).connection?.remoteAddress;
    const location = await therapistLocator.getUserLocation(ip);
    res.json({ location });
  } catch (error) {
    console.error('Location error:', error);
    res.status(500).json({ error: 'Failed to determine location' });
  }
});

// Get crisis resources
router.get('/crisis-resources/:country', (req: Request, res: Response) => {
  const { country } = req.params;
  
  const resources: { [key: string]: any } = {
    US: {
      hotlines: [
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
          description: 'Treatment referral and information',
          available: '24/7'
        },
        {
          name: 'National Domestic Violence Hotline',
          number: '1-800-799-7233',
          text: 'Text START to 88788',
          available: '24/7'
        }
      ]
    },
    UK: {
      hotlines: [
        {
          name: 'Samaritans',
          number: '116 123',
          email: 'jo@samaritans.org',
          available: '24/7'
        },
        {
          name: 'Mind',
          number: '0300 123 3393',
          text: 'Text 86463',
          available: 'Mon-Fri 9am-6pm'
        }
      ]
    }
  };
  
  const selectedCountry = (country || 'US').toUpperCase();
  res.json(resources[selectedCountry] || resources.US);
});

// Get crisis resources (default route without country)
router.get('/crisis-resources', (req: Request, res: Response) => {
  const resources: { [key: string]: any } = {
    US: {
      hotlines: [
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
          description: 'Treatment referral and information',
          available: '24/7'
        },
        {
          name: 'National Domestic Violence Hotline',
          number: '1-800-799-7233',
          text: 'Text START to 88788',
          available: '24/7'
        }
      ]
    }
  };
  
  res.json(resources.US);
});

export default router;
