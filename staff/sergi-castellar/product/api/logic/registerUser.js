import { data } from './../data/index.js';
import { validate, errors } from 'com'
import bcrypt from 'bcryptjs';

const { DuplicityError, SystemError } = errors

export const registerUser = (name, email, username, password) => {
    validate.name(name, 'name');
    validate.email(email, 'email');
    validate.username(username, 'username');
    validate.password(password, 'password');

    return data.users.findOne({ $or: [{ email }, { username }] })
        .catch(error => { throw new SystemError(error.message) })
        .then(found => {
            if (found) throw new DuplicityError('user already exists')

            return bcrypt.hash(password, 10)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(hash => {
            const user = {
                name: name,
                email: email,
                username: username,
                password: hash,
                createdAt: new Date(),
                modifiedAt: null
            };

            return data.users.insertOne(user)
                .catch(error => {
                    if (error.code === 11000) throw new DuplicityError('user already exists')
                    throw new SystemError(error.message)
                })
        })
        .then(() => { })
};
