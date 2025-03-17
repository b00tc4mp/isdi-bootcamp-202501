import { data } from '../data/index.js'
import { validate } from './validate.js'

// Funcion para añadir un Posts nuevo
export const createPost = (image, text) => {
    validate.url(image)
    validate.maxLength(1000)
    validate.text(text)
    validate.maxLength(500)

    const { userId } = data

    return fetch('http://localhost:8080/posts', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${userId}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image, text })
    })
        .catch(error => { throw new Error(error.message) })
        .then(response => {
            console.log(response.status)

            if (response.status === 201)
                return

            return response.json()
                .catch(error => { throw new Error(error.message) })
                .then(body => {
                    const { error, message } = body

                    throw new Error(message)
                })
        })
}