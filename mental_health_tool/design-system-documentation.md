# MindSpace Design System Documentation v1.0
> A comprehensive design system for a mental health and wellness application targeting teenagers and young adults

## Table of Contents
1. [Design Principles](#design-principles)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Grid System](#spacing--grid-system)
5. [Component Library](#component-library)
6. [Motion & Animation](#motion--animation)
7. [Accessibility Standards](#accessibility-standards)
8. [Implementation Guidelines](#implementation-guidelines)

---

## Design Principles

### Core Values
- **Calm & Peaceful**: Every element should reduce anxiety, not create it
- **Accessible & Inclusive**: Design for all abilities and backgrounds
- **Non-judgmental**: Neutral, supportive language and imagery
- **Youth-Appropriate**: Modern but not trendy, serious but not clinical
- **Privacy-First**: Subtle, discreet interface elements

### Visual Hierarchy Rules
1. **Primary Focus**: User's immediate emotional needs (crisis help, mood check-in)
2. **Secondary Focus**: Recommended actions and exercises
3. **Tertiary Focus**: Educational content and community resources

---

## Color System

### Color Tokens

#### Neutral Palette (Drift Slate)
```css
--color-slate-50:  #F8FAFC; /* RGB: 248, 250, 252 */
--color-slate-100: #F1F5F9; /* RGB: 241, 245, 249 */
--color-slate-200: #E2E8F0; /* RGB: 226, 232, 240 */
--color-slate-300: #CBD5E1; /* RGB: 203, 213, 225 */
--color-slate-400: #94A3B8; /* RGB: 148, 163, 184 */
--color-slate-500: #64748B; /* RGB: 100, 116, 139 */
--color-slate-600: #475569; /* RGB: 71, 85, 105 */
--color-slate-700: #334155; /* RGB: 51, 65, 85 */
--color-slate-800: #1F2937; /* RGB: 31, 41, 55 */
--color-slate-900: #0F172A; /* RGB: 15, 23, 42 */
```

#### Primary Palette (Tide Teal)
```css
--color-teal-50:  #E6FAF7; /* RGB: 230, 250, 247 */
--color-teal-100: #C9F3EC; /* RGB: 201, 243, 236 */
--color-teal-200: #9FE7DC; /* RGB: 159, 231, 220 */
--color-teal-300: #72D9CB; /* RGB: 114, 217, 203 */
--color-teal-400: #49C9B9; /* RGB: 73, 201, 185 */
--color-teal-500: #2AB3A9; /* RGB: 42, 179, 169 */ /* PRIMARY */
--color-teal-600: #1B918C; /* RGB: 27, 145, 140 */
--color-teal-700: #136F6C; /* RGB: 19, 111, 108 */
--color-teal-800: #0E4D4C; /* RGB: 14, 77, 76 */
--color-teal-900: #0A3536; /* RGB: 10, 53, 54 */
```

#### Secondary Palette (Lavender Haze)
```css
--color-lavender-50:  #F5F3FF; /* RGB: 245, 243, 255 */
--color-lavender-100: #ECE9FE; /* RGB: 236, 233, 254 */
--color-lavender-200: #DCD6FD; /* RGB: 220, 214, 253 */
--color-lavender-300: #C2B9FA; /* RGB: 194, 185, 250 */
--color-lavender-400: #A596F3; /* RGB: 165, 150, 243 */
--color-lavender-500: #8B79EC; /* RGB: 139, 121, 236 */ /* SECONDARY */
--color-lavender-600: #6E5DCD; /* RGB: 110, 93, 205 */
--color-lavender-700: #5849A9; /* RGB: 88, 73, 169 */
--color-lavender-800: #443885; /* RGB: 68, 56, 133 */
--color-lavender-900: #30285F; /* RGB: 48, 40, 95 */
```

#### Accent Palette (Sunrise Peach)
```css
--color-peach-50:  #FFF6F1; /* RGB: 255, 246, 241 */
--color-peach-100: #FFE9DC; /* RGB: 255, 233, 220 */
--color-peach-200: #FFD2B6; /* RGB: 255, 210, 182 */
--color-peach-300: #FFB789; /* RGB: 255, 183, 137 */
--color-peach-400: #FF9A61; /* RGB: 255, 154, 97 */
--color-peach-500: #FF7E45; /* RGB: 255, 126, 69 */ /* ACCENT */
--color-peach-600: #E56536; /* RGB: 229, 101, 54 */
--color-peach-700: #B94E2B; /* RGB: 185, 78, 43 */
--color-peach-800: #8E3B23; /* RGB: 142, 59, 35 */
--color-peach-900: #5F2918; /* RGB: 95, 41, 24 */
```

#### Semantic Colors
```css
--color-success:     #28A879; /* RGB: 40, 168, 121 */
--color-success-bg:  #E6F7F1; /* RGB: 230, 247, 241 */
--color-warning:     #F2B23D; /* RGB: 242, 178, 61 */
--color-warning-bg:  #FFF9E6; /* RGB: 255, 249, 230 */
--color-danger:      #D95D5D; /* RGB: 217, 93, 93 */
--color-danger-bg:   #FDEAEA; /* RGB: 253, 234, 234 */
--color-info:        #2AB3A9; /* RGB: 42, 179, 169 (Teal-500) */
--color-info-bg:     #E6FAF7; /* RGB: 230, 250, 247 (Teal-50) */
```

#### Surface Colors
```css
/* Light Mode */
--color-background:    #F6F8FA; /* RGB: 246, 248, 250 */
--color-surface:       #FFFFFF; /* RGB: 255, 255, 255 */
--color-surface-raised:#FFFFFF; /* RGB: 255, 255, 255 + shadow */
--color-border:        #E2E8F0; /* RGB: 226, 232, 240 (Slate-200) */
--color-divider:       #F1F5F9; /* RGB: 241, 245, 249 (Slate-100) */

/* Dark Mode */
--color-dark-background:    #0A0F1B; /* RGB: 10, 15, 27 */
--color-dark-surface:       #111827; /* RGB: 17, 24, 39 */
--color-dark-surface-raised:#1F2937; /* RGB: 31, 41, 55 */
--color-dark-border:        #334155; /* RGB: 51, 65, 85 */
--color-dark-divider:       #1F2937; /* RGB: 31, 41, 55 */
```

#### Gradient Definitions
```css
--gradient-primary: linear-gradient(135deg, #2AB3A9 0%, #8B79EC 100%);
--gradient-dawn:    linear-gradient(145deg, #8B79EC 0%, #FF9A61 100%);
--gradient-calm:    linear-gradient(180deg, #E6FAF7 0%, #F5F3FF 100%);
--gradient-subtle:  linear-gradient(180deg, rgba(42, 179, 169, 0.08) 0%, rgba(139, 121, 236, 0.08) 100%);
```

### Color Usage Rules

#### DO's ✅
- Use Teal-500 for primary CTAs and positive actions
- Apply semantic colors consistently (success=green, warning=amber, danger=soft red)
- Maintain 4.5:1 contrast ratio for body text
- Use gradients sparingly for special moments (celebrations, achievements)
- Apply 60-30-10 rule: 60% neutral, 30% primary, 10% accent

#### DON'Ts ❌
- Never use pure black (#000000) or pure white for text
- Avoid using red for anything except critical errors
- Don't use more than 3 colors in a single component
- Never use gradients on text (accessibility issue)
- Don't use color as the only indicator (add icons/labels)

---

## Typography

### Font Stack
```css
/* Heading Font */
--font-heading: 'Plus Jakarta Sans', 'Segoe UI Variable', 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;

/* Body Font */
--font-body: 'Inter', 'Segoe UI', 'Roboto', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;

/* Display Font (Limited Use) */
--font-display: 'Sora', 'Plus Jakarta Sans', system-ui, sans-serif;

/* Monospace (Code/Numbers) */
--font-mono: 'JetBrains Mono', 'Consolas', 'Monaco', monospace;
```

### Type Scale (Major Third - 1.25x)
```css
/* Display (Hero Only) */
--text-display-lg: 48px; /* line-height: 56px, weight: 600 */
--text-display:    40px; /* line-height: 48px, weight: 600 */

/* Headings */
--text-h1: 32px; /* line-height: 40px, weight: 700, tracking: -0.02em */
--text-h2: 26px; /* line-height: 34px, weight: 600, tracking: -0.02em */
--text-h3: 22px; /* line-height: 30px, weight: 600, tracking: -0.01em */
--text-h4: 18px; /* line-height: 26px, weight: 600, tracking: 0 */
--text-h5: 16px; /* line-height: 24px, weight: 600, tracking: 0 */

/* Body */
--text-body-lg: 18px; /* line-height: 28px, weight: 400, tracking: 0 */
--text-body:    16px; /* line-height: 24px, weight: 400, tracking: 0.002em */
--text-body-sm: 14px; /* line-height: 22px, weight: 400, tracking: 0.002em */

/* Utility */
--text-caption: 12px; /* line-height: 18px, weight: 400, tracking: 0.004em */
--text-overline:11px; /* line-height: 16px, weight: 600, tracking: 0.08em, text-transform: uppercase */
```

### Typography Classes
```css
.heading-1 {
  font-family: var(--font-heading);
  font-size: 32px;
  line-height: 40px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-slate-900);
}

.body-text {
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  letter-spacing: 0.002em;
  color: var(--color-slate-700);
}

.body-text-relaxed {
  line-height: 28px; /* 1.75x for longer reading */
}

.caption {
  font-family: var(--font-body);
  font-size: 12px;
  line-height: 18px;
  font-weight: 400;
  letter-spacing: 0.004em;
  color: var(--color-slate-500);
}
```

### Typography Usage Rules

#### DO's ✅
- Use Plus Jakarta Sans for all headings
- Maintain 16px minimum for body text
- Apply 1.5-1.75x line-height for readability
- Use font-weight variations (400, 500, 600, 700) for hierarchy
- Left-align body text for better readability

#### DON'Ts ❌
- Don't use more than 2 font families per page
- Avoid font sizes smaller than 12px
- Don't center-align long paragraphs
- Never use light weights (300 or below) for body text
- Don't exceed 65-75 characters per line for paragraphs

---

## Spacing & Grid System

### Spacing Scale (Base 4px)
```css
--space-0:   0px;
--space-1:   4px;
--space-2:   8px;
--space-3:   12px;
--space-4:   16px;
--space-5:   20px;
--space-6:   24px;
--space-8:   32px;
--space-10:  40px;
--space-12:  48px;
--space-16:  64px;
--space-20:  80px;
--space-24:  96px;
--space-32:  128px;
```

### Grid System
```css
/* Container Widths */
--container-xs:  480px;
--container-sm:  640px;
--container-md:  768px;
--container-lg:  1024px;
--container-xl:  1280px;
--container-2xl: 1536px;

/* Grid Configuration */
.grid-container {
  display: grid;
  gap: var(--space-4); /* 16px default */
  padding: var(--space-4);
}

/* Column System */
.grid-cols-1  { grid-template-columns: repeat(1, 1fr); }
.grid-cols-2  { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3  { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4  { grid-template-columns: repeat(4, 1fr); }
.grid-cols-6  { grid-template-columns: repeat(6, 1fr); }
.grid-cols-12 { grid-template-columns: repeat(12, 1fr); }

/* Responsive Breakpoints */
--breakpoint-xs: 0px;
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

### Layout Patterns
```css
/* Card Grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-6);
  padding: var(--space-6);
}

/* Content Layout */
.content-layout {
  max-width: var(--container-lg);
  margin: 0 auto;
  padding: var(--space-6) var(--space-4);
}

/* Section Spacing */
.section {
  padding-top: var(--space-12);
  padding-bottom: var(--space-12);
}

.section-compact {
  padding-top: var(--space-8);
  padding-bottom: var(--space-8);
}
```

### Spacing Usage Rules

#### DO's ✅
- Use consistent spacing from the scale (4px increments)
- Apply larger spacing between sections (48px+)
- Use 16-24px for component internal padding
- Maintain 8-12px spacing between related elements
- Use negative space to create visual hierarchy

#### DON'Ts ❌
- Don't use arbitrary spacing values
- Avoid spacing smaller than 4px
- Don't mix spacing scales in the same component
- Never use margins on both sides of adjacent elements
- Don't create cramped interfaces (minimum 44px touch targets)

---

## Component Library

### 1. Buttons

#### Primary Button
```css
.btn-primary {
  /* Structure */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  min-height: 44px;
  min-width: 120px;
  
  /* Visual */
  background: var(--color-teal-500);
  color: #FFFFFF;
  border: none;
  border-radius: 24px;
  
  /* Typography */
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.002em;
  
  /* Interaction */
  cursor: pointer;
  transition: all 180ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.btn-primary:hover {
  background: var(--color-teal-600);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(42, 179, 169, 0.2);
}

.btn-primary:active {
  background: var(--color-teal-700);
  transform: translateY(0);
}

.btn-primary:focus-visible {
  outline: 2px solid var(--color-teal-300);
  outline-offset: 2px;
}

.btn-primary:disabled {
  background: var(--color-slate-300);
  cursor: not-allowed;
  transform: none;
}
```

#### Secondary Button
```css
.btn-secondary {
  /* Same structure as primary */
  background: transparent;
  color: var(--color-teal-600);
  border: 2px solid var(--color-teal-400);
}

.btn-secondary:hover {
  background: var(--color-teal-50);
  border-color: var(--color-teal-500);
}
```

#### Text Button
```css
.btn-text {
  padding: 8px 16px;
  background: transparent;
  color: var(--color-teal-600);
  border: none;
  border-radius: 8px;
  font-weight: 500;
  position: relative;
}

.btn-text::after {
  content: '';
  position: absolute;
  bottom: 6px;
  left: 16px;
  right: 16px;
  height: 2px;
  background: var(--color-teal-200);
  opacity: 0;
  transition: opacity 180ms ease;
}

.btn-text:hover::after {
  opacity: 1;
}
```

#### Button Sizes
```css
.btn-sm { padding: 8px 16px; min-height: 36px; font-size: 14px; }
.btn-md { padding: 12px 24px; min-height: 44px; font-size: 16px; } /* default */
.btn-lg { padding: 16px 32px; min-height: 52px; font-size: 18px; }
```

#### Button Usage Rules

**DO's ✅**
- Use primary buttons for main actions (1 per screen)
- Include icons for clarity (16-20px size)
- Maintain 44px minimum touch target
- Group related actions together
- Use descriptive labels ("Start Exercise" not "Start")

**DON'Ts ❌**
- Don't use more than 2 primary buttons per view
- Avoid buttons smaller than 36px height
- Don't use all caps for button text
- Never disable without explanation
- Don't place destructive actions prominently

### 2. Cards

#### Base Card
```css
.card {
  background: var(--color-surface);
  border-radius: 16px;
  padding: var(--space-6);
  border: 1px solid var(--color-border);
  transition: all 200ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.card-interactive {
  cursor: pointer;
}

.card-interactive:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
}

/* Card with Breathing Animation */
.card-breathing {
  animation: breathe 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes breathe {
  0%, 100% { 
    box-shadow: 0 0 0 0 rgba(42, 179, 169, 0.2);
  }
  50% { 
    box-shadow: 0 0 0 12px rgba(42, 179, 169, 0);
  }
}
```

#### Exercise Card
```css
.exercise-card {
  display: flex;
  gap: var(--space-4);
  padding: var(--space-4);
  background: var(--color-surface);
  border-radius: 12px;
  border: 1px solid var(--color-border);
}

.exercise-card__icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--gradient-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
}

.exercise-card__content {
  flex: 1;
}

.exercise-card__title {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-slate-800);
  margin-bottom: 4px;
}

.exercise-card__meta {
  display: flex;
  gap: var(--space-3);
  font-size: 14px;
  color: var(--color-slate-500);
}

.exercise-card__duration {
  display: flex;
  align-items: center;
  gap: 4px;
}
```

### 3. Form Elements

#### Text Input
```css
.input {
  width: 100%;
  padding: 12px 16px;
  background: var(--color-slate-50);
  border: 1px solid transparent;
  border-radius: 12px;
  font-size: 16px;
  font-family: var(--font-body);
  color: var(--color-slate-800);
  transition: all 180ms ease;
}

.input::placeholder {
  color: var(--color-slate-400);
}

.input:hover {
  background: var(--color-slate-100);
}

.input:focus {
  outline: none;
  background: var(--color-surface);
  border-color: var(--color-teal-400);
  box-shadow: 0 0 0 3px rgba(42, 179, 169, 0.1);
}

.input-error {
  border-color: var(--color-danger);
}

.input-success {
  border-color: var(--color-success);
}

/* Input with Icon */
.input-group {
  position: relative;
}

.input-group__icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-slate-400);
}

.input-group .input {
  padding-left: 44px;
}
```

#### Textarea
```css
.textarea {
  /* Inherits from .input */
  min-height: 120px;
  resize: vertical;
  font-family: var(--font-body);
  line-height: 24px;
}

.textarea-journal {
  min-height: 240px;
  background: linear-gradient(var(--color-surface) 23px, transparent 24px);
  background-size: 100% 24px;
  background-attachment: local;
  line-height: 24px;
}
```

#### Mood Selector Chips
```css
.mood-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: var(--color-surface);
  border: 2px solid var(--color-slate-200);
  border-radius: 20px;
  cursor: pointer;
  transition: all 180ms ease;
}

.mood-chip:hover {
  background: var(--color-slate-50);
  border-color: var(--color-slate-300);
}

.mood-chip.selected {
  background: var(--gradient-subtle);
  border-color: var(--color-teal-400);
  color: var(--color-teal-700);
}

.mood-chip__emoji {
  font-size: 20px;
}

.mood-chip__label {
  font-size: 14px;
  font-weight: 500;
}
```

### 4. Navigation

#### Bottom Navigation (Mobile)
```css
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 var(--space-4);
  z-index: 100;
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 48px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 180ms ease;
  position: relative;
}

.nav-item:hover {
  background: var(--color-slate-50);
}

.nav-item.active {
  color: var(--color-teal-500);
}

.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: -8px;
  width: 4px;
  height: 4px;
  background: var(--color-teal-500);
  border-radius: 2px;
}

.nav-item__icon {
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
}

.nav-item__label {
  font-size: 11px;
  font-weight: 500;
}
```

### 5. Dialogs & Modals

#### Bottom Sheet (Mobile)
```css
.bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--color-surface);
  border-radius: 24px 24px 0 0;
  padding: var(--space-6);
  padding-bottom: env(safe-area-inset-bottom, 24px);
  transform: translateY(100%);
  transition: transform 300ms cubic-bezier(0.2, 0.8, 0.2, 1);
  z-index: 200;
  max-height: 90vh;
  overflow-y: auto;
}

