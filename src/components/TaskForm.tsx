import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { useTasks } from '../hooks/useTasks';

interface TaskFormProps {
    titulo: string;
    setTitulo: (value: string) => void;
    onCreate: (titulo: string) => void;
}


export function TaskForm({ titulo, setTitulo, onCreate }: TaskFormProps) {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nova Tarefa</Text>
            <View style={styles.containerInput}>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: Passear com o pet"
                    placeholderTextColor={'#e1e1e1'}
                    value={titulo}
                    onChangeText={setTitulo}
                />
            </View>

            <TouchableOpacity style={styles.buttonPrimary}
                onPress={() => {
                    onCreate(titulo);
                    Alert.alert('Salvou')
                }}>
                <Text>Adicionar Tarefa</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        backgroundColor: '#151515', 
        alignItems: 'center', 
        padding: 20
    },
    title: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        textAlign: 'center', 
        marginVertical: 20, 
        color: 'blue'
    },
    containerInput: {
        width: '80%',
    },
    input: {
        borderBottomWidth: 1.5,
        borderBottomColor: 'blue',
        marginBottom: 10,
        borderRadius: 5,
        fontSize: 20,
        color: '#fff',
    },
    buttonPrimary: {
        width: 200,
        height: 50,
        borderRadius: 30,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    }
});