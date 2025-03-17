import { data } from '../data/index.js'
import { validate } from '../../app/logic/validate.js'

import { DuplicityError } from '../../app/errors.js'

export const registerUser = (name, email, username, house, password) => {

    validate.text(name, 'name')
    validate.minLength(name, 1, 'name')
    validate.maxLength(name, 20, 'name')
    validate.email(email, 'email')
    validate.username(username, 'username')
    validate.password(password, 'password')
    //TODO validate house

    const found = data.users.findOne(user => user.email === email || user.username === username)

    if (found) throw new DuplicityError('user already exists')

    const user = {
        name: name,
        email: email,
        username, username,
        house: house,
        password: password,
        createdAt: new Date(),
        modifiedAt: null
    }

    data.users.insertOne(user)


}