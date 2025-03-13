import { CredentialsError } from '../errors.js'

import { data } from '../data/index.js'
import { validate } from './validate.js'

export const loginUser = (username, password) => {
    validate.username(username, 'username')
    validate.password(password, 'password')

    const found = data.users.findOne(user => user.username === username)

    if (!found || password !== found.password) throw new CredentialsError('wrong credentials')

    data.userId = found.id
}