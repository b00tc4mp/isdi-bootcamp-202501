import { data } from '../data'
import { errors } from 'com'
import getEnv from '../data/constants'

const { SystemError } = errors

const getUserData = (): Promise<{ alias: string; level?: string }> => {
    const token = data.getToken()
    const { apiUrl } = getEnv()

    return fetch(`${apiUrl}/users/self`, {
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
