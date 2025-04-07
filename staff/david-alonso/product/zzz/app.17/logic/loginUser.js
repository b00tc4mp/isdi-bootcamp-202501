import { data } from '../data/index.js'

import { validate } from './validate.js'

import { CredentialsError } from '../errors.js'

// Funcion para Iniciar sesion
export const loginUser = (username, password) => {
    validate.username(username, 'username')
    validate.password(password, 'password')

    // Buscamos un único elemento en la Colección
    // Buscamos que coincida el UserName
    const found = data.users.findOne(user => user.username === username)

    if (!found || found.password !== password) throw new CredentialsError('wrong credentials')

    data.userId = found.id
}