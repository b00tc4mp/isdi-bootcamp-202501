import { data } from '../data/index.js'
import { validate } from './validate.js'

export const registerUser = (name, email, username, password) => {
    validate.text(name, 'name');
    validate.maxLength(name, 20, 'name');
    validate.email(email, 'email');
    validate.username(username, 'username');
    validate.password(password, 'password');

    const found = data.users.findOne(user => user.email === email || user.username === username);

    if (found) {
        throw new Error('user already exists');
    }

    const user = {
        name: name,
        email: email,
        username: username,
        password: password,
        createdAt: new Date(),
        modifiedAt: null
    }

    data.users.insertOne(user)
}