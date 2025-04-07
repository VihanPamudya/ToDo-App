import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskList from '../TaskList';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { fetchTasks } from '../../store/actions';

jest.mock('../TaskItem', () => ({ task }: { task: any }) => (
    <div data-testid="task-item">{task.title}</div>
));

jest.mock('../../store/actions', () => ({
    fetchTasks: jest.fn(() => ({ type: 'FETCH_TASKS' })),
}));

const mockStore = configureStore([]);

describe('TaskList Component', () => {
    let store: any;

    beforeEach(() => {
        store = mockStore({
            tasks: {
                tasks: [],
                status: 'idle',
                error: null,
            },
        });

        jest.clearAllMocks();
    });

    it('dispatches fetchTasks when status is idle', () => {
        render(
            <Provider store={store}>
                <TaskList />
            </Provider>
        );

        expect(fetchTasks).toHaveBeenCalled();

        const actions = store.getActions();
        expect(actions).toContainEqual({ type: 'FETCH_TASKS' });
    });

    it('shows loading spinner when status is loading', () => {
        store = mockStore({
            tasks: {
                tasks: [],
                status: 'loading',
                error: null,
            },
        });

        render(
            <Provider store={store}>
                <TaskList />
            </Provider>
        );

        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('displays error message on fetch failure', () => {
        store = mockStore({
            tasks: {
                tasks: [],
                status: 'failed',
                error: 'Something went wrong!',
            },
        });

        render(
            <Provider store={store}>
                <TaskList />
            </Provider>
        );

        expect(screen.getByText(/error: something went wrong!/i)).toBeInTheDocument();
    });

    it('shows "No tasks" message when list is empty', () => {
        store = mockStore({
            tasks: {
                tasks: [],
                status: 'succeeded',
                error: null,
            },
        });

        render(
            <Provider store={store}>
                <TaskList />
            </Provider>
        );

        expect(screen.getByText(/no tasks available/i)).toBeInTheDocument();
    });

    it('renders list of tasks', () => {
        const taskData = [
            { id: 1, title: 'Task One' },
            { id: 2, title: 'Task Two' },
        ];

        store = mockStore({
            tasks: {
                tasks: taskData,
                status: 'succeeded',
                error: null,
            },
        });

        render(
            <Provider store={store}>
                <TaskList />
            </Provider>
        );

        const items = screen.getAllByTestId('task-item');
        expect(items).toHaveLength(2);
        expect(items[0]).toHaveTextContent('Task One');
        expect(items[1]).toHaveTextContent('Task Two');
    });
});
