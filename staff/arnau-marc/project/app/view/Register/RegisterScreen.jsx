import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { logic } from '../logic/index.js'; // Asegúrate de que este archivo esté configurado correctamente

export function Register({ onLoginClick, onRegisterSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegisterSubmit = () => {
    try {
      // Realizamos el registro de usuario con los valores de los estados
      logic.registerUser(name, email, username, password)
        .then(() => {
          // Limpiamos los campos del formulario
          setName('');
          setEmail('');
          setUsername('');
          setPassword('');

          // Mostramos un mensaje de éxito
          Alert.alert('Registro exitoso 🎉', '¡Inicia sesión ahora!', [
            { text: 'OK', onPress: onRegisterSubmit },
          ]);
        })
        .catch((error) => {
          console.error(error);

          // Mostramos un mensaje de error
          Alert.alert('Error ❌', error.message);
        });
    } catch (error) {
      console.error(error);

      // Mostramos un mensaje de error en caso de excepciones
      Alert.alert('Error ❌', error.message);
    }
  };

  console.debug('Register -> render');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      {/* Campo para nombre */}
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Your name..."
        style={styles.input}
      />

      {/* Campo para email */}
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="example@example.com"
        keyboardType="email-address"
        style={styles.input}
      />

      {/* Campo para nombre de usuario */}
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Your Nickname..."
        style={styles.input}
      />

      {/* Campo para contraseña */}
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Your password..."
        secureTextEntry
        style={styles.input}
      />

      {/* Botón de registro */}
      <Button title="Register" onPress={handleRegisterSubmit} />

      {/* Enlace para ir al login */}
      <TouchableOpacity onPress={onLoginClick}>
        <Text style={styles.link}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}


