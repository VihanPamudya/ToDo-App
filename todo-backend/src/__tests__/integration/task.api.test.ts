import request from 'supertest';
import prisma from '../../lib/prisma';
import app from '../../index';
import { describe, it, expect, beforeEach, beforeAll, afterAll } from '@jest/globals';

describe('Task API Integration Tests', () => {
  beforeAll(async () => {
    try {
      await prisma.$connect();
      console.log("Connected to the test database successfully!");

      console.log("Running schema migrations...");
      await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS task (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT false,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`;
      console.log("Schema migrations completed.");

    } catch (error) {
      console.error("Database setup failed: ", error);
      throw error;
    }
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.task.deleteMany({});
  });

  describe('GET /api/tasks', () => {
    it('should return all tasks', async () => {
      const tasksToCreate = [
        { title: 'Task 1', description: 'Description 1', completed: false },
        { title: 'Task 2', description: 'Description 2', completed: false },
        { title: 'Task 3', description: 'Description 3', completed: true }
      ];

      for (const task of tasksToCreate) {
        await prisma.task.create({ data: task });
      }

      const expectedCount = tasksToCreate.filter(task => !task.completed).length;
      console.log(`Expected tasks in response: ${expectedCount}`);

      const response = await request(app)
        .get('/api/tasks')
        .expect(200);

      console.log(`Tasks returned by API: ${response.body.length}`);

      expect(response.body.length).toBe(expectedCount);

      response.body.forEach((task: any) => {
        expect(task).toHaveProperty('id');
        expect(task).toHaveProperty('title');
        expect(task).toHaveProperty('description');
        expect(task).toHaveProperty('completed');
        expect(task.completed).toBe(false);
      });
    });
  });

  describe('PATCH /api/tasks/:id/complete', () => {
    it('should mark a task as completed', async () => {
      const task = await prisma.task.create({
        data: {
          title: 'Task to complete',
          description: 'This task will be marked as done',
          completed: false
        }
      });

      const taskId = task.id;
      console.log(`Created task with ID: ${taskId}`);

      const response = await request(app)
        .patch(`/api/tasks/${taskId}/complete`)
        .expect(200);

      expect(response.body.completed).toBe(true);

      const updatedTask = await prisma.task.findUnique({
        where: { id: taskId }
      });

      expect(updatedTask?.completed).toBe(true);
    });

    it('should return 400 for invalid task ID', async () => {
      await request(app)
        .patch('/api/tasks/invalid-id/complete')
        .expect(400);
    });

    it('should handle non-existent task appropriately', async () => {
      const nonExistentId = 999999;

      const task = await prisma.task.findUnique({
        where: { id: nonExistentId }
      });

      expect(task).toBeNull();

      await request(app)
        .patch(`/api/tasks/${nonExistentId}/complete`)
        .expect(response => {
          expect(response.status).toBeGreaterThanOrEqual(400);
        });
    });
  });
});