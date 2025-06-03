import bcrypt from "bcryptjs"
import { User } from "../../../data"
import { validate, errors } from "com"

const { NotFoundError, SystemError, ValidationError } = errors

const changePassword = (
    userId: string,
    currentPassword: string,
    newPassword: string
): Promise<void> => {
    validate.id(userId)
    validate.password(currentPassword)
    validate.password(newPassword)

    if (currentPassword === newPassword)
        throw new ValidationError("New password should not be equal as current password...")

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError("User not found!")

            return bcrypt.compare(currentPassword, user.password!)
                .then(isMatch => {
                    if (!isMatch) throw new ValidationError("Current password is incorrect")

                    return bcrypt.hash(newPassword, 10)
                        .then(hashed => {
                            user.password = hashed
                            return user.save().catch(error => {
                                throw new SystemError("Failed to save new password: " + error.message)
                            })
                        })
                })
        })
        .then(() => { })
}

export default changePassword