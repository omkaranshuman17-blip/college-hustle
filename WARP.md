# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a **React-based mental health web application** that combines evidence-based assessments with gamification. The project uses modern web technologies including React, TypeScript, and Node.js to create an engaging therapeutic platform.

### Key Architecture Points

- **Frontend**: React with TypeScript for component-based development
- **Backend**: Node.js with Express for API services and data management
- **Database**: Secure database with privacy-focused schema design
- **Build System**: Modern React build toolchain with npm scripts and testing frameworks
- **Styling**: Tailwind CSS for responsive, mobile-first design

## Repository Structure

```
mental_health_tool/
├── mental-health-app/
│   ├── src/
│   │   ├── pages/           # Main application pages (Dashboard, Games, etc.)
│   │   ├── components/      # Reusable React components
│   │   ├── games/          # Interactive mental health games
│   │   └── assessments/    # Mental health assessment tools
│   ├── backend/            # Node.js backend services
│   └── package.json        # Project dependencies and scripts
├── database/SCHEMA.md       # Database schema and privacy rules
├── src/
│   ├── games/GAME_SPECS.md  # Specifications for mental health games
│   └── tests/ASSESSMENTS.md # Implementation guide for PHQ-9, GAD-7, Big Five, etc.
└── README.md                # Comprehensive project overview and roadmap
```

## Development Workflow

### React Development Commands

This React-based project uses standard web development workflows:

```powershell
# Navigate to the React app directory
cd mental-health-app

# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build

# View project documentation
Get-Content ../README.md

# Search for specific features or specifications
Select-String -Path "**/*.md" -Pattern "PHQ-9"

# Review database schema
Get-Content ../database/SCHEMA.md
```

### Working with Specifications

When modifying specifications or adding new features:

1. **Update documentation first** - All changes should be documented in the appropriate .md file
2. **Follow React component patterns** - Each game and assessment should be implemented as reusable components
3. **Include implementation notes** - Add React component details and TypeScript interfaces where applicable
4. **Test thoroughly** - Write unit tests for new components and features

## Core Components & Architecture

### 1. Mental Health Games System
Located in `mental-health-app/src/games/`, implements interactive therapeutic games:
- **BreathingBubbles**: Interactive breathing exercise with visual feedback
- **MoodGarden**: Plant seeds based on emotions and watch them grow
- **GratitudeClouds**: Write gratitude notes on floating clouds
- **StarlightMemory**: Memory game with calming starlight theme
- **EmotionRainbow**: Color emotions across a rainbow spectrum
- **PeacefulPuzzle**: Solve serene landscape puzzles for relaxation

Each game is implemented as a React component with TypeScript, animations, and scoring systems.

### 2. Assessment Framework
Located in `mental-health-app/src/components/assessments/`, implements validated mental health assessments:
- **PHQ-9**: Depression screening (9 questions, 0-27 score)
- **GAD-7**: Anxiety assessment (7 questions, 0-21 score)
- **MBTI Assessment**: Personality type assessment
- **Burnout Assessment**: Workplace burnout evaluation
- **Sleep Assessment**: Sleep quality evaluation

Includes TypeScript scoring functions and React form components with validation.

### 3. Database Architecture
Located in `database/SCHEMA.md`, defines:
- **User**: Privacy-focused user data with anonymous IDs
- **GameScore**: Tracks game performance with leaderboard support
- **TestResult**: Stores assessment results with strict privacy rules
- **DailyTask**: Manages gamified daily challenges
- **AudioTrack**: Background music library management
- **Badge**: Achievement system specifications

Privacy rules ensure GDPR compliance and anonymous-by-default design.

## React Integration Points

### Component Patterns
The project uses these standard React patterns:
- **Game Components** with state management for each game
- **Assessment Components** with form validation and scoring
- **Context Providers** for global state management
- **Custom Hooks** for reusable logic

### Library Dependencies
The following key libraries are used:
- **Framer Motion** (animations)
- **Heroicons** (iconography)
- **React Router** (navigation)
- **Zustand** (state management)
- **Tailwind CSS** (styling)

### TypeScript Integrations
TypeScript interfaces and functions are provided for:
- PHQ-9 and GAD-7 scoring algorithms
- Assessment result types and validation
- Game state management and scoring
- User data models and API responses

## Important Implementation Notes

### Privacy & Security Requirements
- All data must be anonymous by default
- Mental health assessment results are strictly private
- Include crisis resources (988 hotline) for high-risk scores
- Clear disclaimers that this is not a replacement for professional help

### Accessibility Requirements
- Mobile-first responsive design
- Screen reader compatibility
- Color blind mode for games
- Keyboard navigation support
- Touch-friendly buttons (minimum 44x44px)

### Gamification Elements
- Points system across all features
- Daily streak tracking
- Badge/achievement system
- Leaderboards (anonymous only)
- Progress bars and visual feedback

## Common Tasks

### Adding a New Game
1. Create React component in `mental-health-app/src/games/`
2. Implement game mechanics with TypeScript
3. Add Framer Motion animations for engagement
4. Include scoring system and progress tracking
5. Write unit tests for game logic
6. Update documentation in `src/games/GAME_SPECS.md`

### Adding a New Assessment
1. Create React component in `mental-health-app/src/components/assessments/`
2. Implement form validation with React Hook Form
3. Add TypeScript scoring function with proper typing
4. Define severity thresholds and recommendations
5. Include crisis intervention for high-risk scores
6. Write tests for scoring algorithms
7. Document in `src/tests/ASSESSMENTS.md`

### Modifying Database Schema
1. Update `database/SCHEMA.md`
2. Include privacy rules for new fields
3. Add indexes for performance
4. Document data retention policies

## Resources & References

### Mental Health Guidelines
- PHQ-9 and GAD-7 are validated clinical tools
- Follow WHO guidelines for mental health content
- Crisis resources: 988 (US), Crisis Text Line: 741741

### Creative Commons Music Sources
- FreeMusicArchive.org for ambient tracks
- Bensound.com for calming instrumental music
- Focus on nature sounds, soft piano, ambient textures

### React & Node.js Documentation
- Reference React official documentation for component patterns and best practices
- Use industry-standard security practices for JWT authentication and data protection
- Leverage Tailwind CSS utility classes for responsive design and mobile compatibility
- Follow TypeScript best practices for type safety and code maintainability
