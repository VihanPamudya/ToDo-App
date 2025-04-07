import { useDispatch } from 'react-redux';
import { completeTask } from '../store/actions';
import { Task } from '../types/Task';
import { AppDispatch } from '../store';
import { formatDescription } from '../utils/formatters';

interface TaskItemProps {
    task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleComplete = () => {
        if (task.id) {
            dispatch(completeTask(task.id));
        }
    };

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
    };

    const dateTime = task.createdAt ? formatDateTime(task.createdAt) : { date: '', time: '' };

    const formattedDescription = task.description ? formatDescription(task.description, 75) : '';

    return (
        <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden transition hover:shadow-sm mb-2">
            <div className="flex">
                <div className="w-1 bg-blue-500 self-stretch"></div>
                <div className="flex-1 p-3 relative">
                    <div className="absolute top-2 right-2 text-xs text-gray-500">
                        {task.createdAt && (
                            <span>{dateTime.date} {dateTime.time}</span>
                        )}
                    </div>

                    <h3 className="text-base font-medium text-gray-700 break-words pr-24">{task.title}</h3>

                    <p className="text-sm text-gray-600 mt-1 break-words whitespace-pre-wrap min-h-[1em]">
                        {formattedDescription || "\u00A0"}
                    </p>

                    <div className="absolute bottom-2 right-2">
                        <button
                            onClick={handleComplete}
                            className="font-medium text-xs py-[4px] px-[8px] rounded-md transition-colors duration-300 flex items-center justify-center bg-green-500 text-white cursor-pointer hover:bg-green-600"
                        >
                            <span className="mr-1">Done</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.5-8.5a1 1 0 10-1.5-1.32L9 11.17 7.5 9.67a1 1 0 00-1.5 1.32l2 2a1 1 0 001.5 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskItem;