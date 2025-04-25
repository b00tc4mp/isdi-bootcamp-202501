import { SystemError } from 'com/errors.js'
import { data } from '../data/index.js'
import errors from 'com'

export const addClothingItem = (itemName, category, type, color, season, occasion) => {
    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/clothing-items`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itemName, category, type, color, season, occasion })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status === 201)
                return

            return response.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { errorName, message } = body

                    const constructor = errors[errorName]

                    throw new constructor(message)
                })
        })
}