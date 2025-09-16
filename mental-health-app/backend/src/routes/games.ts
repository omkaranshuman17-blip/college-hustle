import express, { Request, Response } from 'express';
import { db } from '../database/init';

const router = express.Router();

// Save game score
router.post('/score', (req: Request, res: Response) => {
  const { userId, gameType, score, level, achievements } = req.body;
  
  db.run(
    `INSERT INTO game_scores (user_id, game_type, score, level, achievements) 
     VALUES (?, ?, ?, ?, ?)`,
    [userId, gameType, score, level || 1, JSON.stringify(achievements || [])],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to save score' });
      }
      
      // Update user points
      db.run(
        `UPDATE users SET total_points = total_points + ? WHERE id = ?`,
        [Math.floor(score / 10), userId]
      );
      
      res.json({
        id: this.lastID,
        message: 'Score saved successfully',
        pointsEarned: Math.floor(score / 10)
      });
    }
  );
});

// Get leaderboard
router.get('/leaderboard/:gameType', (req: Request, res: Response) => {
  const { gameType } = req.params;
  
  db.all(
    `SELECT u.username, gs.score, gs.played_at 
     FROM game_scores gs 
     JOIN users u ON gs.user_id = u.id 
     WHERE gs.game_type = ? 
     ORDER BY gs.score DESC 
     LIMIT 10`,
    [gameType],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch leaderboard' });
      }
      
      res.json(rows);
    }
  );
});

// Get user's game history
router.get('/history/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;
  
  db.all(
    `SELECT * FROM game_scores WHERE user_id = ? ORDER BY played_at DESC LIMIT 20`,
    [userId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch game history' });
      }
      
      res.json(rows);
    }
  );
});

export default router;
