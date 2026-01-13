import { data } from './../data/index';
import { errors, validate } from 'com'

const { SystemError } = errors

export const toggleLike = (currentPostId) => {
    validate.id(currentPostId, 'id');

    const { token } = data;

    return fetch(`http://localhost:8080/posts/likes/${currentPostId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`
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
