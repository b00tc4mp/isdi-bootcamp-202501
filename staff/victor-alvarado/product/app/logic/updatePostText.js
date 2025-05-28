import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError } = errors

export const updatePostText = (postId, text) => {
    validate.id(postId, 'postId')

    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/text`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
    })

        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            console.log(response.status)

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