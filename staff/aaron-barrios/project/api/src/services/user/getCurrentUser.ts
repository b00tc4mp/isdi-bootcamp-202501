import { User } from "../../data"
import { errors, validate } from "com"

const { NotFoundError, SystemError } = errors

const getCurrentUser = (
    userId: string
): Promise<{
    id: string
    alias: string
    email: string
    password: string
    role: string
    name?: string
    lastName?: string
    level?: string
    interests?: string[]
    createdAt: Date
    modifiedAt: Date | null
}> => {
    validate.id(userId)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError("User not found!")

            return {
                id: user._id.toString(),
                alias: user.alias,
                email: user.email,
                password: user.password,
                role: user.role,
                createdAt: user.createdAt,
                modifiedAt: user.modifiedAt ?? null,
                ...(user.name && { name: user.name }),
                ...(user.lastName && { lastName: user.lastName }),
                ...(user.level && { level: user.level }),
                ...(user.interests && { interests: user.interests }),
            }
        })
}

export default getCurrentUser