.bottom-sheet.open {
  transform: translateY(0);
}

.bottom-sheet__handle {
  width: 48px;
  height: 4px;
  background: var(--color-slate-300);
  border-radius: 2px;
  margin: 0 auto 20px;
}

/* Scrim */
.scrim {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(2px);
  opacity: 0;
  pointer-events: none;
  transition: opacity 300ms ease;
}

.scrim.active {
  opacity: 1;
  pointer-events: all;
}
```

### 6. Progress Indicators

#### Circular Progress
```css
.progress-ring {
  width: 120px;
  height: 120px;
  position: relative;
}

.progress-ring__svg {
  transform: rotate(-90deg);
}

.progress-ring__circle-bg {
  stroke: var(--color-slate-200);
  stroke-width: 8;
  fill: none;
}

.progress-ring__circle {
  stroke: url(#gradient-progress);
  stroke-width: 8;
  fill: none;
  stroke-linecap: round;
  stroke-dasharray: 339.292; /* 2πr where r=54 */
  stroke-dashoffset: calc(339.292 * (1 - var(--progress)));
  transition: stroke-dashoffset 600ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

/* Progress Gradient */
#gradient-progress {
  --color-stop-1: var(--color-teal-400);
  --color-stop-2: var(--color-lavender-500);
}
```

#### Linear Progress
```css
.progress-bar {
  height: 8px;
  background: var(--color-slate-200);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.progress-bar__fill {
  height: 100%;
  background: var(--gradient-primary);
  border-radius: 4px;
  width: var(--progress, 0%);
  transition: width 600ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

/* Breathing Progress Animation */
.progress-breathing {
  animation: progress-breathe 4s ease-in-out infinite;
}

@keyframes progress-breathe {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}
```

### 7. Special Components

#### Crisis Help Button
```css
.crisis-button {
  position: fixed;
  top: 16px;
  right: 16px;
  padding: 10px 20px;
  background: var(--color-teal-700);
  color: white;
  border-radius: 24px;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
  z-index: 150;
  cursor: pointer;
  transition: all 180ms ease;
}

.crisis-button:hover {
  background: var(--color-teal-800);
  transform: scale(1.05);
}

.crisis-button__icon {
  width: 16px;
  height: 16px;
}
```

#### Mood Check-in Hero
```css
.mood-checkin {
  background: var(--gradient-calm);
  border-radius: 20px;
  padding: var(--space-8);
  margin-bottom: var(--space-6);
  text-align: center;
}

.mood-checkin__title {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-slate-800);
  margin-bottom: var(--space-6);
}

.mood-checkin__chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  justify-content: center;
  margin-bottom: var(--space-6);
}

.mood-checkin__action {
  margin-top: var(--space-6);
}
```

---

## Motion & Animation

### Animation Principles
```css
/* Timing Functions */
--ease-in:     cubic-bezier(0.4, 0, 1, 1);
--ease-out:    cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-smooth: cubic-bezier(0.2, 0.8, 0.2, 1);
--ease-breath: cubic-bezier(0.4, 0, 0.6, 1);

/* Duration Scales */
--duration-instant: 50ms;
--duration-fast:    120ms;
--duration-normal:  200ms;
--duration-slow:    300ms;
--duration-slower:  400ms;
--duration-breath:  6000ms;
```

### Standard Animations
```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide Up */
@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scale In */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Gentle Pulse */
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* Breathing Glow */
@keyframes breathingGlow {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(42, 179, 169, 0.4);
  }
  50% {
    box-shadow: 0 0 20px 10px rgba(42, 179, 169, 0);
  }
}
```

### Motion Usage Rules

#### DO's ✅
- Use smooth, natural easing (ease-smooth)
- Keep animations under 400ms for UI feedback
- Apply enter/exit animations to modals
- Use breathing animations for meditation features
- Respect prefers-reduced-motion

#### DON'Ts ❌
- Don't animate more than 3 properties simultaneously
- Avoid bouncy or springy animations
- Don't loop animations unnecessarily
- Never animate during text input
- Don't use animations longer than 600ms for interactions

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .breathing-animation {
    animation: none;
  }
}
```

