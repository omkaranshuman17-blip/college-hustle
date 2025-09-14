# Mental Health Tool 🧠💚

A comprehensive, engaging, and therapeutic web application built on Bubble.io that combines mental health support with gamification to reduce stigma and promote wellbeing.

## 🎯 Project Overview

This mental health tool is designed to make mental health support accessible, engaging, and fun. By combining evidence-based assessments with interactive games and soothing features, we create a safe space for users to explore their mental health journey.

### Key Features

- **Anonymous Access**: No-stigma entry with guest mode option
- **Background Mind-Soothing Music**: Calming ambient tracks for relaxation
- **Interactive Mental Health Games**: Fun, educational games that promote mental wellness
- **Validated Assessments**: PHQ-9, GAD-7, and Big Five personality tests
- **Daily Challenges**: Gamified tasks to build healthy habits
- **Privacy-First Design**: All data is anonymous and secure

## 🏗️ Technical Architecture

### Platform
- **Bubble.io**: No-code platform for rapid development
- **Database**: Built-in Bubble database with privacy-focused schema
- **Responsive Design**: Mobile-first approach for accessibility

### Project Structure
```
mental_health_tool/
├── assets/
│   ├── audio/          # Calming music tracks (CC licensed)
│   └── images/         # Icons, badges, and visual assets
├── src/
│   ├── components/     # Reusable Bubble elements
│   ├── games/          # Game logic and configurations
│   ├── tests/          # Mental health assessment implementations
│   └── workflows/      # Bubble workflow definitions
├── database/           # Data type schemas and privacy rules
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

#### Game 2: Stress Buster Bubble Pop (Arcade-style)
- Pop bubbles representing stressors
- Reveals positive affirmations
- Random generation for variety

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
- **Reminders**: Email/push notifications via OneSignal

## 📊 Database Schema

### Data Types

#### User
- Email (optional)
- Username
- Password (encrypted)
- Anonymous ID
- Created Date

#### GameScore
- User (reference)
- GameType (text)
- Score (number)
- Date (date)

#### TestResult
- User (anonymous ID)
- TestType (text)
- Score (number)
- Responses (list)
- Timestamp (date)

#### DailyTask
- User (reference)
- Date (date)
- Tasks (list)
- Completed (yes/no)

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
- **Data Encryption**: Sensitive fields encrypted
- **No Data Sharing**: User data never shared with third parties
- **Clear Disclaimers**: Not a replacement for professional help
- **Secure Storage**: Bubble's built-in security features

## 🚀 Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
- [ ] Set up Bubble.io workspace
- [ ] Create basic page structure
- [ ] Implement user authentication
- [ ] Design responsive layouts

### Phase 2: Core Features (Week 3-4)
- [ ] Integrate audio player with CC music
- [ ] Build first two games
- [ ] Implement PHQ-9 and GAD-7 tests
- [ ] Create daily task system

### Phase 3: Enhancement (Week 5-6)
- [ ] Add remaining games
- [ ] Implement all assessment tools
- [ ] Set up notification system
- [ ] Create admin dashboard

### Phase 4: Polish & Launch (Week 7-8)
- [ ] User testing and feedback
- [ ] Performance optimization
- [ ] PWA configuration
- [ ] Final testing and launch

## 🎵 Music Resources

### Creative Commons Sources:
- **FreeMusicArchive.org**: Royalty-free ambient tracks
- **Bensound.com**: Calming instrumental music
- **Focus**: Nature sounds, soft piano, ambient textures

## 📱 Progressive Web App (PWA)

- Offline capability for basic features
- Home screen installation
- Push notifications support
- Cache management for assets

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

### Bubble.io Configuration:
1. **Pages**: Home, Dashboard, Games Hub, Tests, Daily Tasks, Profile
2. **Plugins**: 
   - Audio Player (free)
   - OneSignal (push notifications)
   - Confetti animation
3. **API Connectors**: For external scoring if needed
4. **Workflows**: Scheduled tasks, user actions, data processing

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

**Platform**: Web App (Bubble.io)
