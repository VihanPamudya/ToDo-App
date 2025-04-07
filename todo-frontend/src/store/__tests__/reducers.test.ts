import reducer from '../reducers';
import { fetchTasks, addTask, completeTask } from '../actions';
import { Task } from '../../types/Task';

describe('Task Reducer', () => {
    const initialState = {
        tasks: [],
        status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
        error: null
    };

    it('should return the initial state', () => {
        expect(reducer(undefined, { type: '' })).toEqual(initialState);
    });

    describe('fetchTasks', () => {
        it('should handle fetchTasks.pending', () => {
            const action = { type: fetchTasks.pending.type };
            const state = reducer(initialState, action);

            expect(state).toEqual({
                ...initialState,
                status: 'loading'
            });
        });

        it('should handle fetchTasks.fulfilled', () => {
            const tasks: Task[] = [
                { id: 1, title: 'Task 1', completed: false },
                { id: 2, title: 'Task 2', completed: true }
            ];

            const action = {
                type: fetchTasks.fulfilled.type,
                payload: tasks
            };

            const state = reducer(initialState, action);

            expect(state).toEqual({
                tasks,
                status: 'succeeded',
                error: null
            });
        });

        it('should handle fetchTasks.rejected', () => {
            const action = {
                type: fetchTasks.rejected.type,
                error: {}
            };

            const state = reducer(initialState, action);

            expect(state.status).toBe('failed');
            expect(state.error).toBe('Something went wrong');
        });
    });

    describe('addTask', () => {
        it('should handle addTask.fulfilled', () => {
            const existingTasks = [
                { id: 1, title: 'Task 1', completed: false },
                { id: 2, title: 'Task 2', completed: true }
            ];

            const newTask = { id: 3, title: 'New Task', completed: false };

            const action = {
                type: addTask.fulfilled.type,
                payload: newTask
            };

            const state = reducer({
                tasks: existingTasks,
                status: 'succeeded',
                error: null
            }, action);

            expect(state.tasks).toEqual([newTask, ...existingTasks]);
        });

        it('should limit tasks to 5 after adding new task', () => {
            const existingTasks = [
                { id: 1, title: 'Task 1', completed: false },
                { id: 2, title: 'Task 2', completed: true },
                { id: 3, title: 'Task 3', completed: false },
                { id: 4, title: 'Task 4', completed: true },
                { id: 5, title: 'Task 5', completed: false }
            ];

            const newTask = { id: 6, title: 'New Task', completed: false };

            const action = {
                type: addTask.fulfilled.type,
                payload: newTask
            };

            const state = reducer({
                tasks: existingTasks,
                status: 'succeeded',
                error: null
            }, action);

            expect(state.tasks.length).toBe(5);
            expect(state.tasks[0]).toEqual(newTask);
            expect(state.tasks).not.toContainEqual(existingTasks[4]);
        });
    });

    describe('completeTask', () => {
        it('should handle completeTask.fulfilled', () => {
            const existingTasks = [
                { id: 1, title: 'Task 1', completed: false },
                { id: 2, title: 'Task 2', completed: true }
            ];

            const completedTask = { id: 1, title: 'Task 1', completed: true };

            const action = {
                type: completeTask.fulfilled.type,
                payload: completedTask
            };

            const state = reducer({
                tasks: existingTasks,
                status: 'succeeded',
                error: null
            }, action);

            expect(state.tasks).toEqual([existingTasks[1]]);
            expect(state.tasks).not.toContainEqual({ id: 1, title: 'Task 1', completed: false });
        });
    });
});