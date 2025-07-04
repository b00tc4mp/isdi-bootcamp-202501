import { data } from '../../data'
import { errors, validate } from 'com'

const { SystemError } = errors

const loginUser = (alias: string, password: string): Promise<void> => {
    validate.alias(alias)
    validate.password(password)

    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/auth`, {
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
                        return data.setToken(token).then(() => {
                            token
                            console.log("🟢 Token actual, loggedUser:", token)
                        }) // => HAPPY PATH
                            .catch(error => { throw new SystemError(error.message) })
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
