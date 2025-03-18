import { data } from './../data/index';
import { NotFoundError } from './../errors';
import { validate } from './validate'

export const toggleLike = (currentPostId) => {
    validate.id(currentPostId, 'id');

    const { userId } = data;

    return fetch(`http://localhost:8080/posts/likes/${currentPostId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Basic ${userId}`
        }
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
