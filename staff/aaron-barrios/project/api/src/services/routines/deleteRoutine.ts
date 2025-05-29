import { User, Routine } from "../../data/"
import { errors, validate } from "com"

const { SystemError, NotFoundError, OwnershipError } = errors

const deleteRoutine = (
    userId: string,
    routineId: string
) => {
    validate.id(userId)
    validate.id(routineId)

    return Promise.all([
        User.findById(userId),
        Routine.findById(routineId),
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, routine]) => {
            if (!user) throw new NotFoundError("User not found!")
            if (!routine) throw new NotFoundError("Routine not found!")

            if (routine.author.toString() !== userId) {
                throw new OwnershipError("User is not author of routine")
            }

            //redundant => controlled in front
            if (routine.status !== "pending") {
                throw new OwnershipError("Only routines with pending status can be deleted")
            }

            return Routine.deleteOne({ _id: routineId })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}

export default deleteRoutine