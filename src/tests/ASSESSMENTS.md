# Mental Health Assessments Implementation Guide

## Overview
This document provides detailed specifications for implementing validated mental health assessments in the Bubble.io application.

---

## PHQ-9 (Patient Health Questionnaire-9)
**Purpose**: Depression screening tool  
**Questions**: 9  
**Score Range**: 0-27  
**Time to Complete**: 2-3 minutes

### Questions and Scoring
Over the last 2 weeks, how often have you been bothered by:

| # | Question | Not at all (0) | Several days (1) | More than half the days (2) | Nearly every day (3) |
|---|----------|---------------|------------------|----------------------------|-------------------|
| 1 | Little interest or pleasure in doing things | 0 | 1 | 2 | 3 |
| 2 | Feeling down, depressed, or hopeless | 0 | 1 | 2 | 3 |
| 3 | Trouble falling or staying asleep, or sleeping too much | 0 | 1 | 2 | 3 |
| 4 | Feeling tired or having little energy | 0 | 1 | 2 | 3 |
| 5 | Poor appetite or overeating | 0 | 1 | 2 | 3 |
| 6 | Feeling bad about yourself — or that you are a failure or have let yourself or your family down | 0 | 1 | 2 | 3 |
| 7 | Trouble concentrating on things, such as reading the newspaper or watching television | 0 | 1 | 2 | 3 |
| 8 | Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual | 0 | 1 | 2 | 3 |
| 9 | Thoughts that you would be better off dead or of hurting yourself in some way | 0 | 1 | 2 | 3 |

### Severity Scoring
- **0-4**: Minimal depression
- **5-9**: Mild depression
- **10-14**: Moderate depression
- **15-19**: Moderately severe depression
- **20-27**: Severe depression

### Implementation in Bubble
```javascript
// Calculate PHQ-9 Score
function calculatePHQ9(answers) {
    let totalScore = 0;
    for (let i = 0; i < 9; i++) {
        totalScore += parseInt(answers[i]);
    }
    
    let severity = "";
    let recommendation = "";
    
    if (totalScore <= 4) {
        severity = "Minimal";
        recommendation = "Continue self-care practices";
    } else if (totalScore <= 9) {
        severity = "Mild";
        recommendation = "Consider watchful waiting; repeat PHQ-9 at follow-up";
    } else if (totalScore <= 14) {
        severity = "Moderate";
        recommendation = "Consider counseling or therapy";
    } else if (totalScore <= 19) {
        severity = "Moderately Severe";
        recommendation = "Active treatment with therapy and/or medication recommended";
    } else {
        severity = "Severe";
        recommendation = "Immediate initiation of therapy and medication recommended";
    }
    
    return {
        score: totalScore,
        severity: severity,
        recommendation: recommendation
    };
}
```

### Critical Item Alert
If Question 9 is answered with anything other than "Not at all":
- Display immediate crisis resources
- Provide suicide prevention hotline: 988 (US)
- Encourage immediate professional help

---

## GAD-7 (Generalized Anxiety Disorder-7)
**Purpose**: Anxiety screening tool  
**Questions**: 7  
**Score Range**: 0-21  
**Time to Complete**: 2 minutes

### Questions and Scoring
Over the last 2 weeks, how often have you been bothered by:

| # | Question | Not at all (0) | Several days (1) | More than half the days (2) | Nearly every day (3) |
|---|----------|---------------|------------------|----------------------------|-------------------|
| 1 | Feeling nervous, anxious, or on edge | 0 | 1 | 2 | 3 |
| 2 | Not being able to stop or control worrying | 0 | 1 | 2 | 3 |
| 3 | Worrying too much about different things | 0 | 1 | 2 | 3 |
| 4 | Trouble relaxing | 0 | 1 | 2 | 3 |
| 5 | Being so restless that it is hard to sit still | 0 | 1 | 2 | 3 |
| 6 | Becoming easily annoyed or irritable | 0 | 1 | 2 | 3 |
| 7 | Feeling afraid, as if something awful might happen | 0 | 1 | 2 | 3 |

### Severity Scoring
- **0-4**: Minimal anxiety
- **5-9**: Mild anxiety
- **10-14**: Moderate anxiety
- **15-21**: Severe anxiety

