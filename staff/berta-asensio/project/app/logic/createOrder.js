import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError } = errors

export const createOrder = (menuId, bread, note) => {

    validate.id(menuId, 'menuId')
    validate.string(bread, 'bread')
    validate.maxLength(bread, 25, 'bread')
    
    validate.string(note, 'note')
    note = note.trim()
    validate.maxLength(note, 200, 'note')

    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ menuId, bread, note })
    })

    .catch(error => { throw new SystemError(error.message) })
    .then(response => {
        if(response.status === 201)
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