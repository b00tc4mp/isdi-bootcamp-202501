import { data } from './../data/index'
import { errors, validate } from 'com'

const { SystemError } = errors

export const createNewPost = (imageSrc, textDescription) => {
    validate.url(imageSrc, 'url');
    validate.description(textDescription, 'description');

    const { userId } = data;

    return fetch('http://localhost:8080/posts/new', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${userId}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ imageSrc, textDescription })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            console.log(response.status)

            if (response.status === 201)
                return

            return response.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}
