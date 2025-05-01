import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError } = errors

export const deleteClothingItem = clothingItemId => {
    validate.id(clothingItemId, 'clothing item id')

    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/clothingItems/${clothingItemId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status === 204)
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