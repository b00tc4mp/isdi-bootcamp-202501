/*
import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { CredentialsError, NotFoundError } = errors

export const changePassword = (userId, actualPassword, newPassword) => {
    validate.id(userId, 'userId')
    validate.password(actualPassword, 'actualPassword')
    validate.password(newPassword, 'newPassword')

    const user = data.users.getById(userId)

    if (!user) throw new NotFoundError('user not found')

    if (actualPassword !== user.password) throw new CredentialsError('wrong password')

    if (newPassword === user.password) {
        return false
    }

    user.password = newPassword
    
    data.users.updateOne(user => user.id === userId, user)
}
*/