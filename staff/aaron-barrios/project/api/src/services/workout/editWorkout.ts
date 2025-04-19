import { Workout, User } from "../../data"
import { validate, errors } from "com"
import { EditWorkoutType } from "com/types"

const { NotFoundError, OwnershipError, StatusError, SystemError } = errors

const editWorkout = (
    userId: string,
    workoutId: string,
    updates: EditWorkoutType
): Promise<void> => {
    validate.id(userId)
    validate.id(workoutId)

    if (updates.name) validate.name(updates.name)
    if (updates.muscleGroup) validate.text(updates.muscleGroup)
    if (updates.type) validate.text(updates.type)
    if (updates.difficulty) validate.text(updates.difficulty)
    if (updates.description) validate.text(updates.description)
    if (updates.images) {
        if (!Array.isArray(updates.images)) throw new TypeError("Images must be an array of strings")
        updates.images.forEach(img => validate.url(img))
    }

    return Promise.all([
        User.findById(userId),
        Workout.findById(workoutId),
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, workout]) => {
            if (!user) throw new NotFoundError("User not found!")
            if (!workout) throw new NotFoundError("Workout not found!")

            if (workout.author.toString() !== userId)
                throw new OwnershipError("You are not the owner of this workout.")

            if (workout.status !== "pending")
                throw new StatusError("Only pending workouts can be edited.")

            Object.assign(workout, updates)

            //asigno las propiedades correctamente al documento workout 
            //para luego al guardarlo (save) que persistan los cambios

            return workout.save()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}

export default editWorkout
