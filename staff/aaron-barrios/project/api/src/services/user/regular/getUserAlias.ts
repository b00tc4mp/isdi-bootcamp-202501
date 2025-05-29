import { User } from "../../../data"
import { errors, validate } from "com"

const { NotFoundError, SystemError } = errors

const getUserAlias = (
    userId: string
): Promise<{ alias: string }> => {
    validate.id(userId)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found!')

            return {
                alias: user.alias,
            }
        })
}

export default getUserAlias