import api from "./api";
import { Task } from "../interface/Task";
import { TaskRequest } from "../interface/TaskRequest";

// Função utilitária para padronizar erros
function handleApiError(action: string, error: unknown): never {
  console.error(`❌ Erro ao ${action}:`, error);
  throw new Error(`Erro ao ${action}`);
}

// Buscar tarefas
export async function fetchTasks(): Promise<Task[]> {
  try {
    const { data } = await api.get<Task[]>('/tasks');
    return data;
  } catch (error) {
    handleApiError('buscar tarefas', error);
  }
}

// Criar tarefa
export async function createTask(task: TaskRequest): Promise<Task> {
  try {
    const { data } = await api.post<Task>('/tasks', task);
    return data;
  } catch (error) {
    handleApiError('criar tarefa', error);
  }
}

// Atualizar tarefa (genérica: pode alterar título e/ou done)
export async function updateTask(id: number, updates: Partial<Task>): Promise<Task> {
  try {
    const { data } = await api.patch<Task>(`/tasks/${id}`, updates);
    return data;
  } catch (error) {
    handleApiError('atualizar tarefa', error);
  }
}

// Deletar tarefa
export async function deleteTask(id: number): Promise<void> {
  try {
    await api.delete(`/tasks/${id}`);
  } catch (error) {
    handleApiError('deletar tarefa', error);
  }
}
