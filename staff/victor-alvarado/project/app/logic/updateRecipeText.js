import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError } = errors

export const updateRecipeText = (recipeId, description) => {
    validate.id(recipeId, 'recipeId')

    const { token } = data

    return fetch(`${import.meta.env.VIE_API_URL}/recipes/${recipeId}/description`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {

            if (response.status === 204)
                return

            return response.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}