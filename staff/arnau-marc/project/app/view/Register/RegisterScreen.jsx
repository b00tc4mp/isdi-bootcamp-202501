import React, { useState } from 'react'
import { View, Text, TextInput, Button, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import { logic } from '../../logic' // Asegúrate de que este archivo esté configurado correctamente
import styles from './Register.styles.js' // Asegúrate de tener los estilos adecuados

const Register = ({ navigation }) => {  // Usamos 'navigation' directamente
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleRegisterSubmit = () => {
    try {
      // Realizamos el registro de usuario con los valores de los estados
      logic.registerUser(name, surname, email, username, password)
        .then(() => {
          // Limpiamos los campos del formulario
          setName('')
          setSurname('')
          setEmail('')
          setUsername('')
          setPassword('')

          // Mostramos un mensaje de éxito
          //Alert.alert('Registro exitoso 🎉', '¡Inicia sesión ahora!', [
            //{ text: 'OK', onPress: () => navigation.navigate('Login') }, // Navegamos al login
          //])
          window.alert('Registro exitoso 🎉\n¡Inicia sesión ahora!')
          navigation.navigate('Login') 
        })
        .catch((error) => {
          console.error(error)

          // Mostramos un mensaje de error
          //Alert.alert('Error ❌', error.message)
          window.alert(`Error ❌\n${error.message}`)
        })
    } catch (error) {
      console.error(error)

      // Mostramos un mensaje de error en caso de excepciones
      //Alert.alert('Error ❌', error.message)
      window.alert(`Error ❌\n${error.message}`)
    }
  }

  console.debug('Register -> render')

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
        {/* Campo para apellido */}
        <TextInput
        value={surname}
        onChangeText={setSurname}
        placeholder="Your surname..."
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
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Register
