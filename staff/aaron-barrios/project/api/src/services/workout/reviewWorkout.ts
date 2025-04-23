import { User, Workout } from "../../data"
import { errors, validate } from "com"

const { NotFoundError, SystemError, AuthorizationError, ValidationError } = errors

const reviewWorkout = (
    userId: string,
    workoutId: string,
    newStatus: "accepted" | "declined"  // ✅ solo lo que realmente necesitas
): Promise<void> => {
    validate.id(userId)
    validate.id(workoutId)

    if (newStatus !== "accepted" && newStatus !== "declined")
        throw new ValidationError("Invalid status")

    return Promise.all([
        User.findById(userId),
        Workout.findById(workoutId),
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, workout]) => {
            if (!user) throw new NotFoundError("User not found!")
            if (!workout) throw new NotFoundError("Workout not found!")
            if (user.role !== "mod") throw new AuthorizationError("Only moderators can review workouts")

            if (newStatus === "declined") {
                return Workout.deleteOne({ _id: workoutId })
                    .catch(error => { throw new SystemError(error.message) })
                    .then(() => { })
            }

            if (newStatus === "accepted") {
                workout.status = "accepted"
                return workout.save()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(() => { })
            }

            throw new ValidationError("Invalid status")
        })
}

export default reviewWorkout