import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/appNavigator'
import { useState } from 'react'

import loginUser from '../services/loginUser'

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>

export default function Login({ navigation }: Props) {
    const [alias, setAlias] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        try {
            await loginUser(alias, password)
            Alert.alert('Login exitoso', 'Bienvenido de nuevo 👋')
            // Aquí luego navegamos a Home cuando lo tengas
        } catch (error: any) {
            Alert.alert('Error', error.message)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>TZEND</Text>
            <Text style={styles.subtitle}>LOGIN</Text>

            <TextInput
                placeholder="ALIAS"
                onChangeText={setAlias}
                value={alias}
                style={styles.input}
                autoCapitalize="none"
            />
            <TextInput
                placeholder="PASSWORD"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
                style={styles.input}
            />

            <Button title="LOG IN" onPress={handleLogin} />

            <TouchableOpacity onPress={() => navigation.navigate('Register', {
                alias: '',
                email: '',
                password: ''
            })}>
                <Text style={styles.link}>CREATE AN ACCOUNT</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log('access as guest')}>
                <Text style={styles.link}>ENTER AS A GUEST</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: '#f0f0f0'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 12
    },
    subtitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        alignSelf: 'center'
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 10,
        marginBottom: 16,
        backgroundColor: '#fff'
    },
    link: {
        color: 'blue',
        marginTop: 8,
        textAlign: 'center'
    }
})
