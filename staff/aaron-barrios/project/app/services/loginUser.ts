import { data } from '../data'
import { errors, validate } from '../com'
import getEnv from '../data/constants'

const { SystemError } = errors
const { apiUrl } = getEnv()

const loginUser = (alias: string, password: string): Promise<void> => {
    validate.alias(alias)
    validate.password(password)

    return fetch(`${apiUrl}/users/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ alias, password })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status === 200)
                return response.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(body => {
                        const { token } = body
                        data.token = token
                    })

            return response.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body
                    const constructor = errors[error as keyof typeof errors]
                    throw new constructor(message)
                })
        })
}

export default loginUser
