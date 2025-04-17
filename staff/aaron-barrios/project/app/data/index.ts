import AsyncStorage from '@react-native-async-storage/async-storage'
import { errors } from 'com'

const { SystemError } = errors

export const data = {
    async getToken(): Promise<string | null> {
        try {
            const value = await AsyncStorage.getItem('token')
            return value
        } catch (error) {
            throw new SystemError((error as Error).message)
        }
    },

    async setToken(value: string): Promise<void> {
        try {
            await AsyncStorage.setItem('token', value)
        } catch (error) {
            throw new SystemError((error as Error).message)
        }
    },

    async removeToken(): Promise<void> {
        try {
            await AsyncStorage.removeItem('token')
        } catch (error) {
            throw new SystemError((error as Error).message)
        }
    }
}
