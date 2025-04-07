import { Router } from 'express';
import { taskController } from '../controllers/task.controller';

const router = Router();

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all active tasks
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get('/', taskController.getTasks as any);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created
 */
router.post('/create', taskController.createTask as any);

/**
 * @swagger
 * /api/tasks/{id}/complete:
 *   patch:
 *     summary: Mark a task as complete
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task marked as complete
 */
router.patch('/:id/complete', taskController.completeTask as any);

export default router;