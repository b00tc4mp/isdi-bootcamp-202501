import { data } from '../data/index.js'

import { validate } from './validate.js'

import { CredentialsError, NotFoundError } from '../errors.js'

// Funcion para Iniciar sesion
export const authenticateUser = (username, password) => {
    validate.username(username, 'username')
    validate.password(password, 'password')

    // Buscamos un único elemento en la Colección
    // Buscamos que coincida el UserName
    const found = data.users.findOne(user => user.username === username)

    if (!found) throw new NotFoundError('user not found')

    if (!found || found.password !== password) throw new CredentialsError('wrong credentials')

    return found.id
}