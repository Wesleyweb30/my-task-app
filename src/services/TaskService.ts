import api from "./api";
import { Task } from "../interface/Task";
import { TaskRequest } from "../interface/TaskRequest";

export async function fetchTasks(): Promise<Task[]> {
  try {
    const res = await api.get<Task[]>('/tasks');
    return res.data;
  } catch (error) {
    console.error('❌ Erro ao buscar tarefas:', error);
    throw new Error('Erro ao buscar tarefas');
  }
}

export async function createTask(task: TaskRequest): Promise<Task> {
  try {
    const response = await api.post('/tasks', task);
    return response.data
  } catch (error) {
    console.error('❌ Erro ao criar tarefa:', error);
    throw new Error('Erro ao criar tarefa');
  }
}

export async function updateDoneTask(task :Task): Promise<Task> {
  try {
    const response = await api.patch<Task>(`/tasks/${task.id}`, {
      done: !task.done,
    });
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao atualizar tarefa:', error);
    throw new Error('Erro ao atualizar tarefa');
  }
}

export async function deleteTask(id: number): Promise<void>{
  try {
    await api.delete(`/tasks/${id}`);
  } catch (error) {
    console.error('❌ Erro ao deletar tarefa:', error);
    throw new Error('Erro ao deletar tarefa')
  }
}


