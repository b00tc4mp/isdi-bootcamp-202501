import { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'


// manejo de la obtención, guardado y eliminación del token de AsyncStorage
export function useToken() {
    const [token, setTokenState] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        AsyncStorage.getItem('token')
            .then(value => setTokenState(value))
            .catch(error => console.error('Error retrieving token:', error))
            .finally(() => setLoading(false))
    }, [])

    const saveToken = useCallback(async (value: string) => {
        try {
            await AsyncStorage.setItem('token', value)
            setTokenState(value)
        } catch (error) {
            console.error('Error saving token:', error)
        }
    }, [])

    const removeToken = useCallback(async () => {
        try {
            await AsyncStorage.removeItem('token')
            setTokenState(null)
        } catch (error) {
            console.error('Error removing token:', error)
        }
    }, [])

    return { token, saveToken, removeToken, loading }
}