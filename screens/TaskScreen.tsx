import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { useTasks } from '../src/hooks/useTasks';
import TaskList from '../src/components/TaskList';
import { TaskForm } from '../src/components/TaskForm';

export default function TaskScreen() {
  const { tasks, titulo, setTitulo, loading, error, action: { handleToggleDone, handleCreate, handleDelete, handleEdit } } = useTasks();

  return (
    <SafeAreaView style={styles.container}>
      <TaskForm titulo={titulo} setTitulo={setTitulo} onCreate={handleCreate} />
      <Text style={styles.title}>Lista de Tarefas</Text>
      <TaskList 
        tasks={tasks} 
        loading={loading} 
        error={error} 
        onDone={handleToggleDone} 
        onDelete={handleDelete} 
        onEdit={handleEdit} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 20, color: '#333' },
});
