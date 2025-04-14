import { data } from "../data/index.js"

export const loginUser = (email, password) => {
    //TODO validations
    return fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .catch(error => {
                        throw new SystemError(error.message)
                    })
                    .then(body => {
                        const { token } = body;

                        data.token = token;
                    })
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