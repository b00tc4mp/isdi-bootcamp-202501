import { User, Routine } from "../../data"
import { errors, validate } from "com"
import { Types } from "mongoose"

const { SystemError, NotFoundError, AuthorizationError } = errors
const { ObjectId } = Types

const toggleSaveRoutine = (
    userId: string,
    routineId: string
): Promise<void> => {
    validate.id(userId)
    validate.id(routineId)

    return Promise.all([
        User.findById(userId).lean(),
        Routine.findById(routineId)
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, routine]) => {
            if (!user) throw new NotFoundError("User not found!")
            if (!routine) throw new NotFoundError("Routine not found!")

            if (routine.status !== "accepted") {
                throw new AuthorizationError("Routine not available for interactions.")
            }

            const userObjectId = new ObjectId(userId)

            const alreadySaved = routine.saves?.some(id => id.equals(userObjectId)) ?? false

            routine.saves = alreadySaved
                ? routine.saves!.filter(id => !id.equals(userObjectId))
                : [...(routine.saves || []), userObjectId]

            return routine.save()
                .catch(error => { throw new SystemError(error.message) })
                .then(() => { })
        })
}

export default toggleSaveRoutine