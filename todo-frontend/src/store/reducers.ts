import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types/Task';
import { fetchTasks, addTask, completeTask } from './actions';

interface TaskState {
    tasks: Task[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: TaskState = {
    tasks: [],
    status: 'idle',
    error: null
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
                state.status = 'succeeded';
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
                state.tasks.unshift(action.payload);
                if (state.tasks.length > 5) {
                    state.tasks.pop();
                }
            })
            .addCase(completeTask.fulfilled, (state, action: PayloadAction<Task>) => {
                state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
            });
    }
});

export default taskSlice.reducer;