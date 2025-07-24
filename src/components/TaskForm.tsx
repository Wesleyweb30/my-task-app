import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

interface TaskFormProps {
    titulo: string;
    setTitulo: (value: string) => void;
    onCreate: (titulo: string) => void;
}

export function TaskForm({ titulo, setTitulo, onCreate }: TaskFormProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nova Tarefa</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: Passear com o pet"
                placeholderTextColor={'#aaa'}
                value={titulo}
                onChangeText={setTitulo}
            />
            <TouchableOpacity
                style={styles.buttonPrimary}
                onPress={() => {
                    if (!titulo.trim()) return Alert.alert('Digite um título!');
                    onCreate(titulo);
                }}>
                <Icon name="plus" size={20} color="#fff" />
                <Text style={styles.buttonText}>Adicionar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { backgroundColor: '#fff', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#ddd' },
    title: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 15 },
    input: { width: '90%', backgroundColor: '#f0f0f0', borderRadius: 8, padding: 12, fontSize: 16, color: '#333', marginBottom: 15 },
    buttonPrimary: { flexDirection: 'row', alignItems: 'center', gap: 8, width: 200, height: 45, borderRadius: 25, backgroundColor: '#007bff', justifyContent: 'center' },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
