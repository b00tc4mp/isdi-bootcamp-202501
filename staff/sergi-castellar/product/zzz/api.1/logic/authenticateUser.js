import { data } from '../data/index.js'
import { CredentialsError, NotFoundError } from '../errors.js'
import { validate } from "./validate.js"

export const authenticateUser = (username, password) => {
    validate.username(username, 'username')
    validate.password(password, 'password')

    const userFound = data.users.findOne(user => user.username === username)

    if (!userFound) throw new NotFoundError('user not found')
    if (userFound.password !== password) throw new CredentialsError('wrong password')

    return userFound.id
}
