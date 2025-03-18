/*

import { data } from "../data"
import { NotFoundError } from "../errors"

import { validate } from "./validate"



export const updateUserProfile = (name, username, email) => {
    validate.text(name, 'name')
    validate.username(username, 'username')
    validate.email(email, 'email')

    const { userId } = data

    const users = data.users.getAll()

    const user = data.users.getById(userId)

    if (!user) throw new NotFoundError('User not found')

    if (user.name === name && user.username === username && user.email === email) {
        return false
    }

    user.name = name
    user.username = username
    user.email = email
    user.modifiedAt = new Date()

    data.users.updateOne(user)

    return true

}

*/




