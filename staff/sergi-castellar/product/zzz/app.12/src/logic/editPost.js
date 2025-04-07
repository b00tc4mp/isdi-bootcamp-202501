import { data } from './../data/index';
import { NotFoundError, OwnershipError } from './../errors';
import { validate } from './validate'


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
        .catch(error => { throw new Error(error.message) })
        .then(response => {
            console.log(response.status)

            if (response.status === 204)
                return

            return response.json()
                .catch(error => { throw new Error(error.message) })
                .then(body => {
                    const { error, message } = body

                    throw new Error(message)
                })
        })

};
