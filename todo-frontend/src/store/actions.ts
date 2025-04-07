import { createAsyncThunk } from '@reduxjs/toolkit';
import { Task } from '../types/Task';
import { taskService } from '../services/taskService';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    return await taskService.getTasks();
});

export const addTask = createAsyncThunk('tasks/addTask', async (task: Task) => {
    return await taskService.createTask(task);
});

export const completeTask = createAsyncThunk('tasks/completeTask', async (id: number) => {
    return await taskService.completeTask(id);
});