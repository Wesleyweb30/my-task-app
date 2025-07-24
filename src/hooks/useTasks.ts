import { useEffect, useState } from 'react';
import { Task } from '../interface/Task';
import { createTask, deleteTask, fetchTasks, updateTask } from '../services/TaskService';

// Tipo para o filtro
type FilterType = 'all' | 'done' | 'pending';

export function useTasks() {
  // Estado que armazena todas as tarefas
  const [tasks, setTasks] = useState<Task[]>([]);
  // Estado que controla o carregamento (loading spinner)
  const [loading, setLoading] = useState(true);
  // Estado que armazena mensagens de erro
  const [error, setError] = useState<string | null>(null);
  // Estado para o título da tarefa que está sendo digitada
  const [titulo, setTitulo] = useState<string>('');
  // Estado do filtro aplicado (todas, concluídas ou pendentes)
  const [filter, setFilter] = useState<FilterType>('all');
  // Estado do texto da busca
  const [search, setSearch] = useState('');

  // Efeito que carrega as tarefas ao montar o hook
  useEffect(() => {
    load();
  }, []);

  // Função que busca as tarefas na API
  async function load() {
    try {
      setLoading(true); // ativa o estado de carregamento
      const data = await fetchTasks(); // busca dados da API
      setTasks(data); // atualiza o estado com as tarefas
    } catch (err: any) {
      setError(err.message); // define a mensagem de erro, se falhar
    } finally {
      setLoading(false); // desativa o estado de carregamento
    }
  }

  // Cria uma nova tarefa
  const handleCreate = async (titulo: string) => {
    if (!titulo.trim()) return; // impede criar tarefa vazia
    try {
      const newTask: Task = { title: titulo, done: false }; // monta objeto da nova tarefa
      const data = await createTask(newTask); // envia para API
      setTasks((prev) => [data, ...prev]); // adiciona no estado
      setTitulo(''); // limpa o campo de texto
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Alterna o status da tarefa (concluída/pendente)
  const handleToggleDone = async (task: Task) => {
    try {
      const updated = await updateTask(task.id!, { done: !task.done }); // atualiza no backend
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t))); // atualiza no estado
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Edita o título de uma tarefa existente
  const handleEdit = async (taskId: number, newTitle: string) => {
    if (!newTitle.trim()) return; // impede salvar título vazio
    try {
      const updated = await updateTask(taskId, { title: newTitle }); // envia update para API
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t))); // atualiza no estado
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Remove uma tarefa
  const handleDelete = async (taskId: number) => {
    try {
      await deleteTask(taskId); // remove no backend
      setTasks((prev) => prev.filter((task) => task.id !== taskId)); // remove do estado
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Aplica filtro e busca nas tarefas
  const filteredTasks = tasks.filter((task) => {
    // Verifica se a tarefa atende ao filtro selecionado
    const matchesFilter =
      filter === 'all' ? true :
        filter === 'done' ? task.done :
          !task.done;
    // Verifica se a tarefa contém o texto buscado
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Retorna os estados e funções que serão usados nos componentes
  return {
    tasks: filteredTasks, // tarefas filtradas e buscadas
    titulo,
    setTitulo,
    loading,
    error,
    filter,
    setFilter,
    search,
    setSearch,
    action: { handleToggleDone, handleCreate, handleEdit, handleDelete },
  };
}
