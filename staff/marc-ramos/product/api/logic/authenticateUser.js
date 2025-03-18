import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { CredentialsError, NotFoundError } = errors

export const authenticateUser = (username, password) => {
    validate.username(username, 'username')
    validate.password(password, 'password')

    const found = data.users.findOne(user => user.username === username)

    if(!found) throw new NotFoundError('user not found')

    if (found.password !== password) throw new CredentialsError('wrong credentials')

    return found.id
}