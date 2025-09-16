# Mental Health Support Chatbot with DeepSeek AI

## Overview
This is a comprehensive mental health support application featuring an AI-powered chatbot using the DeepSeek API. The chatbot provides emotional support, teaches basic mental health knowledge, and helps users find nearby therapists.

## Features

### 🤖 AI Chatbot
- **Emotional Support**: Compassionate and empathetic conversations
- **Mental Health Education**: Learn about anxiety, depression, stress management, and mindfulness
- **Crisis Detection**: Automatic detection of crisis situations with immediate resources
- **Personalized Suggestions**: Context-aware coping strategies and recommendations

### 📍 Therapist Locator
- **Find Nearby Therapists**: Locate mental health professionals in your area
- **Online Therapy Options**: Access to teletherapy platforms
- **Detailed Information**: View specialties, ratings, and availability
- **Mock Data Available**: Works even without Google Maps API

### 🚨 Safety Features
- **Crisis Resources**: 24/7 hotline numbers (988 in US, 116 123 in UK)
- **Emergency Alerts**: Immediate help for users in crisis
- **Professional Boundaries**: Clear disclaimers about AI limitations
- **Secure Conversations**: Session-based chat with privacy protection

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository** (if not already done):
```bash
cd C:\Users\DELL\projects\mental_health_tool\mental-health-app
```

2. **Install Frontend Dependencies**:
```bash
npm install
```

3. **Install Backend Dependencies**:
```bash
cd backend
npm install
cd ..
```

### Configuration

1. **Backend Environment Variables**:
The `.env` file in the `backend` folder is already configured with:
- DeepSeek API Key (already provided)
- Crisis hotline numbers
- Database configuration

To add Google Maps API (optional for real therapist locations):
- Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com)
- Update `GOOGLE_MAPS_API_KEY` in `backend/.env`

2. **Frontend Configuration**:
The frontend is already configured to connect to the backend on `http://localhost:5000`

### Running the Application

#### Option 1: Run Both Frontend and Backend

1. **Start the Backend Server**:
```bash
cd backend
npm run dev
```
The backend will run on http://localhost:5000

2. **In a new terminal, start the Frontend**:
```bash
cd C:\Users\DELL\projects\mental_health_tool\mental-health-app
npm start
```
The frontend will run on http://localhost:3000

#### Option 2: Using the PowerShell Scripts
You already have helper scripts in the root directory:
```bash
.\start-app.ps1
```

### Using the Chatbot

1. **Access the Application**:
   - Open your browser and go to http://localhost:3000
   - You can use the chatbot without logging in by going to http://localhost:3000/chatbot
   - Or create an account to access all features

2. **Chatbot Features**:
   - **Start a Conversation**: Type your message and press Enter or click Send
   - **Crisis Resources**: Click the red phone icon for immediate help
   - **Find Therapists**: Click the green map icon to find nearby therapists
   - **Educational Resources**: Click the blue book icon for mental health information
   - **Use Suggestions**: Click on suggested responses to continue the conversation

3. **Example Conversations**:
   - "I'm feeling anxious about my exams"
   - "Can you teach me breathing exercises?"
   - "I need help with depression"
   - "Show me coping strategies for stress"
   - "Find therapists near me"

### API Endpoints

The backend provides the following endpoints:

#### Chatbot Endpoints
- `POST /api/ai/chat` - Send a message to the chatbot
- `GET /api/ai/education/:topic` - Get educational content
- `GET /api/ai/crisis-resources/:country` - Get crisis resources by country

#### Therapist Locator Endpoints
- `POST /api/ai/therapists/nearby` - Find nearby therapists
- `GET /api/ai/therapists/online` - Get online therapy options
- `GET /api/ai/location` - Get user location from IP

### Important Notes

⚠️ **Medical Disclaimer**: This chatbot is NOT a replacement for professional medical or mental health care. Always consult with qualified healthcare providers for medical advice.

🔒 **Privacy**: Chat sessions are temporary and stored in memory. If logged in, conversations are saved securely in the database.

🆘 **Crisis Support**: If you're in crisis, please contact:
- **US**: Call 988 or text HOME to 741741
- **UK**: Call 116 123
- **Emergency**: Call 911 (US) or 999 (UK)

### Troubleshooting

1. **Backend not starting**:
   - Make sure port 5000 is not in use
   - Check that all dependencies are installed
   - Verify the `.env` file exists in the backend folder

2. **Chatbot not responding**:
   - Check that the backend is running
   - Verify the DeepSeek API key is valid
   - Check browser console for errors

3. **Therapist locator showing mock data**:
   - This is normal if Google Maps API key is not configured
   - The mock data demonstrates the feature functionality

### Development

- **Backend**: TypeScript, Express.js, SQLite
- **Frontend**: React, TypeScript, Tailwind CSS
- **AI**: DeepSeek API for natural language processing
- **Database**: SQLite for data persistence

### Security Considerations

- Never commit API keys to version control
- Use environment variables for sensitive data
- Implement rate limiting in production
- Add authentication for sensitive features
- Use HTTPS in production

### Future Enhancements

- [ ] Voice interaction support
- [ ] Multi-language support
- [ ] Advanced mood tracking analytics
- [ ] Integration with wearable devices
- [ ] Group therapy session scheduling
- [ ] AI-powered journaling prompts

## Support

For issues or questions about the chatbot, please:
1. Check the troubleshooting section
2. Review the API documentation
3. Contact the development team

## License

This project is for educational and support purposes. Please use responsibly and always prioritize professional mental health care when needed.

---

**Remember**: You are not alone. Help is always available. 💚