### Implementation in Bubble
```javascript
// Calculate GAD-7 Score
function calculateGAD7(answers) {
    let totalScore = 0;
    for (let i = 0; i < 7; i++) {
        totalScore += parseInt(answers[i]);
    }
    
    let severity = "";
    let recommendation = "";
    
    if (totalScore <= 4) {
        severity = "Minimal";
        recommendation = "Continue monitoring; practice relaxation techniques";
    } else if (totalScore <= 9) {
        severity = "Mild";
        recommendation = "Consider self-help resources and stress management";
    } else if (totalScore <= 14) {
        severity = "Moderate";
        recommendation = "Probable anxiety disorder; consider professional evaluation";
    } else {
        severity = "Severe";
        recommendation = "Probable anxiety disorder; active treatment recommended";
    }
    
    return {
        score: totalScore,
        severity: severity,
        recommendation: recommendation
    };
}
```

---

## Big Five Personality Test (Short Version)
**Purpose**: Personality assessment  
**Questions**: 20 (4 per trait)  
**Traits**: Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism  
**Time to Complete**: 5 minutes

### Question Format
Rate each statement from 1 (Strongly Disagree) to 5 (Strongly Agree):

#### Openness to Experience
1. I have a vivid imagination
2. I am interested in abstract ideas
3. I have difficulty understanding abstract ideas (R)
4. I do not have a good imagination (R)

#### Conscientiousness
5. I am always prepared
6. I pay attention to details
7. I leave my belongings around (R)
8. I make a mess of things (R)

#### Extraversion
9. I am the life of the party
10. I feel comfortable around people
11. I keep in the background (R)
12. I don't like to draw attention to myself (R)

#### Agreeableness
13. I feel others' emotions
14. I am interested in people
15. I am not interested in other people's problems (R)
16. I feel little concern for others (R)

#### Neuroticism
17. I get stressed out easily
18. I worry about things
19. I am relaxed most of the time (R)
20. I seldom feel blue (R)

*(R) = Reverse scored item

### Scoring
```javascript
function calculateBigFive(answers) {
    // Reverse score marked items
    const reverseItems = [3, 4, 7, 8, 11, 12, 15, 16, 19, 20];
    let scoredAnswers = [...answers];
    
    reverseItems.forEach(item => {
        scoredAnswers[item - 1] = 6 - scoredAnswers[item - 1];
    });
    
    // Calculate trait scores
    const traits = {
        openness: (scoredAnswers[0] + scoredAnswers[1] + scoredAnswers[2] + scoredAnswers[3]) / 4,
        conscientiousness: (scoredAnswers[4] + scoredAnswers[5] + scoredAnswers[6] + scoredAnswers[7]) / 4,
        extraversion: (scoredAnswers[8] + scoredAnswers[9] + scoredAnswers[10] + scoredAnswers[11]) / 4,
        agreeableness: (scoredAnswers[12] + scoredAnswers[13] + scoredAnswers[14] + scoredAnswers[15]) / 4,
        neuroticism: (scoredAnswers[16] + scoredAnswers[17] + scoredAnswers[18] + scoredAnswers[19]) / 4
    };
    
    // Generate personality profile
    let profile = generatePersonalityProfile(traits);
    
    return {
        traits: traits,
        profile: profile
    };
}

function generatePersonalityProfile(traits) {
    let profiles = [];
    
    if (traits.openness > 3.5) profiles.push("Creative Explorer");
    if (traits.conscientiousness > 3.5) profiles.push("Organized Achiever");
    if (traits.extraversion > 3.5) profiles.push("Social Butterfly");
    if (traits.agreeableness > 3.5) profiles.push("Compassionate Helper");
    if (traits.neuroticism < 2.5) profiles.push("Emotionally Stable");
    
    return profiles.join(", ");
}
```

---

## Burnout Assessment (Short Version)
**Purpose**: Identify burnout symptoms  
**Questions**: 10  
**Score Range**: 10-50  
**Time to Complete**: 3 minutes

### Questions
Rate from 1 (Never) to 5 (Always):

1. I feel emotionally drained from my work/studies
2. I feel used up at the end of the day
3. I feel fatigued when I get up in the morning
4. Working with people all day is really a strain for me
5. I feel burned out from my work/studies
6. I feel frustrated by my work/studies
7. I feel I'm working too hard
8. I don't really care what happens to some people
9. Working directly with people puts too much stress on me
10. I feel like I'm at the end of my rope

### Scoring
- **10-22**: Low burnout risk
- **23-33**: Moderate burnout risk
- **34-44**: High burnout risk
- **45-50**: Very high burnout risk

