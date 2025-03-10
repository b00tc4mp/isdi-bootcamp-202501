import { NotFoundError } from "../errors"
import { data } from "../data"

export const getUserHouse = () => {
    const users = data.users.getAll()

    const { userId } = data

    const found = data.users.getById(userId)

    if (!found) throw new NotFoundError('user not found')

    return found.house

}