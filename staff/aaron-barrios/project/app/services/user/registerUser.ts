import { errors, validate } from 'com'

const { SystemError } = errors

const registerUser = (
    alias: string,
    email: string,
    password: string
): Promise<void> => {
    validate.alias(alias)
    validate.email(email)
    validate.password(password)


    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ alias, email, password })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status === 201) return // HAPPY PATH

            return response.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body
                    const constructor = errors[error as keyof typeof errors] || SystemError

                    throw new constructor(message)
                })
        })
}

export default registerUser