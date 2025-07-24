import React from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useTasks } from '../src/hooks/useTasks';
import TaskList from '../src/components/TaskList';
import { TaskForm } from '../src/components/TaskForm';

export default function TaskScreen() {
  const { tasks, titulo, setTitulo, loading, error, filter, setFilter, search, setSearch, action: { handleToggleDone, handleCreate, handleDelete, handleEdit } } = useTasks();

  return (
    <SafeAreaView style={styles.container}>
      <TaskForm titulo={titulo} setTitulo={setTitulo} onCreate={handleCreate} />
      <Text style={styles.title}>Lista de Tarefas</Text>

      {/* Busca */}
      <TextInput
        style={styles.search}
        placeholder="Buscar tarefa..."
        value={search}
        onChangeText={setSearch}
      />

      {/* Filtros */}
      <View style={styles.filters}>
        {['all', 'pending', 'done'].map((type) => (
          <TouchableOpacity
            key={type}
            style={[styles.filterButton, filter === type && styles.filterButtonActive]}
            onPress={() => setFilter(type as any)}
          >
            <Text style={filter === type ? styles.filterTextActive : styles.filterText}>
              {type === 'all' ? 'Todas' : type === 'pending' ? 'Pendentes' : 'Concluídas'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

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
  container: { flex: 1, backgroundColor: '#f9f9f9', paddingHorizontal: 10 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 10, color: '#333' },
  search: { backgroundColor: '#fff', borderRadius: 8, padding: 10, borderWidth: 1, borderColor: '#ddd', marginBottom: 10 },
  filters: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  filterButton: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, backgroundColor: '#eaeaea' },
  filterButtonActive: { backgroundColor: '#007bff' },
  filterText: { color: '#333' },
  filterTextActive: { color: '#fff', fontWeight: 'bold' },
});
