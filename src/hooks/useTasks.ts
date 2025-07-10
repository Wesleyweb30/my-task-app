// src/hooks/useTasks.ts
import { useEffect, useState } from 'react';
import { Task } from '../interface/Task';
import { createTask, deleteTask, fetchTasks, updateDoneTask } from '../services/TaskService';

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
      const data = await fetchTasks();
      setTasks(data);
    } catch (err: any) {
      setError('Erro ao carregar tarefas');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (titulo: string) => {
    try {
      const newTask: Task = {
        title: titulo,
        done: false
      }
      const data = await createTask(newTask);
      if (data) {
        console.log('cadastrou com sucesso', data)
        setTasks((prev) => [data, ...prev]);
        setTitulo('');
      }
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      setError('Erro ao criar tarefa');
    }
  };

  const handleDone = async (taskUpdate: Task) => {
    try {
      const data = await updateDoneTask(taskUpdate);
      setTasks((prev) =>
        prev.map((task) =>
          task.id === data.id ? data : task
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      setError('Erro ao atualizar tarefa');
    }
  };

  const handleDelete = async (taskId: number) => {
    try {
      await deleteTask(taskId)
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      setError('Erro ao deletar tarefa');
    }
  };

  return {
    tasks,
    titulo,
    setTitulo,
    loading,
    error,
    action: {
      handleDone,
      handleCreate,
      handleDelete
    },
  };

};