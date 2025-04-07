import { data } from './../data/index.js';
import { DuplicityError } from './../errors.js';
import { validate } from "./validate.js"

export const registerUser = (name, email, username, password) => {
    validate.name(name, 'name');
    validate.email(email, 'email');
    validate.username(username, 'username');
    validate.password(password, 'password');

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
