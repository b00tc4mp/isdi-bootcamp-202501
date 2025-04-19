import { errors } from 'com'
import { data } from '@/data'
import { UserType } from 'com/types'

const { SystemError, AuthorizationError } = errors

const updateUserData = (
    updates: Omit<UserType, 'id' | 'createdAt'>
): Promise<void> => {
    return data.getToken()
        .catch(error => { throw new SystemError(error.message) })
        .then(token => {
            if (!token) throw new AuthorizationError('No token found')

            return fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/self`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updates)
            })
        })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => res.json())
        .then(body => {
            if ('error' in body) {
                const { error, message } = body
                const Constructor = (errors as any)[error] || SystemError
                throw new Constructor(message)
            }

            // No se retorna nada si todo va bien
        })
}

export default updateUserData