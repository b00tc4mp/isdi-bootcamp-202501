import { data } from '../data/index.js'

import { NotFoundError } from '../errors.js'

export const getUserName = () => {
    const users = data.users.getAll()
    // const users = data.users
    // const userId = data.userId, refactorizamos en la linea de abajo
    const {userId} = data

    const found = data.users.getById(userId)

    if (!found) throw new NotFoundError('user not found')

    return found.name
}