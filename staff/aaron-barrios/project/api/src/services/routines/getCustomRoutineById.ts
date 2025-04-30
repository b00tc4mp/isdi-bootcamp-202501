import { CustomRoutine, User } from "../../data"
import { validate, errors } from "com"
import { CustomRoutineType } from "com/types"

const { SystemError, NotFoundError } = errors

const getCustomRoutineById = (
    routineId: string,
    userId?: string
): Promise<CustomRoutineType> => {
    validate.id(routineId)
    if (userId) validate.id(userId)

    return Promise.all([
        userId ? User.findById(userId).lean() : Promise.resolve(null),
        CustomRoutine.findById(routineId)
            .select("-__v")
            .populate("workouts.workoutId")
            .lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, routine]) => {
            if (!routine) throw new NotFoundError("custom routine not found")

            const customRoutine: CustomRoutineType = {
                id: routine._id.toString(),
                originalRoutineId: routine.originalRoutineId.toString(),
                name: routine.name,
                description: routine.description,
                muscleGroup: routine.muscleGroup as CustomRoutineType["muscleGroup"],
                feedImage: routine.feedImage,
                duration: routine.duration,
                createdAt: routine.createdAt,
                modifiedAt: routine.modifiedAt || undefined,
                author: {
                    id: routine.userId.toString(),
                    alias: user?.alias || "you"
                },
                workouts: (routine.workouts || []).map(routineWorkout => {
                    const workout = routineWorkout.workoutId as any

                    return {
                        workoutId: workout?._id?.toString() || routineWorkout.workoutId.toString(),
                        workout: {
                            id: workout?._id?.toString() || routineWorkout.workoutId.toString(),
                            name: workout?.name || "Unknown workout",
                            feedImage: workout?.feedImage || "",
                            muscleGroup: workout?.muscleGroup || "chest",
                            description: workout?.description || "",
                            difficulty: workout?.difficulty || "easy",
                            type: workout?.type || "strength",
                            status: workout?.status || "accepted",
                            createdAt: workout?.createdAt || new Date(),
                            author: {
                                id: workout?.author?._id?.toString() || "unknown",
                                alias: workout?.author?.alias || "unknown"
                            },
                            likesCount: Array.isArray(workout?.likes) ? workout.likes.length : 0,
                            savesCount: Array.isArray(workout?.saves) ? workout.saves.length : 0
                        },
                        order: routineWorkout.order || 0,
                        sets: routineWorkout.sets || 0,
                        reps: routineWorkout.reps || 0,
                        weight: routineWorkout.weight || 0,
                        restTime: routineWorkout.restTime || 0,
                        time: routineWorkout.time || 0
                    }
                })
            }

            return customRoutine
        })
}

export default getCustomRoutineById