---

## Accessibility Standards

### Color Contrast Requirements
```
Text Size           Normal Text    Bold Text
< 18px             4.5:1          3:1
≥ 18px             3:1            3:1
≥ 24px             3:1            3:1

UI Components:     3:1 minimum
Graphics:          3:1 minimum
```

### Focus States
```css
/* Visible Focus */
:focus-visible {
  outline: 2px solid var(--color-teal-500);
  outline-offset: 2px;
}

/* Focus Within Container */
.card:focus-within {
  box-shadow: 0 0 0 2px var(--color-teal-500);
}

/* Skip to Content */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-teal-600);
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  z-index: 1000;
}

.skip-link:focus {
  top: 0;
}
```

### ARIA Labels
```html
<!-- Button with icon only -->
<button aria-label="Open settings" class="btn-icon">
  <svg aria-hidden="true">...</svg>
</button>

<!-- Form field -->
<label for="mood" class="sr-only">How are you feeling?</label>
<select id="mood" aria-describedby="mood-help">
  <option>Happy</option>
  <option>Anxious</option>
</select>
<span id="mood-help" class="help-text">Select your current mood</span>

<!-- Progress indicator -->
<div role="progressbar" 
     aria-valuenow="60" 
     aria-valuemin="0" 
     aria-valuemax="100"
     aria-label="Exercise progress">
  <div class="progress-bar__fill" style="--progress: 60%"></div>
</div>
```

