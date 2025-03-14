import { data } from '../data/index.js'
import { validate } from './validate.js'

import { CredentialsError, NotFoundError } from '../errors.js'

export const authenticateUser = (username, password) => {
    validate.username(username, 'name')
    validate.password(password, 'password')

    const found = data.users.findOne(user => user.username === username)

    if (!found) throw new NotFoundError('User not found!')

    if (found.password !== password) throw new CredentialsError('Wrong credentials')

    return found.id
}