---

## Sleep Quality Assessment
**Purpose**: Evaluate sleep patterns and quality  
**Questions**: 8  
**Score Range**: 0-32  
**Time to Complete**: 2 minutes

### Questions
Over the past month:

1. How would you rate your sleep quality overall?
   - Very good (0), Fairly good (1), Fairly bad (2), Very bad (3)

2. How long does it usually take you to fall asleep?
   - <15 min (0), 16-30 min (1), 31-60 min (2), >60 min (3)

3. How many hours of actual sleep do you get?
   - >7 hours (0), 6-7 hours (1), 5-6 hours (2), <5 hours (3)

4. How often do you have trouble sleeping because you wake up in the middle of the night?
   - Not during past month (0), Less than once a week (1), Once or twice a week (2), Three or more times a week (3)

5. How often do you have trouble staying awake during daily activities?
   - Never (0), Rarely (1), Sometimes (2), Often (3)

6. How often do you take medicine to help you sleep?
   - Never (0), Rarely (1), Sometimes (2), Often (3)

7. How much of a problem has it been to keep up enthusiasm?
   - No problem (0), Minor problem (1), Moderate problem (2), Major problem (3)

8. How would you rate your energy levels during the day?
   - Very good (0), Good (1), Poor (2), Very poor (3)

### Scoring
- **0-8**: Good sleep quality
- **9-16**: Moderate sleep issues
- **17-24**: Poor sleep quality
- **25-32**: Severe sleep disturbance

---

## Implementation Features

### Visual Design
```
┌─────────────────────────────────┐
│      MENTAL HEALTH CHECK-IN     │
├─────────────────────────────────┤
│  Progress: ████████░░ 80%       │
├─────────────────────────────────┤
│  Question 8 of 10               │
│                                 │
│  How often have you felt...     │
│  ┌─────────────────────────┐    │
│  │ ○ Not at all           │    │
│  │ ○ Several days         │    │
│  │ ● More than half       │    │
│  │ ○ Nearly every day     │    │
│  └─────────────────────────┘    │
│                                 │
│  [Previous]          [Next →]   │
└─────────────────────────────────┘
```

### User Experience Enhancements

#### Gamification Elements
- Progress bar with encouraging messages
- Animated transitions between questions
- Completion celebration (confetti, badge)
- Points for completing assessments
- Streak tracking for regular check-ins

#### Emotional Support
- Calming color scheme during assessments
- Encouraging messages between sections
- Option to pause and resume later
- Skip sensitive questions with explanation

### Data Visualization

#### Results Display
```
Your Results:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Depression Score: 8 (Mild)
   [████████░░░░░░░░░░░░]
   
Recommendation: 
Consider self-care activities and 
monitor your mood. Our games can help!

Helpful Resources:
• Try our Mood Matcher game
• Practice daily gratitude
• Connect with support groups
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

#### Trend Tracking
- Line graphs showing score changes over time
- Color-coded mood calendar
- Weekly/monthly summaries
- Progress towards wellness goals

### Privacy & Ethics

#### Data Handling
- All results stored with anonymous ID only
- No data shared with third parties
- User can delete all data at any time
- Export option for personal records

#### Disclaimers (Required)
```
⚠️ Important Notice:
This assessment is for informational purposes only 
and is not a substitute for professional diagnosis 
or treatment. If you're experiencing severe symptoms 
or having thoughts of self-harm, please contact a 
mental health professional immediately.

Crisis Resources:
• National Suicide Prevention Lifeline: 988
• Crisis Text Line: Text HOME to 741741
• Emergency: 911
```

### Bubble.io Workflows

#### Assessment Flow
1. **Start Assessment**
   - Create new TestResult record
   - Initialize question counter
   - Start timer for analytics

2. **Question Navigation**
   - Save answer to temporary state
   - Update progress bar
   - Check for critical responses

3. **Calculate Results**
   - Sum scores according to algorithm
   - Determine severity level
   - Generate recommendations

4. **Display Results**
   - Show score with interpretation
   - Provide resources and next steps
   - Save to database
   - Award points/badges

5. **Follow-up Actions**
   - Schedule reminder for retake
   - Suggest relevant games/activities
   - Track engagement metrics

### Accessibility Considerations
- Screen reader compatible
- Keyboard navigation support
- High contrast mode option
- Font size adjustment
- Simple language alternatives
- Audio question reading option
