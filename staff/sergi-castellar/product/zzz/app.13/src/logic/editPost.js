import { data } from './../data/index';
import { errors, validate } from 'com'

const { SystemError } = errors


export const editPost = (postId, text) => {
    validate.id(postId, 'id');
    validate.description(text, 'text');

    const { userId } = data;

    return fetch(`http://localhost:8080/posts/edit/${postId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Basic ${userId}`,
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

};
