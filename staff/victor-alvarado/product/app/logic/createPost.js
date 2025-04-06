import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError } = errors

export const createPost = (image, text) => {
    validate.url(image, 'image')
    validate.maxLength(image, 1000, 'image')
    validate.text(text, 'text')
    validate.maxLength(text, 500, 'text')

    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image, text })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            console.log(response.status)

            if (response.status === 201)
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