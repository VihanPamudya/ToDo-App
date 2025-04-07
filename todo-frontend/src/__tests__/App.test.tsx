import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from '../App';

describe('App Component', () => {
    it('renders the App component with all subcomponents', () => {
        const mockStore = configureStore([]);
        const store = mockStore({
            tasks: {
                tasks: [{ id: '1', title: 'Test Task', completed: false }],
                status: 'succeeded',
                error: null
            }
        });

        render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        const mainElement = screen.getByRole('main');
        expect(mainElement).toBeInTheDocument();

        const header = screen.getByRole('banner');
        expect(header).toBeInTheDocument();

        const taskForm = screen.getByTestId('task-form');
        expect(taskForm).toBeInTheDocument();

        const taskItem = screen.getByText('Test Task');
        expect(taskItem).toBeInTheDocument();
    });
});
