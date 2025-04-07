import { taskService } from '../../services/task.service';
import { TaskDTO } from '../../types/task.types';
import { describe, it, expect, jest, afterEach } from '@jest/globals';

jest.mock('@prisma/client', () => {
    const mockPrismaClient = {
        task: {
            findMany: jest.fn(),
            create: jest.fn(),
            update: jest.fn()
        }
    };

    return {
        PrismaClient: jest.fn(() => mockPrismaClient)
    };
});

const mockModule = jest.requireMock('@prisma/client') as any;
const prismaClientMock = mockModule.PrismaClient();

describe('taskService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllTasks', () => {
        it('should return all incomplete tasks ordered by createdAt desc', async () => {
            const mockTasks = [
                { id: 1, title: 'Test', description: 'desc', completed: false, createdAt: new Date() }
            ];

            prismaClientMock.task.findMany.mockResolvedValue(mockTasks);

            const result = await taskService.getAllTasks();
            expect(result).toEqual(mockTasks);
            expect(prismaClientMock.task.findMany).toHaveBeenCalledWith({
                where: { completed: false },
                orderBy: { createdAt: 'desc' },
                take: 5
            });
        });
    });

    describe('createTask', () => {
        it('should create and return a new task with description as empty string if not provided', async () => {
            const taskInput = {
                title: 'New Task',
                description: undefined,
                completed: false
            };

            const mockCreatedTask = {
                id: 1,
                title: 'New Task',
                description: '',
                completed: false,
                createdAt: new Date()
            };

            prismaClientMock.task.create.mockResolvedValue(mockCreatedTask);

            const result = await taskService.createTask(taskInput);
            expect(result).toEqual(mockCreatedTask);
            expect(prismaClientMock.task.create).toHaveBeenCalledWith({
                data: {
                    title: taskInput.title,
                    description: '',
                    completed: false
                }
            });
        });
    });

    describe('markAsCompletedTasks', () => {
        it('should mark the task as completed', async () => {
            const mockTask = {
                id: 1,
                title: 'Task',
                description: '',
                completed: true,
                createdAt: new Date()
            };

            prismaClientMock.task.update.mockResolvedValue(mockTask);

            const result = await taskService.markAsCompletedTasks(1);
            expect(result).toEqual(mockTask);
            expect(prismaClientMock.task.update).toHaveBeenCalledWith({
                where: { id: 1 },
                data: { completed: true }
            });
        });
    });
});