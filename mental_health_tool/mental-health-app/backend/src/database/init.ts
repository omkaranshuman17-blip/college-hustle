import sqlite3 from 'sqlite3';
import path from 'path';

const db = new sqlite3.Database(
  path.join(__dirname, '../../mental_health.db'),
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE
);

export const initDatabase = () => {
  db.serialize(() => {
    // Users table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        email TEXT UNIQUE,
        password TEXT,
        anonymous_id TEXT UNIQUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_login DATETIME,
        streak_count INTEGER DEFAULT 0,
        total_points INTEGER DEFAULT 0,
        preferences TEXT
      )
    `);

    // Assessments table
    db.run(`
      CREATE TABLE IF NOT EXISTS assessments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        test_type TEXT NOT NULL,
        score INTEGER NOT NULL,
        severity TEXT,
        responses TEXT NOT NULL,
        recommendations TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    `);

    // Game scores table
    db.run(`
      CREATE TABLE IF NOT EXISTS game_scores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        game_type TEXT NOT NULL,
        score INTEGER NOT NULL,
        level INTEGER DEFAULT 1,
        achievements TEXT,
        played_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    `);

    // Daily tasks table
    db.run(`
      CREATE TABLE IF NOT EXISTS daily_tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        task_date DATE NOT NULL,
        tasks TEXT NOT NULL,
        completed TEXT,
        points_earned INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    `);

    // Mood logs table
    db.run(`
      CREATE TABLE IF NOT EXISTS mood_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        mood_score INTEGER NOT NULL,
        mood_type TEXT,
        activities TEXT,
        notes TEXT,
        logged_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    `);

    // Badges table
    db.run(`
      CREATE TABLE IF NOT EXISTS badges (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        icon TEXT,
        points_value INTEGER DEFAULT 0,
        criteria TEXT
      )
    `);

    // User badges junction table
    db.run(`
      CREATE TABLE IF NOT EXISTS user_badges (
        user_id INTEGER,
        badge_id INTEGER,
        earned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (user_id, badge_id),
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (badge_id) REFERENCES badges (id)
      )
    `);

    // Chat logs table for AI chatbot interactions
    db.run(`
      CREATE TABLE IF NOT EXISTS chat_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        session_id TEXT NOT NULL,
        message TEXT NOT NULL,
        response TEXT NOT NULL,
        is_crisis BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    `);

    // Insert default badges
    const defaultBadges = [
      { name: 'First Steps', description: 'Complete your first assessment', icon: '🎯', points: 10 },
      { name: 'Game Master', description: 'Play all 4 games', icon: '🎮', points: 50 },
      { name: 'Week Warrior', description: '7-day streak', icon: '🔥', points: 100 },
      { name: 'Self-Care Champion', description: 'Complete 10 daily tasks', icon: '⭐', points: 75 },
      { name: 'Mindful Explorer', description: 'Try all assessment types', icon: '🧠', points: 150 }
    ];

    const insertBadge = db.prepare(`
      INSERT OR IGNORE INTO badges (name, description, icon, points_value)
      VALUES (?, ?, ?, ?)
    `);

    defaultBadges.forEach(badge => {
      insertBadge.run(badge.name, badge.description, badge.icon, badge.points);
    });

    insertBadge.finalize();

    console.log('✅ Database initialized successfully');
  });
};

export { db };
