import { data } from './../data/index';
import { DuplicityError } from './../errors';
import { validate } from './validate'

export const registerUser = (name, email, username, password) => {
    validate.name(name, 'name');
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
        .catch(error => { throw new Error(error.message) })
        .then(response => {
            console.log(response.status)

            if (response.status === 201)
                return

            return response.json()
                .catch(error => { throw new Error(error.message) })
                .then(body => {
                    const { error, message } = body

                    throw new Error(message)
                })
        })




    const found = data.users.findOne(user => user.username === username || user.email === email);

    if (found) throw new DuplicityError('user already exists');

    const user = {
        name: name,
        email: email,
        username: username,
        password: password,
        createdAt: new Date(),
        modifiedAt: null
    };

    data.users.insertOne(user, '00');
};
