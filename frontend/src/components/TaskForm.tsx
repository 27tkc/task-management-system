import { useState } from 'react';
import { Task } from '../types';

interface Props {
  initialData?: Task;
  onSubmit: (data: Omit<Task, '_id'>) => void;
}

export default function TaskForm({ initialData, onSubmit }: Props) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(
    initialData?.description || ''
  );
  const [status, setStatus] = useState(initialData?.status || 'pending');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, status });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <input
        type="text"
        placeholder="Title"
        className="border p-2 mb-2 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        className="border p-2 mb-2 w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 mb-2 w-full"
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In progress</option>
        <option value="done">Done</option>
      </select>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        {initialData ? 'Update Task' : 'Create Task'}
      </button>
    </form>
  );
}
