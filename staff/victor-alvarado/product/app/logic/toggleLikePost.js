import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError } = errors

export const toggleLikePost = postId => {
    validate.id(postId, 'postId')

    const { userId } = data

    return fetch(`http://localhost:8080/posts/${postId}/likes`, {
        method: 'PATCH',
        headers: {
            Authorization: `Basic ${userId}`
        }
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