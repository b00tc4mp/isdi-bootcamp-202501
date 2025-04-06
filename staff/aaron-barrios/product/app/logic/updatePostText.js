import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

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
        .catch(error => { throw new SystemError(error.message) }) // => steps in when port is incorrect or 
        .then(response => {                                 // api not thrown (FAILED TO FETCH)
            if (response.status === 204)
                return          // => HAPPY PATH

            return response.json()
                .catch(error => { throw new SystemError(error.message) }) // => steps in when route params are incorrect
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)    // => steps in when an ownership or notfound Error is found
                })                                  // => hardcoded in frontend && validates so not gonna happen
        })
}