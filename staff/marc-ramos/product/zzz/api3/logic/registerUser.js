import { data } from '../data/index.js'
import { validate } from './validate.js'

import { DuplicityError } from '../errors.js'

 // traemos los inputs y los validamos
 export const registerUser = (name, email, username, password) => {
    validate.text(name, 'name')
    validate.minLength(name, 1, 'name')
    validate.maxLength(name, 20, 'name')
    validate.email(email, 'email')
    validate.username(username, 'username')
    validate.password(password, 'password')

    // nos aseguramos de que no se haya insertado un email o username igual
    const found = data.users.findOne(user => user.email === email || user.username === username)

    if (found) throw new DuplicityError('user already exists')

    const user = {
        name: name,
        email: email,
        username: username,
        password: password,
        createdAt: new Date(),
        modifiedAt: null
    }

    // lo insertamos en data.users
    data.users.insertOne(user)   
}