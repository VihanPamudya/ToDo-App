import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskItem from '../TaskItem';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { formatDescription } from '../../utils/formatters';

const mockStore = configureStore([]);

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn().mockImplementation(action => action)
}));

describe('TaskItem Component', () => {
  const mockTask = {
    id: 1,
    title: 'Test Task',
    description: 'This is a test task description',
    completed: false,
    createdAt: new Date().toISOString()
  };

  let store: any;

  beforeEach(() => {
    store = mockStore({
      tasks: [mockTask]
    });
    jest.clearAllMocks();
  });

  it('renders task information correctly', () => {
    render(
      <Provider store={store}>
        <TaskItem task={mockTask} />
      </Provider>
    );

    expect(screen.getByText(mockTask.title)).toBeInTheDocument();
    expect(screen.getByText(mockTask.description)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /done/i })).toBeInTheDocument();
  });

  it('dispatches completeTask action when Done button is clicked', () => {
    const dispatchMock = jest.fn();
    jest.spyOn(require('react-redux'), 'useDispatch').mockReturnValue(dispatchMock);

    render(
      <Provider store={store}>
        <TaskItem task={mockTask} />
      </Provider>
    );

    const doneButton = screen.getByRole('button', { name: /done/i });
    fireEvent.click(doneButton);

    expect(dispatchMock).toHaveBeenCalled();
  });

  it('formats date and time correctly', () => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const taskWithDate = {
      ...mockTask,
      createdAt: date.toISOString()
    };

    render(
      <Provider store={store}>
        <TaskItem task={taskWithDate} />
      </Provider>
    );

    const dateTimeText = screen.getByText(`${formattedDate} ${formattedTime}`);
    expect(dateTimeText).toBeInTheDocument();
  });

  it('formats long description with line breaks', () => {
    const longDescription = 'This is a very long description that should be broken into multiple lines because it exceeds the maximum length of 75 characters that was specified in the formatDescription function.';

    const taskWithLongDesc = {
      ...mockTask,
      description: longDescription
    };

    render(
      <Provider store={store}>
        <TaskItem task={taskWithLongDesc} />
      </Provider>
    );

    const descElement = screen.getByText(/This is a very long description/);
    expect(descElement).toBeInTheDocument();
    expect(descElement.textContent).toBe(formatDescription(longDescription));
    expect(descElement).toHaveClass('whitespace-pre-wrap');
  });

  it('should return empty string for empty input', () => {
    expect(formatDescription('')).toBe('');
  });
});