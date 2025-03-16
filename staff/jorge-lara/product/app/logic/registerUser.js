import { validate } from './validate.js'

export const registerUser = (name, email, username, password) => {
    validate.text(name, 'name');
    validate.minLength(name, 1, 'name');
    validate.maxLength(name, 20, 'name');
    validate.email(email, 'email');
    validate.username(username, 'username');
    validate.password(password, 'password');

    return fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, username, password })
    })
        .catch(error => {
            throw new Error(error.message);
        })
        .then(response => {
            console.log(response.status);

            if (response.status === 201) {
                return;
            }

            return response.json()
                .catch(error => { throw new Error(error.message) })
                .then(body => {
                    const { error, message } = body;

                    throw new Error(message);
                })
        });
}