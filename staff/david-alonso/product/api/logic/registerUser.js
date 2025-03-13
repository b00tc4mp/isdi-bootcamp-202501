// REGISTRAR USUARIO 

import { data } from '../data/index.js'
import { validate } from './validate.js'

import { DuplicityError } from '../errors.js'


// Funcion para Registrar al usuario
export const registerUser = (name, email, username, password) => {
    validate.text(name, 'name')
    validate.maxLength(name, 30, 'name')
    validate.email(email, 'email')
    validate.username(username, 'username')
    validate.password(password, 'password')

    // ****
    const found = data.users.findOne(user => user.email === email || user.username === username)

    if (found) throw new DuplicityError('user already exists')

    const user = {
        name: name,
        email: email,
        username: username,
        password: password,
        createdAt: new Date().toLocaleString(),
        modifiedAt: null
    }

    // ****
    data.users.insertOne(user)
}