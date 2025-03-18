/*

import { data } from "../data"
import { NotFoundError, CredentialsError } from "../errors"
import { validate } from "./validate"


export const changePassword = (actualPassword, newPassword) => {
    validate.password(actualPassword)
    validate.password(newPassword)

    const { userId } = data

    const users = data.users.getAll()

    const user = data.users.getById(userId)

    if (!user) throw new NotFoundError('User not found')

    const correctActualPassword = (user.password === actualPassword ? true : false)

    if (!correctActualPassword) throw new CredentialsError('Wrong password')

    const equalPasswords = (actualPassword === newPassword ? true : false)

    if (equalPasswords) throw new Error('Equal passwords')

    user.password = newPassword
    user.modifiedAt = new Date()

    data.users.updateOne(user)

}

*/