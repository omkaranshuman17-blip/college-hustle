# Mental Health Games Specifications

## Game Design Philosophy
All games are designed to be:
- **Therapeutic**: Promote mental wellness through gameplay
- **Educational**: Teach coping strategies and emotional awareness
- **Accessible**: Simple controls, clear instructions
- **Engaging**: Fun and rewarding to encourage regular play
- **Non-triggering**: Avoid content that could cause distress

---

## Game 1: Mood Matcher
**Category**: Emotional Awareness Puzzle  
**Objective**: Match emotions with appropriate coping strategies

### Game Mechanics
- **Grid Layout**: 4x4 or 5x5 grid of cards (adjustable difficulty)
- **Card Types**:
  - Emotion cards (e.g., Anxious, Sad, Angry, Overwhelmed)
  - Coping strategy cards (e.g., Deep Breathing, Take a Walk, Journal)
- **Matching Rules**: Each emotion has 2-3 valid coping strategies
- **Timer**: Optional time challenge mode
- **Lives**: 3 mistakes allowed in challenge mode

### Visual Design
```
┌─────────────────────────────────┐
│         MOOD MATCHER            │
├─────────────────────────────────┤
│  Score: 250  Time: 01:23  ♥♥♥  │
├─────────────────────────────────┤
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐      │
│  │ ? │ │ ? │ │ ? │ │ ? │      │
│  └───┘ └───┘ └───┘ └───┘      │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐      │
│  │ 😰 │ │ ? │ │ ? │ │ 🧘 │      │
│  └───┘ └───┘ └───┘ └───┘      │
└─────────────────────────────────┘
```

### Scoring System
- Correct match: +50 points
- Speed bonus: +10 points per second under par time
- Combo multiplier: x2 for 3 consecutive matches
- Perfect round: +200 bonus points

### Educational Content
Each successful match displays a tooltip:
- Why this strategy works
- Quick tip for implementation
- Encouraging message

### Implementation in Bubble
1. **Data Type**: GameCard
   - card_id, type (emotion/strategy), icon, description, valid_matches
2. **Repeating Group**: Display grid of cards
3. **Workflows**:
   - On card click → Flip animation
   - Check match → Update score/feedback
   - Game complete → Show results & tips

---

## Game 2: Stress Buster Bubble Pop
**Category**: Arcade-style Stress Relief  
**Objective**: Pop bubbles representing stressors to reveal affirmations

### Game Mechanics
- **Bubble Generation**: Random spawn at screen bottom
- **Bubble Types**:
  - Common stressors (Work, School, Social)
  - Power-ups (Slow-mo, Multi-pop, Shield)
  - Bonus bubbles (Gold for extra points)
- **Rising Speed**: Increases with level progression
- **Game Over**: When bubbles reach top of screen

### Visual Design
```
┌─────────────────────────────────┐
│      STRESS BUSTER              │
├─────────────────────────────────┤
│  Level: 3   Score: 1,250        │
├─────────────────────────────────┤
│              ○                  │
│     ○              ○            │
│         ○      ○                │
│  ○          ○         ○         │
│      ○  "Work"  ○  "Exams"      │
│  ○      ○         ○      ○      │
│─────────────────────────────────│
│     TAP BUBBLES TO POP!         │
└─────────────────────────────────┘
```

### Affirmations Pool
When bubble pops, display random affirmation:
- "You are stronger than you think"
- "This too shall pass"
- "Take a deep breath"
- "You've got this!"
- "One step at a time"

### Power-Ups
- **Zen Mode**: Slows all bubbles for 10 seconds
- **Burst**: Pops all visible bubbles
- **Shield**: Protects from rising bubbles for 5 seconds
- **Double Points**: 2x score for 15 seconds

### Implementation in Bubble
1. **HTML Element**: Canvas for bubble animation
2. **JavaScript**: Bubble physics and collision detection
3. **Workflows**:
   - Generate bubbles on timer
   - Handle pop events
   - Update score and show affirmations
   - Level progression logic

---

## Game 3: Gratitude Journal Quest
**Category**: Adventure/Collection  
**Objective**: Build gratitude habit through daily quests

### Game Mechanics
- **Daily Prompts**: 3 gratitude entries required
- **Categories**:
  - People (someone who helped you)
  - Experiences (positive moment)
  - Things (something you appreciate)
  - Personal (quality you like about yourself)
- **Quest Map**: Visual progress through themed worlds
- **Collectibles**: Unlock items/characters for journal

### Visual Design
```
┌─────────────────────────────────┐
│    GRATITUDE JOURNAL QUEST      │
├─────────────────────────────────┤
│  Day 7 Streak 🔥  Points: 450   │
├─────────────────────────────────┤
│  Today's Quest: "Nature Walk"   │
│  ┌────────────────────────┐     │
│  │ 1. I'm grateful for... │     │
│  │ _____________________ │     │
│  │ 2. I'm grateful for... │     │
│  │ _____________________ │     │
│  │ 3. I'm grateful for... │     │
│  └────────────────────────┘     │
│  [Submit] [Need Ideas?]          │
└─────────────────────────────────┘
```

