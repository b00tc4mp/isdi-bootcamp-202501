import { errors, validate } from 'com'
import { data } from '../data'

const { SystemError } = errors

export const isLevelPassed = (levelId, userAnswer) => {
    validate.id(levelId, 'levelId')
    validate.text(userAnswer, 'userAnswer')
    validate.minLength(userAnswer, 1, 'userAnswer')
    validate.maxLength(userAnswer, 100, 'userAnswer')

    const token = data.token

    return fetch(`${import.meta.env.VITE_API_URL}/users/${levelId}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userAnswer })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status === 200)
                return response.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(body => {
                        const isLevelPassed = body

                        return isLevelPassed
                    })

            return response.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}