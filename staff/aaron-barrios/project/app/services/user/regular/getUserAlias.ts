import { data } from '../../../data'
import { errors } from 'com'

const { SystemError } = errors

const getUserAlias = (): Promise<{ alias: string }> => {
    return data.getToken()
        .catch(error => { throw new SystemError(error.message) })
        .then(token => {
            if (!token) throw new SystemError("No token found")

            return fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/auth/self`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            return response.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    if (response.status === 200) {
                        const { alias } = body
                        return { alias }
                    }

                    const { error, message } = body
                    const Constructor = (errors as any)[error]
                    throw new Constructor(message)
                })
        })
}

export default getUserAlias