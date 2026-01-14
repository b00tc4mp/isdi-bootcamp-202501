import { data } from '../data/index.js'
import { errors } from 'com'

const { SystemError } = errors

export const getPosts = () => {
    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) }) // => steps in when port is incorrect or
        .then(response => {                                 // api not thrown (FAILED TO FETCH)
            if (response.status === 200)
                return response.json()
                    .catch(error => { throw new SystemError(error.message) }) // => steps in when the response is a non valid JSON
                    .then(body => {
                        const posts = body

                        posts.forEach(post => {
                            post.createdAt = new Date(post.createdAt)
                            if (post.modifiedAt) post.modifiedAt = new Date(post.modifiedAt)
                        })

                        return posts            // => HAPPY PATH
                    })

            return response.json()
                .catch(error => { throw new SystemError(error.message) }) // => steps in when route params are incorrect
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)                // => steps in when a NotFound ERROR is found
                })
        })
}