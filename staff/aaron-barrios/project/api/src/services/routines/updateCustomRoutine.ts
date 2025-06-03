import { CustomRoutine, User } from "../../data"
import { validate, errors } from "com"
import { CustomRoutineType } from "com/types"
import { Types } from "mongoose"

const { NotFoundError, OwnershipError, SystemError, ValidationError } = errors

const updateCustomRoutine = (
    userId: string,
    routineId: string,
    updates: Partial<CustomRoutineType>
): Promise<void> => {
    validate.id(userId)
    validate.id(routineId)

    return Promise.all([
        User.findById(userId),
        CustomRoutine.findById(routineId),
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, routine]) => {
            if (!user) throw new NotFoundError("User not found!")
            if (!routine) throw new NotFoundError("Routine not found!")

            if (routine.userId.toString() !== userId)
                throw new OwnershipError("You are not the owner of this routine!")

            // Solo permitimos actualizar workouts en esta lógica
            if (updates.workouts) {
                routine.workouts = updates.workouts.map(routineWorkout => ({
                    workoutId: new Types.ObjectId(routineWorkout.workoutId),
                    sets: routineWorkout.sets,
                    reps: routineWorkout.reps,
                    weight: routineWorkout.weight,
                    restTime: routineWorkout.restTime,
                    order: routineWorkout.order,
                    time: routineWorkout.time ?? 0
                }))
            }

            routine.modifiedAt = new Date()

            return routine.save()
                .catch(error => {
                    if (error.name === "ValidationError") {
                        throw new ValidationError(error.message)
                    }
                    throw new SystemError(error.message)
                })
        })
        .then(() => { })
}

export default updateCustomRoutine