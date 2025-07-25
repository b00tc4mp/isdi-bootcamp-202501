import { data } from '../data/index.js'

import { NotFoundError } from '../errors.js'

export const getUserName = () => {
    const users = data.users.getAll()

    const { userId } = data

    const found = data.users.getById(userId)

    if (!found) throw new NotFoundError('user not found')

    return found.name
}