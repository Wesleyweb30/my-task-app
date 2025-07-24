import { useEffect, useState } from 'react';
import { Task } from '../interface/Task';
import { createTask, deleteTask, fetchTasks, updateTask } from '../services/TaskService';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [titulo, setTitulo] = useState<string>('');

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      setLoading(true);
      const data = await fetchTasks();
      setTasks(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleCreate = async (titulo: string) => {
    try {
      const newTask: Task = { title: titulo, done: false };
      const data = await createTask(newTask);
      setTasks((prev) => [data, ...prev]);
      setTitulo('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleToggleDone = async (task: Task) => {
    try {
      const updated = await updateTask(task.id!, { done: !task.done });
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEdit = async (taskId: number, newTitle: string) => {
    try {
      const updated = await updateTask(taskId, { title: newTitle });
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    tasks,
    titulo,
    setTitulo,
    loading,
    error,
    action: {
      handleToggleDone,
      handleCreate,
      handleEdit,
      handleDelete
    },
  };
}
