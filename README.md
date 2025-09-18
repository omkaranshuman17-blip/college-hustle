# Mental Health Tool 🧠💚

A comprehensive, engaging, and therapeutic web application built with React and Node.js that combines mental health support with gamification to reduce stigma and promote wellbeing.

## 🎯 Project Overview

This mental health tool is designed to make mental health support accessible, engaging, and fun. By combining evidence-based assessments with interactive games and soothing features, we create a safe space for users to explore their mental health journey.

### Key Features

- **Anonymous Access**: No-stigma entry with guest mode option
- **Background Mind-Soothing Music**: Calming ambient tracks for relaxation
- **Interactive Mental Health Games**: Fun, educational games that promote mental wellness
- **Validated Assessments**: PHQ-9, GAD-7, and Big Five personality tests
- **Daily Challenges**: Gamified tasks to build healthy habits
- **Psychoeducational Resource Hub**: Videos, relaxation audio, and mental wellness guides in regional languages
- **Peer Support Platform**: Moderated peer-to-peer support forum with trained student volunteers
- **Privacy-First Design**: All data is anonymous and secure

## 🏗️ Technical Architecture

### Platform
- **Frontend**: React with TypeScript for type-safe, component-based development
- **Backend**: Node.js with Express for API services and data management
- **Database**: Secure database with privacy-focused schema design
- **Styling**: Tailwind CSS for responsive, mobile-first design

### Project Structure
```
mental_health_tool/
├── mental-health-app/
│   ├── src/
│   │   ├── pages/           # Main application pages
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Games.tsx
│   │   │   ├── Assessments.tsx
│   │   │   ├── PsychoeducationalHub.tsx
│   │   │   └── PeerSupportPlatform.tsx
│   │   ├── components/      # Reusable React components
│   │   ├── games/          # Interactive mental health games
│   │   └── assessments/    # Mental health assessment tools
│   ├── backend/        # Node.js backend services
│   └── public/         # Static assets
├── assets/
│   ├── audio/          # Calming music tracks (CC licensed)
│   └── images/         # Icons, badges, and visual assets
├── config/            # App settings and configurations
└── docs/              # Additional documentation
```

## 🎮 Core Features

### 1. User Onboarding & Authentication
- **Signup/Login Page**: Simple, welcoming interface
- **Guest Mode**: Anonymous access for reduced barriers
- **Privacy Notice**: Clear data handling communication
- **Personalized Dashboard**: Daily streaks, greetings, progress tracking

### 2. Background Mind-Soothing Music 🎵
- **Auto-play Feature**: Gentle start with mute option
- **Music Sources**: Creative Commons tracks from FreeMusicArchive.org and Bensound.com
- **Controls**: Volume slider, track switcher, loop options
- **Track Selection**: 3-5 carefully curated calming tracks

### 3. Interactive Mental Health Games 🎯

#### Game 1: Mood Matcher (Emotional Awareness Puzzle)
- Match emotions with coping strategies
- Visual icons for engagement
- Score based on speed and accuracy

#### Game 2: Breathing Bubbles (Mindfulness Game)
- Interactive breathing exercise with visual bubbles
- Reveals positive affirmations and mindfulness tips
- Customizable breathing patterns for relaxation

#### Game 3: Gratitude Journal Quest (Adventure)
- Daily prompts for gratitude practice
- Points and badges system
- Progress tracking

#### Game 4: Mindfulness Maze (Educational Puzzle)
- Navigate while answering mental health trivia
- Based on WHO guidelines
- Bonus rewards for accuracy

### 4. Personality & Mental Health Tests 📊

#### Validated Assessments:
- **Big Five Personality Traits**: 10-20 questions with fun interpretations
- **PHQ-9 Depression Screener**: 9 questions, scored 0-27
- **GAD-7 Anxiety Assessment**: 7 questions, scored 0-21
- **Burnout Inventory**: Short version for quick assessment
- **Sleep Quality Quiz**: Custom assessment for sleep health

#### Features:
- Progress bars and emojis for engagement
- Animated feedback (confetti on completion)
- Personalized insights and recommendations
- Clear disclaimers about professional help

### 5. Daily Tasks & Challenges 📅
- **3-5 Daily Tasks**: Randomized from curated list
- **Task Examples**: 
  - "Meditate for 5 minutes"
  - "Journal one positive thought"
  - "Play a relaxation game"
- **Streak System**: Visual rewards for consistency
- **Reminders**: Email and browser push notifications for daily tasks

### 6. Psychoeducational Resource Hub 📚
- **Multi-format Content**: Videos, guided audio sessions, and comprehensive written guides
- **Regional Language Support**: Content available in English, Hindi, Spanish, Tamil, Telugu, and Bengali
- **Categorized Resources**: Organized by topic (anxiety, depression, stress, sleep, mindfulness, relationships)
- **Interactive Media Player**: Built-in video and audio players with playback controls
- **Search & Filter**: Easy discovery of relevant content by category and language
- **Evidence-based Materials**: All content follows WHO and APA guidelines

### 7. Peer Support Platform 🤝
- **Moderated Community Forums**: Safe spaces for sharing experiences and seeking support
- **Anonymous Posting**: Option to post anonymously for sensitive topics
- **Trained Volunteer Network**: Certified peer support volunteers available 24/7
- **Volunteer Training Program**: Multi-module certification covering active listening, crisis recognition, and cultural sensitivity
- **Category-based Discussions**: Organized forums for different mental health topics
- **Real-time Moderation**: AI-assisted moderation with human oversight
- **Badge System**: Recognition for helpful contributors and volunteers
- **Crisis Response Protocol**: Immediate escalation pathways for users in crisis

