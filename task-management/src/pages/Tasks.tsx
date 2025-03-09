import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';
import TaskModal from '../components/TaskModal';
import { getTasks, createTask, updateTask, deleteTask } from '../utils/api';
import { Task } from '../types';

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  const handleCreate = async (data: { title: string; description?: string }) => {
    await createTask(data);
    fetchTasks();
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleUpdate = async (data: { title?: string; description?: string; status?: string }) => {
    if (editingTask) {
      await updateTask(editingTask._id, data);
      fetchTasks();
    }
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    fetchTasks();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Task Manager</h1>
          <button onClick={handleLogout} className="text-red-500 hover:underline">
            Logout
          </button>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Task
        </button>
        <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
        {isModalOpen && (
          <TaskModal
            task={editingTask}
            onSave={editingTask ? handleUpdate : handleCreate}
            onClose={() => {
              setIsModalOpen(false);
              setEditingTask(undefined);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Tasks;