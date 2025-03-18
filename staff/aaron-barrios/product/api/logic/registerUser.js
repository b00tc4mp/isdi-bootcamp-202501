import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { DuplicityError } = errors

export const registerUser = (name, email, username, password) => {
    validate.text(name, 'name')
    validate.minLength(name, 1, 'name')
    validate.maxLength(name, 20, 'name')
    validate.email(email, 'email')
    validate.username(username, 'username')
    validate.password(password, 'password')

    const found = data.users.findOne(
        user => user.email === email ||
            user.username === username)

    if (found) throw new DuplicityError('User already exists')

    const user = {
        name: name,
        email: email,
        username: username,
        password: password,
        createdAt: new Date(),
        modifiedAt: null,
    }

    data.users.insertOne(user)
}