## 📊 Database Schema

### Database Schema

#### User
- id (UUID, primary key)
- email (string, optional)
- username (string, unique)
- password_hash (string, encrypted)
- anonymous_id (UUID)
- created_at (timestamp)
- updated_at (timestamp)

#### GameScore
- id (UUID, primary key)
- user_id (UUID, foreign key)
- game_type (string)
- score (integer)
- completed_at (timestamp)

#### TestResult
- id (UUID, primary key)
- user_id (UUID, anonymous reference)
- test_type (string)
- score (integer)
- responses (JSON)
- completed_at (timestamp)

#### DailyTask
- id (UUID, primary key)
- user_id (UUID, foreign key)
- task_date (date)
- tasks (JSON array)
- completed (boolean)
- created_at (timestamp)

## 🎨 Design Guidelines

### Color Palette
- **Primary**: Calming blues (#4A90E2)
- **Secondary**: Soothing greens (#7FBA7A)
- **Accent**: Warm yellows (#FFD700)
- **Background**: Soft whites and grays

### UI Elements
- Rounded buttons for friendliness
- Smooth animations for engagement
- Clear, readable fonts
- Mobile-responsive layouts

## 🔐 Privacy & Security

- **Anonymous by Default**: No real names required
- **Data Encryption**: Sensitive fields encrypted using industry-standard algorithms
- **No Data Sharing**: User data never shared with third parties
- **Clear Disclaimers**: Not a replacement for professional help
- **Secure Storage**: Database encryption at rest and in transit
- **Authentication**: JWT-based authentication with secure password hashing
- **HTTPS Only**: All communications encrypted with TLS/SSL

## 🚀 Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
- [x] Set up React project with TypeScript
- [x] Create basic page structure and routing
- [x] Implement user authentication with JWT
- [x] Design responsive layouts with Tailwind CSS

### Phase 2: Core Features (Week 3-4)
- [x] Integrate audio player components
- [x] Build interactive mental health games
- [x] Implement PHQ-9 and GAD-7 assessment tools
- [x] Create daily task management system

### Phase 3: Enhancement (Week 5-6)
- [x] Add psychoeducational resource hub
- [x] Implement peer support platform
- [x] Add multi-language support
- [ ] Set up push notification system
- [ ] Create admin dashboard

### Phase 4: Polish & Launch (Week 7-8)
- [ ] User testing and feedback collection
- [ ] Performance optimization and code splitting
- [ ] Progressive Web App (PWA) configuration
- [ ] Final testing and production deployment

## 🎵 Music Resources

### Creative Commons Sources:
- **FreeMusicArchive.org**: Royalty-free ambient tracks
- **Bensound.com**: Calming instrumental music
- **Focus**: Nature sounds, soft piano, ambient textures

## 📱 Progressive Web App (PWA)

- **Offline Capability**: Service worker implementation for offline access to core features
- **Home Screen Installation**: Web app manifest for native-like installation
- **Push Notifications**: Browser-based notifications for reminders and support
- **Cache Management**: Intelligent caching strategy for assets and API responses
- **App Shell Architecture**: Fast loading with cached shell and dynamic content

## 🆘 Mental Health Resources

### Important Disclaimers:
- "This tool is not a substitute for professional mental health care"
- "If you're in crisis, please contact a mental health professional"
- Links to free helplines and resources
- Clear guidance on when to seek help

### Score Thresholds:
- PHQ-9 > 10: Suggest professional consultation
- GAD-7 > 10: Recommend anxiety resources
- Emergency resources always visible

## 🔧 Technical Setup

### React Application Configuration:
1. **Pages**: Landing, Dashboard, Games, Assessments, Tasks, Profile, Resources Hub, Peer Support
2. **Libraries**: 
   - Framer Motion (animations)
   - Heroicons (icons)
   - React Router (navigation)
   - Zustand (state management)
   - Tailwind CSS (styling)
3. **Backend**: Node.js with Express for API services
4. **Features**: Real-time audio/video players, forum moderation, multi-language support

## 📈 Analytics & Monitoring

- User engagement metrics
- Game completion rates
- Test participation statistics
- Daily active users
- Streak tracking

## 🤝 Contributing

This project aims to make mental health support accessible and engaging. Contributions are welcome in the following areas:
- Game ideas and implementations
- Assessment tool validations
- Music curation
- UI/UX improvements
- Accessibility features

## 📄 License

This project is designed for public benefit. All original content is provided under appropriate open-source licenses. Third-party resources (music, assessments) maintain their original licenses.

## 🎯 Goals & Impact

### Primary Goals:
1. **Reduce Stigma**: Make mental health support feel approachable
2. **Increase Engagement**: Gamification for sustained use
3. **Provide Accurate Tools**: Evidence-based assessments
4. **Support Wellbeing**: Daily habits and coping strategies
5. **Ensure Accessibility**: Free, anonymous, mobile-friendly

### Success Metrics:
- User retention rate > 40%
- Daily active users growth
- Positive user feedback
- Completion rate of assessments
- Streak maintenance statistics

## 📞 Support & Feedback

- In-app feedback form
- Community support features
- Professional referral system
- Regular updates based on user input

---

**Remember**: Your mental health matters. This tool is here to support you on your journey, but always reach out to professionals when you need additional help. You're not alone. 💚

**Launch Status**: 🚧 In Development

**Target Launch**: [To be determined]

**Platform**: Progressive Web App (React + Node.js)
