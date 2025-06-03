import { User } from "../../../data"
import { errors, validate } from "com"
import { UserType } from "com/types"

const { NotFoundError, SystemError } = errors

const getTargetUserData = (
    targetUserId: string
): Promise<Omit<UserType, "id" | "createdAt" | "interests" | "workouts" | "routines" | "password">> => {
    validate.id(targetUserId)

    return User.findById(targetUserId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError("User not found")

            return {
                name: user.name || "",
                lastName: user.lastName || "",
                alias: user.alias,
                email: user.email || "",
                level: user.level || undefined
            }
        })
}

export default getTargetUserData