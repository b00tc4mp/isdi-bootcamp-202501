import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button, Alert } from 'react-native'
import getUserData from '../services/getUserData'

export default function Home() {
    const [alias, setAlias] = useState<string | null>(null)
    const [level, setLevel] = useState<string | null>(null)

    useEffect(() => {
        getUserData()
            .then(({ alias, level }) => {
                setAlias(alias)
                setLevel(level || null)
            })
            .catch(error => {
                Alert.alert('Error', error.message)
            })
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome back, {alias ?? '...'}</Text>
            {level && <Text style={styles.subtitle}>Level: {level}</Text>}

            <Button title="Logout" onPress={() => Alert.alert('Implementar logout')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f2f2f2'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20
    }
})
