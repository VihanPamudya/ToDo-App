import { configureStore } from '@reduxjs/toolkit';
import { fetchTasks, addTask, completeTask } from '../actions';
import { taskService } from '../../services/taskService';
import { Task } from '../../types/Task';

jest.mock('../../services/taskService');
const mockedTaskService = taskService as jest.Mocked<typeof taskService>;

describe('Task Actions', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('fetchTasks', () => {
        it('creates FETCH_TASKS_FULFILLED when fetching tasks has been done', async () => {
            const tasks = [
                { id: 1, title: 'Task 1', completed: false },
                { id: 2, title: 'Task 2', completed: true }
            ];

            mockedTaskService.getTasks.mockResolvedValueOnce(tasks);

            const store = configureStore({
                reducer: {
                    tasks: (state = { tasks: [], status: 'idle', error: null }) => state
                }
            });

            const dispatchResult = await fetchTasks()(
                store.dispatch,
                store.getState,
                undefined
            );

            expect(dispatchResult.type).toBe('tasks/fetchTasks/fulfilled');
            expect(dispatchResult.payload).toEqual(tasks);
            expect(mockedTaskService.getTasks).toHaveBeenCalledTimes(1);
        });

        it('creates FETCH_TASKS_REJECTED when fetching tasks fails', async () => {
            const error = new Error('Failed to fetch tasks');
            mockedTaskService.getTasks.mockRejectedValueOnce(error);

            const store = configureStore({
                reducer: {
                    tasks: (state = { tasks: [], status: 'idle', error: null }) => state
                }
            });

            try {
                await fetchTasks()(
                    store.dispatch,
                    store.getState,
                    undefined
                );
            } catch (err: any) {
                expect(err.name).toBe('Error');
                expect(mockedTaskService.getTasks).toHaveBeenCalledTimes(1);
            }
        });
    });

    describe('addTask', () => {
        it('creates ADD_TASK_FULFILLED when adding a task succeeds', async () => {
            const newTask: Task = { id: 3, title: 'New Task', completed: false };

            mockedTaskService.createTask.mockResolvedValueOnce(newTask);

            const store = configureStore({
                reducer: {
                    tasks: (state = { tasks: [], status: 'succeeded', error: null }) => state
                }
            });

            const dispatchResult = await addTask(newTask)(
                store.dispatch,
                store.getState,
                undefined
            );

            expect(dispatchResult.type).toBe('tasks/addTask/fulfilled');
            expect(dispatchResult.payload).toEqual(newTask);
            expect(mockedTaskService.createTask).toHaveBeenCalledWith(newTask);
        });
    });

    describe('completeTask', () => {
        it('creates COMPLETE_TASK_FULFILLED when completing a task succeeds', async () => {
            const completedTask: Task = { id: 1, title: 'Task 1', completed: true };

            mockedTaskService.completeTask.mockResolvedValueOnce(completedTask);

            const store = configureStore({
                reducer: {
                    tasks: (state = {
                        tasks: [{ id: 1, title: 'Task 1', completed: false }],
                        status: 'succeeded',
                        error: null
                    }) => state
                }
            });

            const dispatchResult = await completeTask(1)(
                store.dispatch,
                store.getState,
                undefined
            );

            expect(dispatchResult.type).toBe('tasks/completeTask/fulfilled');
            expect(dispatchResult.payload).toEqual(completedTask);
            expect(mockedTaskService.completeTask).toHaveBeenCalledWith(1);
        });
    });
});