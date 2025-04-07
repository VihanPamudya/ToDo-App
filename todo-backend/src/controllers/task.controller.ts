import { Request, Response, NextFunction } from 'express';
import { taskService } from '../services/task.service';

export const taskController = {
    async getTasks(req: Request, res: Response, next: NextFunction) {
        try {
            const tasks = await taskService.getAllTasks();
            res.json(tasks);
        } catch (error) {
            next(error);
        }
    },

    async createTask(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, description } = req.body;
            if (!title) {
                return res.status(400).json({ error: 'Title is required' });
            }

            const task = await taskService.createTask({ title, description });
            res.status(201).json(task);
        } catch (error) {
            next(error);
        }
    },

    async completeTask(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ error: 'Invalid task ID' });
            }

            const task = await taskService.markAsCompletedTasks(id);
            res.json(task);
        } catch (error) {
            next(error);
        }
    }
};