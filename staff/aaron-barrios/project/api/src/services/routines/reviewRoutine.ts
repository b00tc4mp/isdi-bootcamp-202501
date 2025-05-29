import { User, Routine } from "../../data"
import { errors, validate } from "com"

const { NotFoundError, SystemError, AuthorizationError, ValidationError } = errors

const reviewRoutine = (
    userId: string,
    routineId: string,
    newStatus: "accepted" | "declined"
): Promise<void> => {
    validate.id(userId)
    validate.id(routineId)

    if (newStatus !== "accepted" && newStatus !== "declined")
        throw new ValidationError("Invalid status")

    return Promise.all([
        User.findById(userId),
        Routine.findById(routineId),
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, Routine]) => {
            if (!user) throw new NotFoundError("User not found!")
            if (!Routine) throw new NotFoundError("Routine not found!")
            if (user.role !== "mod") throw new AuthorizationError("Only moderators can review Routines")

            if (newStatus === "declined") {
                return Routine.deleteOne({ _id: routineId })
                    .catch(error => { throw new SystemError(error.message) })
                    .then(() => { })
            }

            if (newStatus === "accepted") {
                Routine.status = "accepted"
                return Routine.save()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(() => { })
            }

            throw new ValidationError("Invalid status")
        })
}

export default reviewRoutine