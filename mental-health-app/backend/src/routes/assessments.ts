import express, { Request, Response } from 'express';
import { db } from '../database/init';

const router = express.Router();

// PHQ-9 Depression Assessment
router.post('/phq9', (req: Request, res: Response) => {
  const { userId, answers } = req.body;
  
  const score = answers.reduce((sum: number, val: number) => sum + val, 0);
  
  let severity = '';
  let recommendation = '';
  
  if (score <= 4) {
    severity = 'Minimal';
    recommendation = 'Continue self-care practices and monitor your mood';
  } else if (score <= 9) {
    severity = 'Mild';
    recommendation = 'Consider stress management techniques and regular exercise';
  } else if (score <= 14) {
    severity = 'Moderate';
    recommendation = 'Consider talking to a counselor or therapist';
  } else if (score <= 19) {
    severity = 'Moderately Severe';
    recommendation = 'Professional support recommended. Consider therapy and/or medication';
  } else {
    severity = 'Severe';
    recommendation = 'Immediate professional help strongly recommended';
  }
  
  db.run(
    `INSERT INTO assessments (user_id, test_type, score, severity, responses, recommendations) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [userId, 'PHQ-9', score, severity, JSON.stringify(answers), recommendation],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to save assessment' });
      }
      
      res.json({
        id: this.lastID,
        testType: 'PHQ-9',
        score,
        severity,
        recommendation,
        needsHelp: score >= 15
      });
    }
  );
});

// GAD-7 Anxiety Assessment
router.post('/gad7', (req: Request, res: Response) => {
  const { userId, answers } = req.body;
  
  const score = answers.reduce((sum: number, val: number) => sum + val, 0);
  
  let severity = '';
  let recommendation = '';
  
  if (score <= 4) {
    severity = 'Minimal';
    recommendation = 'Continue monitoring and practicing relaxation techniques';
  } else if (score <= 9) {
    severity = 'Mild';
    recommendation = 'Try mindfulness, meditation, and breathing exercises';
  } else if (score <= 14) {
    severity = 'Moderate';
    recommendation = 'Consider professional evaluation for anxiety management';
  } else {
    severity = 'Severe';
    recommendation = 'Professional treatment recommended for anxiety disorder';
  }
  
  db.run(
    `INSERT INTO assessments (user_id, test_type, score, severity, responses, recommendations) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [userId, 'GAD-7', score, severity, JSON.stringify(answers), recommendation],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to save assessment' });
      }
      
      res.json({
        id: this.lastID,
        testType: 'GAD-7',
        score,
        severity,
        recommendation,
        needsHelp: score >= 10
      });
    }
  );
});

// Get user's assessment history
router.get('/history/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;
  
  db.all(
    `SELECT * FROM assessments WHERE user_id = ? ORDER BY created_at DESC LIMIT 20`,
    [userId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch history' });
      }
      
      res.json(rows);
    }
  );
});

export default router;
