import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { NotFoundError } = errors

export const getUsername = userId => {
    const user = data.users.getById(userId)

    if (!user) throw new NotFoundError('user not found')

    return user.name
}