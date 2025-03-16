import { data } from '../data/index.js'
import { validate } from './validate.js'

// import { NotFoundError, OwnershipError } from '../errors.js'

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
        .catch(error => { throw new Error(error.message) }) // => steps in when port is incorrect or 
        .then(response => {                                 // api not thrown (FAILED TO FETCH)
            console.log(response.status)

            if (response.status === 204)
                return          // => HAPPY PATH

            return response.json()
                .catch(error => { throw new Error(error.message) }) // => steps in when route params are incorrect
                .then(body => {
                    const { error, message } = body

                    throw new Error(message)    // => steps in when an ownership or notfound Error is found
                })                              // => hardcoded in frontend && validates so not gonna happen
        })
}