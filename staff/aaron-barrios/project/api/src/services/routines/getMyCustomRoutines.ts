import { User, CustomRoutine } from "../../data"
import { validate, errors } from "com"
import { CustomRoutineType } from "../../data/types"

const { SystemError, NotFoundError } = errors

const getMyCustomRoutines = (
    userId: string,
    originalRoutineId?: string
): Promise<CustomRoutineType[]> => {
    validate.id(userId)
    if (originalRoutineId)
        validate.id(originalRoutineId)

    return Promise.all([
        User.findById(userId).lean(),
        CustomRoutine.find({ userId })
            .select("-__v")
            .sort("-createdAt")
            .lean()
    ])
        .catch(error => {
            throw new SystemError(error.message)
        })
        .then(([user, customRoutines]) => {
            if (!user) throw new NotFoundError("User not found!")

            const sanitizedRoutines = customRoutines.map<CustomRoutineType>(customRoutine => {
                return {
                    id: customRoutine._id.toString(),
                    userId: customRoutine.userId,
                    originalRoutineId: customRoutine.originalRoutineId,
                    name: customRoutine.name,
                    muscleGroup: customRoutine.muscleGroup,
                    feedImage: customRoutine.feedImage,
                    description: customRoutine.description,
                    duration: customRoutine.duration,
                    createdAt: customRoutine.createdAt,
                    modifiedAt: customRoutine.modifiedAt || undefined,
                    author: {
                        id: customRoutine.userId.toString(),
                        alias: "you"
                    },
                    workouts: (customRoutine.workouts || []).map(routineWorkout => ({
                        workoutId: routineWorkout.workoutId,
                        order: routineWorkout.order,
                        sets: routineWorkout.sets,
                        reps: routineWorkout.reps,
                        weight: routineWorkout.weight,
                        restTime: routineWorkout.restTime,
                        time: routineWorkout.time
                    }))
                }
            })

            return sanitizedRoutines
        })
}

export default getMyCustomRoutines