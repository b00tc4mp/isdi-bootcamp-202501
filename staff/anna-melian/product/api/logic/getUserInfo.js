import { data } from '../data/index.js'
import { validate } from './validate.js'

import { NotFoundError } from '../errors.js'

export const getUserInfo = userId => {
    validate.id(userId, 'userId')

    const user = data.users.getById(userId)

    if (!user) throw new NotFoundError('user not found')

    const userInfo = {
        name: user.name,
        username: user.username,
        email: user.email,
    }

    return userInfo
}