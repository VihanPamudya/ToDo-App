import { Request, Response } from 'express';
import { taskController } from '../../controllers/task.controller';
import { taskService } from '../../services/task.service';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';

jest.mock('../../services/task.service');

const mockedTaskService = taskService as jest.Mocked<typeof taskService>;

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

describe('TaskController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockResponse = {
      status: jest.fn().mockReturnThis() as unknown as Response['status'],
      json: jest.fn() as unknown as Response['json']
    };

    mockRequest = {};
    mockNext = jest.fn();
  });

  describe('createTask', () => {
    it('should create a task and return 201 status', async () => {
      const taskData = { title: 'Test Task', description: 'Test Description' };
      mockRequest.body = taskData;

      const createdTask: Task = {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        completed: false,
        createdAt: new Date()
      };

      mockedTaskService.createTask.mockResolvedValue(createdTask);

      await taskController.createTask(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockedTaskService.createTask).toHaveBeenCalledWith(taskData);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(createdTask);
    });

    it('should return 400 if title is missing', async () => {
      mockRequest.body = { description: 'Test Description' };

      await taskController.createTask(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Title is required'
      });
      expect(mockedTaskService.createTask).not.toHaveBeenCalled();
    });

    it('should call next with error if service throws', async () => {
      const taskData = { title: 'Test Task', description: 'Test Description' };
      const error = new Error('Something went wrong');
      mockRequest.body = taskData;

      mockedTaskService.createTask.mockRejectedValue(error);

      await taskController.createTask(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('getTasks', () => {
    it('should return all tasks', async () => {
      const tasks: Task[] = [
        { id: 1, title: 'Task 1', description: 'Description 1', completed: false, createdAt: new Date() },
        { id: 2, title: 'Task 2', description: 'Description 2', completed: false, createdAt: new Date() }
      ];

      mockedTaskService.getAllTasks.mockResolvedValue(tasks);

      await taskController.getTasks(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockedTaskService.getAllTasks).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(tasks);
    });

    it('should call next with error if service throws', async () => {
      const error = new Error('Database error');
      mockedTaskService.getAllTasks.mockRejectedValue(error);

      await taskController.getTasks(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('completeTask', () => {
    it('should mark a task as completed', async () => {
      const taskId = '1';
      mockRequest.params = { id: taskId };

      const updatedTask: Task = {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        completed: true,
        createdAt: new Date()
      };

      mockedTaskService.markAsCompletedTasks.mockResolvedValue(updatedTask);

      await taskController.completeTask(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockedTaskService.markAsCompletedTasks).toHaveBeenCalledWith(Number(taskId));
      expect(mockResponse.json).toHaveBeenCalledWith(updatedTask);
    });

    it('should return 400 if task ID is invalid', async () => {
      mockRequest.params = { id: 'invalid-id' };

      await taskController.completeTask(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Invalid task ID'
      });
    });
  });
});
