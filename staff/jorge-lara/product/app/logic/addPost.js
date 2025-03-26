import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError } = errors;

export const addPost = (text, image) => {
    validate.text(text, 'text');
    validate.maxLength(500);
    validate.url(image, 'url');
    validate.maxLength(1000)

    const { token } = data;

    return fetch('http://localhost:8080/posts', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image, text })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {

            if (response.status === 201) {
                return;
            }

            return response.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body;

                    const constructor = errors[error];

                    throw new constructor(message);
                })
        })
}