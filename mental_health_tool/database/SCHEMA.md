# Database Schema Documentation

## Overview
This document describes the database structure for the Mental Health Tool application built on Bubble.io.

## Data Types

### 1. User
Primary user data type with privacy-focused design.

| Field | Type | Required | Description | Privacy Rules |
|-------|------|----------|-------------|---------------|
| email | text | No | Optional email for account recovery | Encrypted, owner-only access |
| username | text | Yes | Display name (can be anonymous) | Public display allowed |
| password | text | Yes | Account password | Hashed, never exposed |
| anonymous_id | text | Yes | Unique anonymous identifier | System-generated UUID |
| created_date | date | Yes | Account creation timestamp | Read-only |
| last_login | date | No | Last login timestamp | Owner-only |
| streak_count | number | No | Current daily streak | Public for leaderboards |
| total_points | number | No | Gamification points | Public for leaderboards |
| preferences | object | No | User settings (theme, music) | Owner-only |

### 2. GameScore
Tracks user performance in mental health games.

| Field | Type | Required | Description | Privacy Rules |
|-------|------|----------|-------------|---------------|
| user | User | Yes | Reference to User | Owner-only |
| game_type | text | Yes | Type of game played | Public for stats |
| score | number | Yes | Game score achieved | Anonymous public |
| duration | number | No | Time spent (seconds) | Private |
| date | date | Yes | When game was played | Public |
| achievements | list | No | Unlocked achievements | Owner-only |

### 3. TestResult
Stores mental health assessment results with strict privacy.

| Field | Type | Required | Description | Privacy Rules |
|-------|------|----------|-------------|---------------|
| user | User | Yes | Anonymous user reference | Strictly private |
| test_type | text | Yes | PHQ-9, GAD-7, Big Five, etc. | Private |
| score | number | Yes | Calculated test score | Private |
| responses | list | Yes | Individual question responses | Private |
| interpretation | text | No | Score interpretation | Private |
| timestamp | date | Yes | Assessment date/time | Private |
| recommendations | list | No | Suggested actions | Private |

### 4. DailyTask
Manages daily mental health challenges.

| Field | Type | Required | Description | Privacy Rules |
|-------|------|----------|-------------|---------------|
| user | User | Yes | Task assignee | Owner-only |
| date | date | Yes | Task date | Owner-only |
| tasks | list | Yes | List of task objects | Owner-only |
| completed | list | No | Completed task IDs | Owner-only |
| points_earned | number | No | Points from completion | Public for stats |

### 5. Task (Sub-type)
Individual task structure within DailyTask.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| task_id | text | Yes | Unique task identifier |
| title | text | Yes | Task name |
| description | text | Yes | Task details |
| category | text | Yes | mindfulness, physical, social, creative |
| points | number | Yes | Point value |
| duration_minutes | number | No | Estimated time |

### 6. AudioTrack
Manages background music library.

| Field | Type | Required | Description | Privacy Rules |
|-------|------|----------|-------------|---------------|
| track_id | text | Yes | Unique identifier | Public |
| title | text | Yes | Track name | Public |
| artist | text | Yes | Artist/source | Public |
| file_url | text | Yes | Audio file location | Public |
| duration | number | Yes | Track length (seconds) | Public |
| category | text | Yes | ambient, nature, instrumental | Public |
| license | text | Yes | CC license type | Public |
| play_count | number | No | Times played | Public |

### 7. Badge
Gamification achievements system.

| Field | Type | Required | Description | Privacy Rules |
|-------|------|----------|-------------|---------------|
| badge_id | text | Yes | Unique identifier | Public |
| name | text | Yes | Badge name | Public |
| description | text | Yes | How to earn | Public |
| icon_url | text | Yes | Badge image | Public |
| points_value | number | Yes | Points awarded | Public |
| category | text | Yes | Type of achievement | Public |
| criteria | object | Yes | Earning requirements | Public |

### 8. UserBadge (Junction)
Links users to earned badges.

| Field | Type | Required | Description | Privacy Rules |
|-------|------|----------|-------------|---------------|
| user | User | Yes | Badge owner | Owner-only |
| badge | Badge | Yes | Earned badge | Public |
| earned_date | date | Yes | When earned | Public |
| progress | number | No | Progress percentage | Owner-only |

## Privacy Rules

### Global Rules
1. **Anonymous by Default**: No personally identifiable information required
2. **Owner Access**: Users can only access their own sensitive data
3. **Public Stats**: Only aggregated, anonymous statistics are public
4. **Test Results**: Mental health assessments are strictly private
5. **No Third-Party Sharing**: Data never leaves Bubble's infrastructure

### Data Access Levels

#### Public Access
- Anonymous game statistics
- Badge definitions
- Audio track library
- Aggregated app statistics

#### Owner-Only Access
- Personal test results
- Individual task progress
- Account settings
- Personal achievements

#### System-Only Access
- Password hashes
- Internal user IDs
- Audit logs
- Security tokens

## Indexes

### Performance Optimization
1. `User.anonymous_id` - Unique index
2. `User.username` - Unique index  
3. `GameScore.user + game_type + date` - Composite index
4. `TestResult.user + test_type` - Composite index
5. `DailyTask.user + date` - Composite index
6. `UserBadge.user` - Index for badge queries

## Data Retention

### Retention Policies
- **Test Results**: Kept for 1 year, then anonymized
- **Game Scores**: Kept indefinitely for statistics
- **Daily Tasks**: Active for 30 days, then archived
- **User Accounts**: Soft delete after 6 months inactive

## Backup Strategy

### Bubble.io Built-in Features
- Automatic daily backups
- Point-in-time recovery (last 7 days)
- Data export capability for users
- Regular backup testing

## GDPR Compliance

### User Rights Implementation
1. **Right to Access**: Export all user data
2. **Right to Erasure**: Complete data deletion
3. **Right to Portability**: JSON export format
4. **Right to Rectification**: Edit personal data
5. **Privacy by Design**: Minimal data collection

## Security Measures

### Data Protection
- All sensitive fields encrypted at rest
- HTTPS for all data transmission  
- No client-side storage of sensitive data
- Regular security audits
- Rate limiting on all endpoints
