// src/routes/taskRoutes.ts
import express from 'express';
import { taskController } from '../controllers/taskController';

const router = express.Router();

// GET /tasks - Get all tasks
router.get('/', taskController.getAllTasks);

// POST /tasks - Create a new task
router.post('/', taskController.createTask);

// PUT /tasks/:id - Update a task
router.put('/:id', taskController.updateTask);

// DELETE /tasks/:id - Delete a task
router.delete('/:id', taskController.deleteTask);

export default router;