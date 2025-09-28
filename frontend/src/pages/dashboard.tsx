import { useEffect, useState } from 'react';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { Task } from '../types';

export default function Dashboard() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editing, setEditing] = useState<Task | null>(null);

  useEffect(() => {
    if (token) {
      api.get('/tasks').then((res) => setTasks(res.data));
    }
  }, [token]);

  const handleAdd = async (data: Omit<Task, '_id'>) => {
    const res = await api.post('/tasks', data);
    setTasks([...tasks, res.data]);
  };

  const handleEdit = async (data: Omit<Task, '_id'>) => {
    if (!editing) return;
    const res = await api.put(`/tasks/${editing._id}`, data);
    setTasks(tasks.map((t) => (t._id === editing._id ? res.data : t)));
    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter((t) => t._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        <TaskForm
          initialData={editing || undefined}
          onSubmit={editing ? handleEdit : handleAdd}
        />

        <div className="mt-6 space-y-4">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={setEditing}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
