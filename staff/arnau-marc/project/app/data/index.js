import AsyncStorage from '@react-native-async-storage/async-storage'

export const data = {
    // Obtener el token
    get token() {
        return new Promise(async (resolve, reject) => {
            try {
                const value = await AsyncStorage.getItem('token')
                resolve(value ? JSON.parse(value) : null)
            } catch (error) {
                reject(error)
            }
        })
    },

    // Establecer el token
    set token(id) {
        AsyncStorage.setItem('token', JSON.stringify(id)).catch((error) => {
            console.error("Error saving token: ", error)
        })
    }
}
