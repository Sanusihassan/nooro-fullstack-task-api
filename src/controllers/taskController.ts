// src/controllers/taskController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Validation schema
const TaskSchema = z.object({
  title: z.string().min(1).max(255),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  completed: z.boolean().optional()
});

export const taskController = {
  // Get all tasks
  getAllTasks: async (req: Request, res: Response) => {
    try {
      const tasks = await prisma.task.findMany({
        orderBy: { createdAt: 'desc' }
      });
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  },

  // Create a task
  createTask: async (req: Request, res: Response) => {
    try {
      const validatedData = TaskSchema.parse(req.body);
      const task = await prisma.task.create({
        data: validatedData
      });
      res.status(201).json(task);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: 'Failed to create task' });
      }
    }
  },

  // Update a task
  updateTask: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const validatedData = TaskSchema.partial().parse(req.body);
      const task = await prisma.task.update({
        where: { id: Number(id) },
        data: validatedData
      });
      res.json(task);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: 'Failed to update task' });
      }
    }
  },

  // Delete a task
  deleteTask: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await prisma.task.delete({
        where: { id: Number(id) }
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete task' });
    }
  }
};