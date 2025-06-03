import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError } = errors

export const updatePostText = (postId, text) => {
    validate.id(postId, 'postId')

    const { userId } = data

    return fetch(`http://localhost:8080/posts/${postId}/text`, {
        method: 'PATCH',
        headers: {
            Authorization: `Basic ${userId}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
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