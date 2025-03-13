import { data } from '../data/index.js'

import { NotFoundError } from '../errors.js'

export const getUsername = userId => {
    const user = data.users.getById(userId)

    if (!user) throw new NotFoundError('user not found')

    return user.name
}