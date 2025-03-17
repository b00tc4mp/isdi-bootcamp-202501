import { data } from '../data/index.js'
import { validate } from './validate.js'

import { NotFoundError } from '../errors.js'

export const getUserName = userId => {
    validate.id(userId, 'userId')

    const found = data.users.getById(userId)

    if (!found) throw new NotFoundError('user not found')

    return found.name
}