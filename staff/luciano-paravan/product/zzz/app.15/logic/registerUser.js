import { DuplicityError } from '../errors.js'

import { data } from '../data/index.js'
import { validate } from './validate.js'

export const registerUser = (name, surname, email, username, password) => {
    validate.text(name, 'name')
    validate.maxLength(name, 20, 'name')
    validate.minLength(name, 1, 'name')
    validate.text(surname, 'surname')
    validate.maxLength(surname, 20, 'surname')
    validate.minLength(surname, 1, 'surname')
    validate.email(email, 'email')
    validate.username(username, 'username')
    validate.password(password, 'password')

    const found = data.users.findOne(user => user.username === username || user.email === email)

    if (found) throw new DuplicityError('user already exists')

    const user = {
        name: name,
        surname: surname,
        email: email,
        username: username,
        password: password,
        createdAt: new Date(),
        modifiedAt: null,
        savedPosts: []
    }

    data.users.insertOne(user)
}