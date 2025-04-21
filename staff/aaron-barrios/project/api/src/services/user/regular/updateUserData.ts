import { User } from "../../../data"
import { errors, validate } from "com"
import { UserDocType } from "../../../data/types"

const { NotFoundError, SystemError } = errors

const updateUserData = (
    userId: string,
    update: Partial<Omit<UserDocType, "_id" | "password" | "__v">>
): Promise<void> => {
    validate.id(userId)

    return User.findByIdAndUpdate(userId, update, {
        runValidators: true,
        new: true
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError("User not found")

            console.log("✅ User updated in Mongo:", user)
        })

}


export default updateUserData