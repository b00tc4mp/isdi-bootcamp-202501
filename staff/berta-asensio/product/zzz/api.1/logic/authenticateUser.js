// AuthenticateUser = loginUser en app

import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { NotFoundError, CredentialsError } = errors

export const authenticateUser = (username, password) => {
        validate.username(username, 'username')
        validate.password(password, 'password')

       const found = data.users.findOne(user => user.username === username)

        //mandamos este error si el usuario no existe
        if(!found) throw new NotFoundError('user not found')

        //si las credenciales estan mal introducidas mandamos este error
        if(found.password !== password) throw new CredentialsError('wrong credentials')

        return found.id // aqui en la api debemos devolver que se encuentra, que se autentica bien
}
