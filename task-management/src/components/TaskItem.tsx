import React from 'react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <p className="text-gray-600">{task.description}</p>
        <span className={`text-sm ${task.status === 'completed' ? 'text-green-500' : 'text-yellow-500'}`}>
          {task.status}
        </span>
      </div>
      <div className="space-x-2">
        <button onClick={() => onEdit(task)} className="text-blue-500 hover:underline">Edit</button>
        <button onClick={() => onDelete(task._id)} className="text-red-500 hover:underline">Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;