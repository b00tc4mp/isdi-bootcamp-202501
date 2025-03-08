import { data } from '../data/index.js'
import { validate } from './validate.js'

export const loginUser = (username, password) => {
    validate.username(username, 'username');
    validate.password(password, 'password');

    const found = data.users.findOne(user => user.username === username);

    if (!found || found.password !== password) {
        throw new Error('Wrong credentials');
    }

    data.userId = found.id;
}