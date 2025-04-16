// ✅ API: updateUserData.ts
import { User } from "../../../data"
import { errors, validate } from "com"
import { UserDocType } from "../../../data/types"

const { NotFoundError, SystemError } = errors

/**
 * Actualiza los datos de un usuario existente.
 * Solo se pueden modificar: name, lastName, level, interests.
 */
const updateUserData = (
    userId: string,
    update: Partial<Omit<UserDocType, "_id" | "password" | "__v">>
    //=> ponemos partial y omit porque habra veces que solo se rellene un campo o todos etc
): Promise<void> => {
    validate.id(userId)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError("User not found")
        })
        .then(() => {
            return User.findByIdAndUpdate(userId, update)
                .catch(error => { throw new SystemError(error.message) })
                .then(() => { })
        })
}

export default updateUserData
