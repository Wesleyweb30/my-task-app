import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Task } from '../interface/Task';

interface Props {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  onDone: (task: Task) => Promise<void>;
  onDelete: (taskId: number) => Promise<void>;
}

export default function TaskList({ tasks, loading, error, onDone, onDelete }: Props) {
  if (loading) return <ActivityIndicator size="large" color="#007bff" />;
  if (error) return <Text style={styles.error}>Erro: {error}</Text>;
  if (tasks.length === 0) return <Text style={styles.empty}>Nenhuma tarefa encontrada.</Text>;

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id!.toString()}
      renderItem={({ item }) => (
        <View style={[styles.item, item.done ? styles.itemTrue : styles.itemFalse]}>
          <TouchableOpacity onPress={() => onDone(item)}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <View style={item.done ? styles.itemToggleDoneTrue : styles.itemToggleDoneFalse}></View>
              <Text
                style={[styles.itemTitle, item.done && styles.itemTitleDoneTrue]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>

          <View>
            <TouchableOpacity onPress={() => onDelete(item.id!)}>
              <Text>🗑️</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  error: {
    color: '#FF3B30',
    textAlign: 'center',
    marginTop: 20,
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    color: '#000000',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  itemTrue: {
    backgroundColor: 'black',
  },
  itemFalse: {
    backgroundColor: '#1313ff',
  },
  itemToggleDoneTrue: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'green'
  },
  itemToggleDoneFalse: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 1
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  itemTitleDoneTrue: {
    color: '#fff',
    textDecorationLine: 'line-through',

  },
});