import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskForm from '../TaskForm';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { addTask } from '../../store/actions';

const mockStore = configureStore([]);

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => jest.fn(),
}));

jest.mock('../../store/actions', () => ({
    addTask: jest.fn((payload) => ({ type: 'ADD_TASK', payload })),
}));

describe('TaskForm Component', () => {
    let store: any;

    beforeEach(() => {
        store = mockStore({});
        jest.clearAllMocks();
    });

    const setup = () =>
        render(
            <Provider store={store}>
                <TaskForm />
            </Provider>
        );

    it('renders the form with input fields and button', () => {
        setup();
        expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
    });

    it('displays error if title exceeds character limit', () => {
        setup();
        const titleInput = screen.getByLabelText(/title/i);
        fireEvent.change(titleInput, { target: { value: 'a'.repeat(51) } });

        expect(screen.getByText(/title cannot exceed/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /add task/i })).toBeDisabled();
    });

    it('displays error if description exceeds character limit', () => {
        setup();
        const descInput = screen.getByLabelText(/description/i);
        fireEvent.change(descInput, { target: { value: 'b'.repeat(151) } });

        expect(screen.getByText(/description cannot exceed/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /add task/i })).toBeDisabled();
    });

    it('executes early return in onSubmit if title exceeds limit', () => {
        const dispatchMock = jest.fn();
        jest.spyOn(require('react-redux'), 'useDispatch').mockReturnValue(dispatchMock);

        setup();
        const titleInput = screen.getByLabelText(/title/i);
        const descriptionInput = screen.getByLabelText(/description/i);
        const form = screen.getByTestId('task-form');

        fireEvent.change(titleInput, { target: { value: 'a'.repeat(51) } });
        fireEvent.change(descriptionInput, { target: { value: 'Valid desc' } });

        fireEvent.submit(form); 

        expect(dispatchMock).not.toHaveBeenCalled(); 
    });

    it('executes early return in onSubmit if description exceeds limit', () => {
        const dispatchMock = jest.fn();
        jest.spyOn(require('react-redux'), 'useDispatch').mockReturnValue(dispatchMock);

        setup();
        const titleInput = screen.getByLabelText(/title/i);
        const descriptionInput = screen.getByLabelText(/description/i);
        const form = screen.getByTestId('task-form');

        fireEvent.change(titleInput, { target: { value: 'Valid Title' } });
        fireEvent.change(descriptionInput, { target: { value: 'b'.repeat(151) } });

        fireEvent.submit(form);

        expect(dispatchMock).not.toHaveBeenCalled();
    });

    it('should not dispatch addTask if title is empty or whitespace only', () => {
        const store = mockStore({});
        store.dispatch = jest.fn();

        render(
            <Provider store={store}>
                <TaskForm />
            </Provider>
        );

        const titleInput = screen.getByLabelText(/title/i);
        const descriptionInput = screen.getByLabelText(/description/i);
        const form = screen.getByTestId('task-form');

        fireEvent.change(titleInput, { target: { value: '   ' } });
        fireEvent.change(descriptionInput, { target: { value: 'Valid description' } });

        fireEvent.submit(form);

        expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('enables button when valid inputs are entered', () => {
        setup();
        fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Test Task' } });
        fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Test Description' } });

        expect(screen.getByRole('button', { name: /add task/i })).not.toBeDisabled();
    });

    it('dispatches addTask and clears form on valid submit', () => {
        const dispatchMock = jest.fn();
        jest.spyOn(require('react-redux'), 'useDispatch').mockReturnValue(dispatchMock);

        setup();
        const titleInput = screen.getByLabelText(/title/i);
        const descriptionInput = screen.getByLabelText(/description/i);
        const button = screen.getByRole('button', { name: /add task/i });

        fireEvent.change(titleInput, { target: { value: 'New Task' } });
        fireEvent.change(descriptionInput, { target: { value: 'New description here' } });

        fireEvent.click(button);

        expect(addTask).toHaveBeenCalledWith({ title: 'New Task', description: 'New description here' });
        expect(dispatchMock).toHaveBeenCalled();
    });
});
