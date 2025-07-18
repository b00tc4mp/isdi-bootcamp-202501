import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { NotFoundError } = errors

export const getUserName = userId => {
    validate.id(userId, 'userId')

    const found = data.users.getById(userId)

    if (!found) throw new NotFoundError('user not found')

    return found.name
}