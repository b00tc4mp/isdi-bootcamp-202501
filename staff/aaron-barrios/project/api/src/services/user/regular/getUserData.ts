//ME TRAIGO EL ALIAS Y EL LEVEL PARA LUEGO MOSTRARLOS EN FRONT 
// EL ROLE VA EN EL AUTHENTICATE CON EL TOKEN 

import { User } from "../../../data"
import { errors, validate } from "com"

const { NotFoundError, SystemError } = errors

const getUserData = (
    userId: string
): Promise<{ alias: string, level: string }> => {
    validate.id(userId)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found!')

            return {
                alias: user.alias,
                level: user.level ?? "beginner" // => Provides a default value for undefined
            }
        })
}

export default getUserData