import { data } from '../../data/data.js'

export const searchUsers = (query) => {
    const token = data.token

    return fetch(`http://localhost:3000/users/search?query=${query}`, {
        method: 'GET',
        headers: {
            Authorization : `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json()) // Parseamos la respuesta como JSON
        .then((foundUsers) => {
            if (!Array.isArray(foundUsers)) {
                throw new Error('Unexpected response format')
            }
            return foundUsers // Devolvemos los usuarios encontrados
        })
        .catch((error) => {
            console.error('Error fetching users:', error)
            throw error // Lanza el error si hay algún problema
        })
}