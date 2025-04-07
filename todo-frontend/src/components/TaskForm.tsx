import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/actions';
import { AppDispatch } from '../store';

const TaskForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');

    const MAX_TITLE_LENGTH = 50;
    const MAX_DESCRIPTION_LENGTH = 150;

    useEffect(() => {
        if (title.length > MAX_TITLE_LENGTH) {
            setTitleError(`Title cannot exceed ${MAX_TITLE_LENGTH} characters.`);
        } else {
            setTitleError('');
        }

        if (description.length > MAX_DESCRIPTION_LENGTH) {
            setDescriptionError(`Description cannot exceed ${MAX_DESCRIPTION_LENGTH} characters.`);
        } else {
            setDescriptionError('');
        }
    }, [title, description]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) return;
        if (title.length > MAX_TITLE_LENGTH) return;
        if (description.length > MAX_DESCRIPTION_LENGTH) return;

        dispatch(addTask({ title, description }));
        setTitle('');
        setDescription('');
    }

    const isDisabled = title.trim().length === 0 || title.length > MAX_TITLE_LENGTH || description.length > MAX_DESCRIPTION_LENGTH;


    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add a Task</h2>

            <form onSubmit={handleSubmit} data-testid="task-form">
                <div className="mb-4">
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter task title"
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors text-gray-600
                            ${titleError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}`}
                        required
                    />
                    {titleError && (
                        <p className="mt-1 text-sm text-red-600 font-medium">
                            {titleError}
                        </p>
                    )}
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter task description"
                        rows={4}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors text-gray-600
                            ${descriptionError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}`}
                    />
                    {descriptionError && (
                        <p className="mt-1 text-sm text-red-600 font-medium">
                            {descriptionError}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isDisabled}
                    className={`font-medium py-2 px-6 rounded-md transition-colors duration-300 flex items-center justify-center
                        ${title.length > MAX_TITLE_LENGTH || !title.trim() || description.length > MAX_DESCRIPTION_LENGTH
                            ? 'bg-gray-400 cursor-not-allowed text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'}`}
                >
                    <span className="mr-2">Add Task</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                </button>
            </form>
        </div>
    );
}

export default TaskForm;