### Keyboard Navigation
```css
/* Tab order indication */
[tabindex]:focus-visible {
  outline: 2px solid var(--color-teal-500);
  outline-offset: 2px;
}

/* Interactive elements must be keyboard accessible */
.interactive {
  cursor: pointer;
}

.interactive:focus-visible {
  outline: 2px solid var(--color-teal-500);
  outline-offset: 2px;
}
```

---

## Implementation Guidelines

### CSS Architecture

#### File Structure
```
styles/
├── base/
│   ├── reset.css
│   ├── variables.css
│   └── typography.css
├── components/
│   ├── buttons.css
│   ├── cards.css
│   ├── forms.css
│   └── navigation.css
├── layouts/
│   ├── grid.css
│   └── containers.css
├── utilities/
│   ├── spacing.css
│   ├── colors.css
│   └── animations.css
└── main.css
```

#### CSS Variables Setup
```css
:root {
  /* All color variables */
  /* All spacing variables */
  /* All typography variables */
  /* All animation variables */
}

[data-theme="dark"] {
  /* Dark mode color overrides */
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    /* Auto dark mode */
  }
}
```

### Component Implementation Checklist

For each component:
- [ ] Accessible color contrast (4.5:1 for text)
- [ ] Keyboard navigation support
- [ ] Focus states defined
- [ ] Touch targets ≥ 44px
- [ ] ARIA labels where needed
- [ ] Responsive behavior defined
- [ ] Dark mode variant
- [ ] Animation respects reduced motion
- [ ] Loading states included
- [ ] Error states included

### Performance Guidelines

#### CSS Optimization
```css
/* Use CSS containment */
.card {
  contain: layout style;
}

/* Use will-change sparingly */
.modal {
  will-change: transform, opacity;
}

/* Prefer transform over position */
.animate-up {
  transform: translateY(-20px); /* Good */
  /* top: -20px; */ /* Avoid */
}
```

#### Asset Loading
```css
/* Preload critical fonts */
<link rel="preload" href="PlusJakartaSans-Bold.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="Inter-Regular.woff2" as="font" type="font/woff2" crossorigin>

/* Use font-display */
@font-face {
  font-family: 'Plus Jakarta Sans';
  font-display: swap;
  src: url('PlusJakartaSans-Bold.woff2') format('woff2');
}
```

### Testing Checklist

#### Visual Testing
- [ ] All color combinations pass WCAG AA
- [ ] Components look correct at all breakpoints
- [ ] Dark mode displays correctly
- [ ] Print styles work (if applicable)

#### Interaction Testing
- [ ] All interactive elements keyboard accessible
- [ ] Focus order is logical
- [ ] Screen reader announcements are clear
- [ ] Touch targets are adequate on mobile

#### Performance Testing
- [ ] CSS file < 50KB gzipped
- [ ] No layout shifts on load
- [ ] Animations run at 60fps
- [ ] Reduced motion preference respected

---

## Version History

- **v1.0** (Current) - Initial design system documentation
- Last updated: Current date
- Design tokens version: 1.0.0
- Component library version: 1.0.0

---

## Resources & Tools

### Design Tools
- Figma: Component library file
- Storybook: Interactive component documentation
- Chromatic: Visual regression testing

### Development Tools
- PostCSS: For CSS processing
- PurgeCSS: For removing unused styles
- Stylelint: For CSS linting

### Accessibility Tools
- axe DevTools: Accessibility testing
- WAVE: Web accessibility evaluation
- Stark: Color contrast checking

### Performance Tools
- Lighthouse: Performance auditing
- CSS Stats: CSS analysis
- Bundle Analyzer: Bundle size optimization

---

## Contact & Support

For questions about this design system:
- Design System Team: design-system@mindspace.app
- GitHub: github.com/mindspace/design-system
- Documentation: docs.mindspace.app/design-system

---

*This design system is optimized for mental health and wellness applications. All components prioritize accessibility, calmness, and user well-being.*
