import { store } from '../../store';

describe('Redux Store', () => {
    it('should have the correct initial state', () => {
        const state = store.getState();

        expect(state).toHaveProperty('tasks');
        expect(state.tasks).toEqual({
            tasks: [],
            status: 'idle',
            error: null
        });
    });

    it('should have the taskReducer configured correctly', () => {
        const state = store.getState();

        expect(state).toHaveProperty('tasks');

        expect(state.tasks).toHaveProperty('tasks');
        expect(state.tasks).toHaveProperty('status');
        expect(state.tasks).toHaveProperty('error');
    });
});