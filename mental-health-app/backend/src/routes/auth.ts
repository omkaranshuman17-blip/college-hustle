import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../database/init';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Register/Login (supports both anonymous and authenticated)
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, email, password, isAnonymous } = req.body;

    if (isAnonymous) {
      const anonymousId = uuidv4();
      
      db.run(
        `INSERT INTO users (anonymous_id, username) VALUES (?, ?)`,
        [anonymousId, `Guest_${anonymousId.slice(0, 8)}`],
        function(err) {
          if (err) {
            return res.status(400).json({ error: 'Failed to create anonymous user' });
          }
          
          const token = jwt.sign(
            { userId: this.lastID, anonymous: true },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '30d' }
          );
          
          res.json({
            token,
            user: {
              id: this.lastID,
              username: `Guest_${anonymousId.slice(0, 8)}`,
              isAnonymous: true
            }
          });
        }
      );
    } else {
      // Regular registration
      const hashedPassword = await bcrypt.hash(password, 10);
      
      db.run(
        `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
        [username, email, hashedPassword],
        function(err) {
          if (err) {
            return res.status(400).json({ error: 'Username or email already exists' });
          }
          
          const token = jwt.sign(
            { userId: this.lastID, anonymous: false },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '30d' }
          );
          
          res.json({
            token,
            user: {
              id: this.lastID,
              username,
              email,
              isAnonymous: false
            }
          });
        }
      );
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    
    db.get(
      `SELECT * FROM users WHERE username = ? OR email = ?`,
      [username, username],
      async (err, user: any) => {
        if (err || !user) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        // Update last login
        db.run(`UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?`, [user.id]);
        
        const token = jwt.sign(
          { userId: user.id, anonymous: false },
          process.env.JWT_SECRET || 'secret',
          { expiresIn: '30d' }
        );
        
        res.json({
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            streakCount: user.streak_count,
            totalPoints: user.total_points
          }
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
