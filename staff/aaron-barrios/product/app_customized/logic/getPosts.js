import { data } from '../data/index.js'

export const getPosts = () => {
    const { userId } = data

    return fetch('http://localhost:8080/posts', {
        method: 'GET',
        headers: {
            Authorization: `Basic ${userId}`
        }
    })
        .catch(error => { throw new Error(error.message) }) // => steps in when port is incorrect or 
        .then(response => {                                 // api not thrown (FAILED TO FETCH)
            console.log(response.status)

            if (response.status === 200)
                return response.json()
                    .catch(error => { throw new Error(error.message) }) // => steps in when the response is a non valid JSON
                    .then(body => {
                        const posts = body

                        posts.forEach(post => {
                            post.createdAt = new Date(post.createdAt)
                            if (post.modifiedAt) post.modifiedAt = new Date(post.modifiedAt)
                        })

                        return posts            // => HAPPY PATH
                    })

            return response.json()
                .catch(error => { throw new Error(error.message) }) // => steps in when route params are incorrect
                .then(body => {
                    const { error, message } = body

                    throw new Error(message)                // => steps in when a NotFound ERROR is found
                })
        })
}