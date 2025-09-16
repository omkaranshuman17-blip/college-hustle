import express, { Request, Response } from 'express';
import { db } from '../database/init';

const router = express.Router();

const dailyTasks = [
  { id: 1, title: 'Meditate for 5 minutes', category: 'mindfulness', points: 10 },
  { id: 2, title: 'Write 3 things you\'re grateful for', category: 'gratitude', points: 15 },
  { id: 3, title: 'Take a 10-minute walk', category: 'physical', points: 10 },
  { id: 4, title: 'Practice deep breathing', category: 'mindfulness', points: 10 },
  { id: 5, title: 'Connect with a friend', category: 'social', points: 20 },
  { id: 6, title: 'Listen to calming music', category: 'relaxation', points: 5 },
  { id: 7, title: 'Journal your thoughts', category: 'reflection', points: 15 },
  { id: 8, title: 'Do a random act of kindness', category: 'social', points: 25 },
  { id: 9, title: 'Stretch for 5 minutes', category: 'physical', points: 10 },
  { id: 10, title: 'Read something inspiring', category: 'growth', points: 15 }
];

// Get daily tasks for user
router.get('/daily/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;
  const today = new Date().toISOString().split('T')[0];
  
  // Check if tasks already exist for today
  db.get(
    `SELECT * FROM daily_tasks WHERE user_id = ? AND task_date = ?`,
    [userId, today],
    (err, existingTasks: any) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch tasks' });
      }
      
      if (existingTasks) {
        res.json(JSON.parse(existingTasks.tasks));
      } else {
        // Generate 3 random tasks
        const shuffled = [...dailyTasks].sort(() => 0.5 - Math.random());
        const selectedTasks = shuffled.slice(0, 3);
        
        db.run(
          `INSERT INTO daily_tasks (user_id, task_date, tasks, completed) 
           VALUES (?, ?, ?, ?)`,
          [userId, today, JSON.stringify(selectedTasks), '[]'],
          function(err) {
            if (err) {
              return res.status(500).json({ error: 'Failed to create tasks' });
            }
            
            res.json(selectedTasks);
          }
        );
      }
    }
  );
});

// Complete a task
router.post('/complete', (req: Request, res: Response) => {
  const { userId, taskId } = req.body;
  const today = new Date().toISOString().split('T')[0];
  
  db.get(
    `SELECT * FROM daily_tasks WHERE user_id = ? AND task_date = ?`,
    [userId, today],
    (err, row: any) => {
      if (err || !row) {
        return res.status(500).json({ error: 'Failed to update task' });
      }
      
      const tasks = JSON.parse(row.tasks);
      const completed = JSON.parse(row.completed || '[]');
      const task = tasks.find((t: any) => t.id === taskId);
      
      if (!task || completed.includes(taskId)) {
        return res.status(400).json({ error: 'Invalid task or already completed' });
      }
      
      completed.push(taskId);
      const pointsEarned = row.points_earned + task.points;
      
      db.run(
        `UPDATE daily_tasks SET completed = ?, points_earned = ? 
         WHERE user_id = ? AND task_date = ?`,
        [JSON.stringify(completed), pointsEarned, userId, today],
        (err) => {
          if (err) {
            return res.status(500).json({ error: 'Failed to complete task' });
          }
          
          // Update user points and check streak
          db.run(
            `UPDATE users SET total_points = total_points + ? WHERE id = ?`,
            [task.points, userId]
          );
          
          res.json({
            message: 'Task completed!',
            pointsEarned: task.points,
            allCompleted: completed.length === tasks.length
          });
        }
      );
    }
  );
});

export default router;
