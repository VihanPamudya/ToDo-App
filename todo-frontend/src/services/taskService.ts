import axios from 'axios';
import { Task } from '../types/Task';

const API_URL = 'http://localhost:3001/api/tasks';

export const taskService = {
    async getTasks(): Promise<Task[]> {
        const response = await axios.get(API_URL);
        return response.data;
    },

    async createTask(task: Task): Promise<Task> {
        const response = await axios.post(`${API_URL}/create`, task);
        return response.data;
    },

    async completeTask(id: number): Promise<Task> {
        const response = await axios.patch(`${API_URL}/${id}/complete`);
        return response.data;
    }
};