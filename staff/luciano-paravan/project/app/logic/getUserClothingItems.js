import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError } = errors

export const getUserClothingItems = () => {
    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/users/clothingItems`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status === 200)
                return response.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(body => {
                        const clothingItems = body.clothingItems

                        clothingItems.forEach(clothingItem => {
                            clothingItem.createdAt = new Date(clothingItem.createdAt)
                        })

                        return clothingItems
                    })

            return response.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { errorName, message } = body

                    const constructor = errors[errorName]

                    throw new constructor(message)
                })
        })
}
