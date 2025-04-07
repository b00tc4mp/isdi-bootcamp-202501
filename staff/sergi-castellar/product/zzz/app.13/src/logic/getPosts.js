import { data } from './../data/index';
import { errors } from 'com'

const { SystemError } = errors

export const getPosts = () => {
    const { userId } = data;

    return fetch('http://localhost:8080/posts', {
        method: 'GET',
        headers: {
            Authorization: `Basic ${userId}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            console.log(response.status)

            if (response.status === 200)
                return response.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(body => {
                        const posts = body

                        posts.forEach(post => {
                            post.createdAt = new Date(post.createdAt)
                            if (post.modifiedAt) post.modifiedAt = new Date(post.modifiedAt)
                        })

                        return posts
                    })

            return response.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
};