### Progression System
- **Worlds**: 
  1. Mindful Meadow (Days 1-7)
  2. Grateful Garden (Days 8-14)
  3. Appreciation Alps (Days 15-21)
  4. Thankful Temple (Days 22-30)
- **Rewards**: Badges, avatars, journal themes
- **Streaks**: Bonus points for consecutive days

### Prompt Generator
Dynamic prompts based on:
- Season/weather
- Day of week
- User's previous entries
- Special occasions

### Implementation in Bubble
1. **Data Type**: GratitudeEntry
   - user, date, entries (list), category, points_earned
2. **Scheduled Workflow**: Generate daily prompts at midnight
3. **Visual Elements**:
   - Progress map (custom plugin or HTML)
   - Entry form with auto-save
   - Achievement notifications

---

## Game 4: Mindfulness Maze
**Category**: Educational Puzzle  
**Objective**: Navigate maze while learning mental health facts

### Game Mechanics
- **Maze Generation**: Procedural, increasing complexity
- **Trivia Checkpoints**: Answer questions to unlock paths
- **Time Bonus**: Complete quickly for extra points
- **Zen Mode**: No timer, focus on learning
- **Collectibles**: Mental health tips scattered throughout

### Visual Design
```
┌─────────────────────────────────┐
│      MINDFULNESS MAZE           │
├─────────────────────────────────┤
│  Level: 2  Time: 00:45  ❤️: 85  │
├─────────────────────────────────┤
│  ╔═══╦═══════╦═══╗              │
│  ║ @ ║       ║ ? ║              │
│  ║   ╬   ═   ╬   ║              │
│  ║   ║       ║   ║              │
│  ╚═══╩═══════╩═══╝              │
│  @ = You  ? = Question  ⭐ = Tip │
└─────────────────────────────────┘
```

### Trivia Categories
Based on WHO guidelines:
1. **Stress Management**
   - "What percentage of illness is stress-related?"
   - "Name a proven stress-reduction technique"
2. **Sleep Hygiene**
   - "Recommended hours of sleep for adults?"
   - "Best bedroom temperature for sleep?"
3. **Emotional Regulation**
   - "What is the 5-4-3-2-1 grounding technique?"
   - "How long should you practice deep breathing?"
4. **Social Connection**
   - "How does social support affect mental health?"
   - "Signs of a healthy relationship?"

### Educational Tips
Collectible facts throughout maze:
- "Exercise releases endorphins, natural mood boosters"
- "Gratitude practice can improve sleep quality"
- "Social connections are vital for mental health"
- "Mindfulness reduces anxiety by 58%"

### Implementation in Bubble
1. **Grid System**: Repeating group for maze layout
2. **Path Finding**: A* algorithm in JavaScript
3. **Question Database**: 
   - questions, answers, difficulty, category, explanation
4. **Progress Tracking**:
   - Mazes completed, facts learned, accuracy rate

---

## Shared Game Components

### Leaderboard System
- **Anonymous Display**: Show usernames only
- **Categories**:
  - Daily high scores
  - Weekly champions
  - All-time legends
  - Most improved
- **Opt-in**: Users choose to participate

### Achievement System
Common badges across all games:
- **First Steps**: Complete first game
- **Dedicated**: Play 7 days in a row
- **Explorer**: Try all 4 games
- **Master**: Score in top 10%
- **Helper**: Share game with friend
- **Zen Master**: 30-day streak

### Sound Effects
- **Positive**: Chimes, bells for success
- **Neutral**: Soft clicks for interactions
- **Encouraging**: Applause for achievements
- **Ambient**: Optional background nature sounds

### Accessibility Features
- **Color Blind Mode**: Pattern-based matching
- **Large Text Option**: Increase font sizes
- **Reduced Motion**: Disable animations
- **Screen Reader**: Alt text for all elements
- **Keyboard Navigation**: Full keyboard support

---

## Technical Implementation Notes

### Bubble.io Workflows
1. **Game Start**:
   - Initialize game state
   - Reset score/timer
   - Load user preferences
   
2. **Game Loop**:
   - Update game elements
   - Check win/lose conditions
   - Handle user input
   
3. **Game End**:
   - Calculate final score
   - Save to database
   - Show results/achievements
   - Offer replay or next game

### Performance Optimization
- Limit active elements on screen
- Use Bubble's built-in animations
- Lazy load game assets
- Cache frequently used data

### Mobile Responsiveness
- Touch-friendly buttons (min 44x44px)
- Swipe gestures where appropriate
- Portrait orientation optimized
- Responsive grid layouts

### Analytics Tracking
- Game start/completion rates
- Average session duration
- Most popular games
- Drop-off points
- Score distributions
