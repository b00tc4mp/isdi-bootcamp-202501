import AsyncStorage from '@react-native-async-storage/async-storage'

export const data = {
    async getToken(): Promise<string | null> {
        try {
            const value = await AsyncStorage.getItem('token')
            return value
        } catch (error) {
            console.error('Error retrieving token:', error)
            return null
        }
    },

    async setToken(value: string): Promise<void> {
        try {
            await AsyncStorage.setItem('token', value)
        } catch (error) {
            console.error('Error saving token:', error)
        }
    },

    async removeToken(): Promise<void> {
        try {
            await AsyncStorage.removeItem('token')
        } catch (error) {
            console.error('Error removing token:', error)
        }
    }
}
