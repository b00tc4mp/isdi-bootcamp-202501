import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { logic } from '../logic/index.js'; // Asegúrate de que este archivo esté configurado correctamente

export function Login({ onNavigateToRegister, onUserLoggedIn }) {
    // Usamos useState para manejar el estado de los campos de usuario y contraseña
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Maneja el submit del login
    const handleLoginSubmit = () => {
        try {
            logic.loginUser(username, password)
                .then(() => {
                    // Limpiamos los campos de usuario y contraseña después de un login exitoso
                    setUsername('');
                    setPassword('');

                    // Llamamos a la función onUserLoggedIn que probablemente cambiará el estado en el componente padre
                    onUserLoggedIn();

                    // Mostramos un mensaje de éxito usando el Alert de React Native
                    Alert.alert('Welcome back!', `Welcome back! ${username}`);
                })
                .catch(error => {
                    console.error(error);

                    // Mostramos un mensaje de error
                    Alert.alert('Error ❌', `Error: ${error.message}`);
                });
        } catch (error) {
            console.error(error);

            // Mostramos un mensaje de error en caso de excepciones
            Alert.alert('Error ❌', `Error: ${error.message}`);
        }
    };

    console.debug('Login -> render');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            {/* Campo para el nombre de usuario */}
            <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder="Your username..."
                style={styles.input}
            />

            {/* Campo para la contraseña */}
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Your password..."
                secureTextEntry
                style={styles.input}
            />

            {/* Botón de login */}
            <Button title="Login" onPress={handleLoginSubmit} />

            {/* Enlace para ir al registro */}
            <TouchableOpacity onPress={onNavigateToRegister}>
                <Text style={styles.link}>Register</Text>
            </TouchableOpacity>
        </View>
    );
}

