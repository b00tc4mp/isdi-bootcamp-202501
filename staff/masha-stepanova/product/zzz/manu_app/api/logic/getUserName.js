import { data } from '../data/index.js'
import { errors, validate } from 'com'

import { NotFoundError } from '../errors.js'

export const getUserName = userId => {
    validate.id(userId, 'userId')

    const user = data.users.getById(userId)

    if (!user) throw new NotFoundError('user not found')

    return user.name
}