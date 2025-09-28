import { useEffect, useState } from 'react';
import api from '../lib/api';
import { Task } from '@task-management-system/models';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

export default function TasksPage() {
  const { token, logout, userRole } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  useEffect(() => {
    if (!token) router.push('/login');
    else fetchTasks();
  }, [token]);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err: any) {
      setError(
        err.response?.status === 403 ? 'Access denied' : 'Failed to fetch tasks'
      );
    }
  };

  const createTask = async () => {
    try {
      await api.post('/tasks', {
        title: newTaskTitle,
        description: newTaskDescription,
        assignedTo: '1',
        createdBy: '1',
      });
      setNewTaskTitle('');
      setNewTaskDescription('');
      fetchTasks();
    } catch (err: any) {
      setError('Failed to create task');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 relative">
      {/* Logout Button */}
      <button
        onClick={logout}
        className="bg-red-500 text-white px-3 py-1 rounded absolute right-0 top-0"
      >
        Logout
      </button>

      <h1 className="text-2xl mb-4">Tasks</h1>

      {/* New Task Form - only ADMIN or MANAGER */}
      {(userRole === 'ADMIN' || userRole === 'MANAGER') && (
        <div className="mb-6">
          <input
            type="text"
            placeholder="Task title"
            className="border p-2 mr-2"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Task description"
            className="border p-2 mr-2"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
          />
          <button onClick={createTask} className="bg-blue-500 text-white p-2">
            Add Task
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Task List */}
      <ul className="space-y-2">
        {tasks.map((t) => (
          <li key={t.id} className="border p-3 rounded">
            <h2 className="font-bold">{t.title}</h2>
            <p>{t.description}</p>
            <p>Status: {t.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
