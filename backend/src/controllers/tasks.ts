import { Router } from 'express';
import { ITask as Task } from '../models/Task';
import { authenticateToken, authorizeRoles } from '../middleware/auth';

const tasks: Task[] = []; // in-memory store
const router = Router();

// Get all tasks - only MANAGER & ADMIN
router.get(
  '/',
  authenticateToken,
  authorizeRoles('ADMIN', 'MANAGER'),
  (req, res) => {
    res.json(tasks);
  }
);

// Create task - any authenticated user
router.post('/', authenticateToken, (req, res) => {
  const { title, description, assignedTo, createdBy } = req.body;
  const newTask: Task = {
    id: Date.now().toString(),
    title,
    description,
    status: 'TODO',
    assignedTo,
    createdBy,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  tasks.push(newTask);
  res.json(newTask);
});

export default router;
