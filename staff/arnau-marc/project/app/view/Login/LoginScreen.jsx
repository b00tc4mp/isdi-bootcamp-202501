import React, { useState } from 'react'
import { View, Text, TextInput, Button, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import { logic } from '../../logic' // Asegúrate de que este archivo esté configurado correctamente
import styles from './Login.styles.js'

const Login = ({ navigation }) => {  // Cambia 'route' a 'navigation'
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // Maneja el submit del login
    const handleLoginSubmit = () => {
        try {
            logic.loginUser(username, password)
                .then(() => {
                    setUsername('')
                    setPassword('')
                    navigation.navigate('Home')
                  
                })
                .catch(error => {
                    console.error(error)
                    //Alert.alert('Error ❌', `Error: ${error.message}`)
                    window.alert(`Error ❌\n${error.message}`)
                })
        } catch (error) {
            console.error(error)
            //Alert.alert('Error ❌', `Error: ${error.message}`)
            window.alert(`Error ❌\n${error.message}`)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder="Your username..."
                style={styles.input}
            />
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Your password..."
                secureTextEntry
                style={styles.input}
            />
            <Button title="Login" onPress={handleLoginSubmit} />

            {/* Navegación a Register */}
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.link}>Don't have an account? Register</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login


