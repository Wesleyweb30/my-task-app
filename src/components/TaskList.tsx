import React, { useState, useRef } from 'react';
import {
  View, Text, FlatList, ActivityIndicator, StyleSheet,
  TouchableOpacity, LayoutAnimation, UIManager, Platform, Pressable, Alert, TextInput, Modal, Animated
} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { Task } from '../interface/Task';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  onDone: (task: Task) => Promise<void>;
  onDelete: (taskId: number) => Promise<void>;
  onEdit: (taskId: number, newTitle: string) => Promise<void>;
}

export default function TaskList({ tasks, loading, error, onDone, onDelete, onEdit }: Props) {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const animate = () => LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

  const confirmDelete = (id: number) => {
    Alert.alert('Confirmar exclusão', 'Tem certeza que deseja excluir esta tarefa?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => { animate(); onDelete(id); } },
    ]);
  };

  const openEditModal = (task: Task) => {
    setCurrentTask(task);
    setEditTitle(task.title);
    setEditModalVisible(true);
  };

  const saveEdit = () => {
    if (currentTask) {
      onEdit(currentTask.id!, editTitle);
      setEditModalVisible(false);
    }
  };

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const triggerScale = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.3, duration: 150, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 150, useNativeDriver: true })
    ]).start();
  };

  if (loading) return <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />;
  if (error) return <Text style={styles.error}>Erro: {error}</Text>;
  if (tasks.length === 0) return <Text style={styles.empty}>Nenhuma tarefa encontrada.</Text>;

  return (
    <>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id!.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => { triggerScale(); animate(); onDone(item); }}
            android_ripple={{ color: '#ccc' }}
            style={[styles.item, item.done ? styles.itemTrue : styles.itemFalse]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Animated.View style={[item.done ? styles.toggleDone : styles.togglePending, { transform: [{ scale: scaleAnim }] }]}>
                {item.done && <Icon name="check" size={16} color="#fff" />}
              </Animated.View>
              <Text style={[styles.itemTitle, item.done && styles.itemTitleDone]} numberOfLines={1}>
                {item.title}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity onPress={() => openEditModal(item)}>
                <Icon name="edit" size={18} color="#007bff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(item.id!)}>
                <Icon name="trash-2" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </Pressable>
        )}
      />
      {/* Modal igual antes */}
      <Modal visible={editModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Editar Tarefa</Text>
            <TextInput
              style={styles.modalInput}
              value={editTitle}
              onChangeText={setEditTitle}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setEditModalVisible(false)} style={[styles.modalButton, { backgroundColor: '#ccc' }]}>
                <Text>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={saveEdit} style={[styles.modalButton, { backgroundColor: '#007bff' }]}>
                <Text style={{ color: '#fff' }}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  error: { color: '#FF3B30', textAlign: 'center', marginTop: 20 },
  empty: { textAlign: 'center', marginTop: 20, color: '#777' },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, marginVertical: 6, marginHorizontal: 16, borderRadius: 12, elevation: 2 },
  itemTrue: { backgroundColor: '#d1f7d6' },
  itemFalse: { backgroundColor: '#f0f4ff' },
  toggleDone: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#28a745', justifyContent: 'center', alignItems: 'center' },
  togglePending: { width: 24, height: 24, borderRadius: 12, borderColor: '#007bff', borderWidth: 2 },
  itemTitle: { fontWeight: 'bold', fontSize: 16, color: '#333', maxWidth: 220 },
  itemTitleDone: { color: '#777', textDecorationLine: 'line-through' },
  deleteButton: { backgroundColor: '#ff4d4d', padding: 8, borderRadius: 8 },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContainer: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  modalInput: { borderBottomWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 15 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  modalButton: { padding: 10, borderRadius: 8, width: '45%', alignItems: 'center' },
});
