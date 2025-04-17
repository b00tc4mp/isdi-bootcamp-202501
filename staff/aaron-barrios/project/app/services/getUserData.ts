import { data } from '../data'
import { errors } from 'com'

const { SystemError } = errors

const getUserData = (): Promise<{ alias: string; level?: string }> => {
    const token = data.getToken()
        .catch(error => { throw new SystemError(error.message) })

    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/auth/self`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            return response.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    if (response.status === 200) {
                        const { alias, level } = body
                        return { alias, level }
                    }

                    const { error, message } = body
                    const Constructor = (errors as any)[error]
                    throw new Constructor(message)
                })
        })
}

export default getUserData
