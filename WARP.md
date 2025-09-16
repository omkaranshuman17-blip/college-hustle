# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a **Bubble.io no-code mental health web application** that combines evidence-based assessments with gamification. The project is primarily documentation and specification-based, as the actual implementation happens within the Bubble.io platform.

### Key Architecture Points

- **Platform**: Bubble.io (no-code platform) - actual app development happens in the Bubble.io web interface
- **Structure**: Specification-driven development with detailed markdown documentation
- **Database**: Uses Bubble.io's built-in database with privacy-focused schema defined in `database/SCHEMA.md`
- **No traditional build process**: This is a no-code project, so there are no npm scripts, compilation, or traditional testing

## Repository Structure

```
mental_health_tool/
├── database/SCHEMA.md       # Database schema and privacy rules for Bubble.io data types
├── src/
│   ├── games/GAME_SPECS.md  # Specifications for 4 mental health games
│   └── tests/ASSESSMENTS.md # Implementation guide for PHQ-9, GAD-7, Big Five, etc.
└── README.md                 # Comprehensive project overview and roadmap
```

## Development Workflow

### Bubble.io Development Commands

Since this is a Bubble.io project, traditional commands don't apply. Instead, use these approaches:

```powershell
# View project documentation
Get-Content README.md

# Search for specific features or specifications
Select-String -Path "**/*.md" -Pattern "PHQ-9"

# Review database schema
Get-Content database/SCHEMA.md

# Check game specifications
Get-Content src/games/GAME_SPECS.md

# Review assessment implementations
Get-Content src/tests/ASSESSMENTS.md
```

### Working with Specifications

When modifying specifications or adding new features:

1. **Update documentation first** - All changes should be documented in the appropriate .md file
2. **Follow the existing structure** - Each game and assessment has detailed specifications
3. **Include implementation notes** - Add Bubble.io workflow details and JavaScript snippets where applicable

## Core Components & Architecture

### 1. Mental Health Games System
Located in `src/games/GAME_SPECS.md`, implements 4 therapeutic games:
- **Mood Matcher**: Emotional awareness puzzle matching emotions with coping strategies
- **Stress Buster Bubble Pop**: Arcade-style stress relief with affirmations
- **Gratitude Journal Quest**: Adventure game for building gratitude habits
- **Mindfulness Maze**: Educational puzzle with mental health trivia

Each game includes detailed Bubble.io implementation notes, scoring systems, and JavaScript snippets for game logic.

### 2. Assessment Framework
Located in `src/tests/ASSESSMENTS.md`, implements validated mental health assessments:
- **PHQ-9**: Depression screening (9 questions, 0-27 score)
- **GAD-7**: Anxiety assessment (7 questions, 0-21 score)
- **Big Five Personality**: 20-question personality assessment
- **Burnout Assessment**: 10-question burnout evaluation
- **Sleep Quality**: 8-question sleep health assessment

Includes JavaScript scoring functions and Bubble.io workflow specifications.

### 3. Database Architecture
Located in `database/SCHEMA.md`, defines:
- **User**: Privacy-focused user data with anonymous IDs
- **GameScore**: Tracks game performance with leaderboard support
- **TestResult**: Stores assessment results with strict privacy rules
- **DailyTask**: Manages gamified daily challenges
- **AudioTrack**: Background music library management
- **Badge**: Achievement system specifications

Privacy rules ensure GDPR compliance and anonymous-by-default design.

## Bubble.io Integration Points

### Workflow Patterns
The project uses these standard Bubble.io workflow patterns:
- **Game Start/Loop/End** workflows for each game
- **Assessment Flow** for test administration
- **Scheduled Workflows** for daily task generation
- **Privacy Rules** for data access control

### Plugin Requirements
The following Bubble.io plugins are specified:
- Audio Player (for background music)
- OneSignal (push notifications)
- Confetti animation (gamification feedback)

### JavaScript Integrations
JavaScript code snippets are provided for:
- PHQ-9 and GAD-7 scoring algorithms
- Big Five personality trait calculations
- Game physics (Stress Buster bubble mechanics)
- Maze pathfinding (A* algorithm for Mindfulness Maze)

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
1. Document specifications in `src/games/GAME_SPECS.md`
2. Include game mechanics, scoring, visual design
3. Add Bubble.io workflow implementation notes
4. Specify any JavaScript requirements

### Adding a New Assessment
1. Document in `src/tests/ASSESSMENTS.md`
2. Include validated questions and scoring
3. Add JavaScript scoring function
4. Define severity thresholds and recommendations
5. Include crisis intervention for high-risk scores

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

### Bubble.io Documentation
- Reference Bubble.io's official documentation for platform-specific implementations
- Use Bubble's built-in security features for data protection
- Leverage Bubble's responsive design system for mobile compatibility
