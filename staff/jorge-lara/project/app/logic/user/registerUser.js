import { errors } from 'com';

const { SystemError } = errors;

export const registerUser = (email, username, password) => {

    return fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, username, password })
    })
        .catch(error => {
            throw new SystemError(error.message);
        })
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