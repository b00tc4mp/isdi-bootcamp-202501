import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError } = errors

export const updateClothingItem = (clothingItemId, itemName, category, type, color, season, occasion) => {
    validate.id(clothingItemId)

    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/clothingItems/${clothingItemId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itemName, category, type, color, season, occasion })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status == 204)
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