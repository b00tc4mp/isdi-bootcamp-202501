import { data } from '../data/index.js'
import { errors, validate } from '../../com'

const { SystemError } = errors

export const createPost = (image, text) => {
    validate.url(image, 'image')
    validate.maxLength(1000)
    validate.text(text, 'text')
    validate.maxLength(500)

    const { token } = data

    return fetch('http://localhost:8080/posts', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ image, text })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {

            if (response.status === 201)
                return // return solo porque no devuelve ningun body

            return response.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}