import { Routine, User, CustomRoutine } from "../../data"
import { validate, errors } from "com"

const { NotFoundError, SystemError, DuplicityError } = errors

const saveCustomRoutine = (
    userId: string,
    routineId: string
): Promise<void> => {
    validate.id(userId)
    validate.id(routineId)

    return Promise.all([
        User.findById(userId),
        Routine.findById(routineId),
        CustomRoutine.findOne({ userId, originalRoutineId: routineId })
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, routine, existingCustomRoutine]) => {
            if (!user) throw new NotFoundError("User not found!")
            if (!routine) throw new NotFoundError("Routine not found!")

            if (existingCustomRoutine) {
                throw new DuplicityError("You already have customized this routine")
            }

            const newCustomRoutine = new CustomRoutine({
                userId: userId,
                originalRoutineId: routineId,
                name: routine.name,
                muscleGroup: routine.muscleGroup,
                feedImage: routine.feedImage,
                description: routine.description,
                duration: routine.duration,
                author: routine.author,
                workouts: routine.workouts.map(workout => ({
                    workoutId: workout.workout,
                    order: workout.order,
                    sets: workout.sets,
                    reps: workout.reps,
                    weight: workout.weight,
                    restTime: workout.restTime,
                    time: workout.time,
                })),
                createdAt: new Date(),
                modifiedAt: new Date(),
            })

            return newCustomRoutine.save()
        })
        .catch(error => {
            if (error instanceof NotFoundError)
                throw error
            throw new SystemError(error.message)
        })
        .then(() => { })
}

export default saveCustomRoutine