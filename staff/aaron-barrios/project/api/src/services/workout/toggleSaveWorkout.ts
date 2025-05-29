import { User, Workout } from "../../data"
import { errors, validate } from "com"
import { Types } from "mongoose"

const { SystemError, NotFoundError, AuthorizationError } = errors
const { ObjectId } = Types

const toggleSaveWorkout = (
    userId: string,
    workoutId: string
): Promise<void> => {
    validate.id(userId)
    validate.id(workoutId)

    return Promise.all([
        User.findById(userId).lean(),
        Workout.findById(workoutId)
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, workout]) => {
            if (!user) throw new NotFoundError("User not found!")
            if (!workout) throw new NotFoundError("Workout not found!")

            if (workout.status !== "accepted") {
                throw new AuthorizationError("Workout not available for interactions.")
            }

            const userObjectId = new ObjectId(userId)

            const alreadySaved = workout.saves?.some(id => id.equals(userObjectId)) ?? false

            workout.saves = alreadySaved
                ? workout.saves!.filter(id => !id.equals(userObjectId))
                : [...(workout.saves || []), userObjectId]

            return workout.save()
                .catch(error => { throw new SystemError(error.message) })
                .then(() => { })
        })
}

export default toggleSaveWorkout