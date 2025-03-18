import { data } from './../data/index'
import { validate, errors } from 'com'

const { SystemError } = errors

export const deletePost = (postId) => {
    validate.id(postId, 'id');

    const { userId } = data

    return fetch(`http://localhost:8080/posts/delete/${postId}`, {
        method: 'DELETE',
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
};
