import axios from 'axios';
import { taskService } from '../taskService';
import { Task } from '../../types/Task';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('taskService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getTasks', () => {
    it('should fetch tasks successfully', async () => {
      const tasks: Task[] = [
        { id: 1, title: 'Task 1', completed: false },
        { id: 2, title: 'Task 2', completed: true }
      ];
      
      mockedAxios.get.mockResolvedValueOnce({ data: tasks });
      
      const result = await taskService.getTasks();
      
      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3001/api/tasks');
      expect(result).toEqual(tasks);
    });

    it('should handle errors when fetching tasks', async () => {
      const error = new Error('Network Error');
      mockedAxios.get.mockRejectedValueOnce(error);
      
      await expect(taskService.getTasks()).rejects.toThrow('Network Error');
      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3001/api/tasks');
    });
  });

  describe('createTask', () => {
    it('should create a task successfully', async () => {
      const newTask: Task = { id: 3, title: 'New Task', completed: false };
      
      mockedAxios.post.mockResolvedValueOnce({ data: newTask });
      
      const result = await taskService.createTask(newTask);
      
      expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:3001/api/tasks/create', newTask);
      expect(result).toEqual(newTask);
    });

    it('should handle errors when creating a task', async () => {
      const newTask: Task = { id: 3, title: 'New Task', completed: false };

      const error = new Error('Could not create task');
      mockedAxios.post.mockRejectedValueOnce(error);
      
      await expect(taskService.createTask(newTask)).rejects.toThrow('Could not create task');
      expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:3001/api/tasks/create', newTask);
    });
  });

  describe('completeTask', () => {
    it('should mark a task as complete successfully', async () => {
      const completedTask: Task = { id: 1, title: 'Task 1', completed: true };
      
      mockedAxios.patch.mockResolvedValueOnce({ data: completedTask });
      
      const result = await taskService.completeTask(1);
      
      expect(mockedAxios.patch).toHaveBeenCalledWith('http://localhost:3001/api/tasks/1/complete');
      expect(result).toEqual(completedTask);
    });

    it('should handle errors when completing a task', async () => {
      const error = new Error('Task not found');
      mockedAxios.patch.mockRejectedValueOnce(error);
      
      await expect(taskService.completeTask(999)).rejects.toThrow('Task not found');
      expect(mockedAxios.patch).toHaveBeenCalledWith('http://localhost:3001/api/tasks/999/complete');
    });
  });
});