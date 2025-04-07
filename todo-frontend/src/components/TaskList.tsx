import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from '../store/actions';
import { RootState, AppDispatch } from '../store';
import TaskItem from './TaskItem';

const TaskList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { tasks, status, error } = useSelector((state: RootState) => state.tasks);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchTasks());
        }
    }, [status, dispatch]);

    if (status === 'loading') {
        return (
            <div role="status" className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (status === 'failed') {
        return (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded my-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-red-700">Error: {error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-4">
            <h2 className="text-lg font-semibold mb-3">Recent Tasks</h2>
            <div className="overflow-y-auto max-h-[calc(100vh-180px)]">
                {tasks.length === 0 ? (
                    <div className="bg-gray-50 border border-gray-200 rounded-md py-4 px-3 text-center">
                        <p className="text-gray-500 text-sm">No tasks available. Add one!</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {tasks.map((task) => <TaskItem key={task.id} task={task} />)}
                    </div>
                )}
            </div>
        </div>
    );
}

export default TaskList;