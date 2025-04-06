import { data } from '../data/index.js'

import { NotFoundError } from '../errors.js'

export const getCurrentUser = () => {
    const onlineUserId = sessionStorage.userId

    const onlineUser = data.users.getById(onlineUserId)

    if (!user) throw new NotFoundError('user not found')

    console.log(onlineUser)

    return onlineUser
}