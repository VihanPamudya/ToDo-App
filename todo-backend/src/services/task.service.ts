import prisma from '../lib/prisma';
import { TaskDTO } from '../types/task.types';

export const taskService = {
    async getAllTasks(limit = 5): Promise<TaskDTO[]> {
        return prisma.task.findMany({
            where: { completed: false },
            orderBy: { createdAt: 'desc' },
            take: limit
        });
    },

    async createTask(task: TaskDTO): Promise<TaskDTO> {
        return prisma.task.create({
            data: {
                title: task.title,
                description: task.description || '',
                completed: false
            }
        });
    },

    async markAsCompletedTasks(id: number): Promise<TaskDTO> {
        return prisma.task.update({
            where: { id },
            data: { completed: true }
        });
    }
};