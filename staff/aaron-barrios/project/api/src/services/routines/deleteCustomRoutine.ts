import { User, CustomRoutine } from "../../data/"
import { errors, validate } from "com"

const { SystemError, NotFoundError, OwnershipError } = errors

const deleteCustomRoutine = (
    userId: string,
    routineId: string
) => {
    validate.id(userId)
    validate.id(routineId)

    return Promise.all([
        User.findById(userId),
        CustomRoutine.findById(routineId),
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, customRoutine]) => {
            if (!user) throw new NotFoundError("User not found!")
            if (!customRoutine) throw new NotFoundError("Routine not found!")

            if (customRoutine.userId.toString() !== userId) {
                throw new OwnershipError("User is not author of routine")
            }

            console.log("userId:", userId)
            console.log("customRoutine.userId:", customRoutine.userId)

            return CustomRoutine.deleteOne({ _id: routineId })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}

export default deleteCustomRoutine