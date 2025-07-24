import React from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { useTasks } from '../src/hooks/useTasks';
import TaskList from '../src/components/TaskList';
import { TaskForm } from '../src/components/TaskForm';

export default function TaskScreen() {
  const { tasks, titulo, setTitulo, loading, error, filter, setFilter, search, setSearch, action: { handleToggleDone, handleCreate, handleDelete, handleEdit } } = useTasks();

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>My Task App</Text>
      </View>

      <TaskForm titulo={titulo} setTitulo={setTitulo} onCreate={handleCreate} />
      <Text style={styles.title}>Lista de Tarefas</Text>

      {/* Busca */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={18} color="#999" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.search}
          placeholder="Buscar tarefa..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

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
  header: { backgroundColor: '#007bff', paddingVertical: 20, marginBottom: 10, borderBottomLeftRadius: 12, borderBottomRightRadius: 12 },
  appTitle: { fontSize: 26, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 10, color: '#333' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 10, borderWidth: 1, borderColor: '#ddd', marginBottom: 10 },
  search: { flex: 1, paddingVertical: 8, fontSize: 16, color: '#333' },
  filters: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  filterButton: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: '#eaeaea', elevation: 2 },
  filterButtonActive: { backgroundColor: '#007bff' },
  filterText: { color: '#333', fontSize: 14 },
  filterTextActive: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
});
