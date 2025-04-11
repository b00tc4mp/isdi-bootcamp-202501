import { data } from '../../data/index.js'
import { errors, validate } from '../../validations/index.js'

const { SystemError } = errors

export const getUsername = () => {
    return data.token
    .then(token => {
        if (!token) {
            throw new Error('Token not found');
        }

        // Hacemos la solicitud con el token
        return fetch('http://localhost:8080/users/self/username', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,  // Agregamos el token en los headers de la solicitud
            },
        });
    })
        .catch(error => { throw new Error(error.message)})
        .then(response => {
            if (response.status === 200)
                return response.json()
                    .catch(error => { throw new Error(error.message)})
                    .then(body => {
                        const { username } = body

                        return username
                    })
            return response.json()
                    .catch(error => { throw new Error(error.message)})
                    .then(body => {
                        const{ error, message } = body

                        throw new Error(error.message)
                    })
        })
}