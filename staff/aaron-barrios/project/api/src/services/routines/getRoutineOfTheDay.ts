import { CustomRoutine, Routine, User } from "../../data"
import { RoutineType } from "com/types"
import { validate, errors } from "com"

const { SystemError, NotFoundError } = errors

const getRoutineOfTheDay = (
    userId: string
): Promise<RoutineType | null> => {
    validate.id(userId)

    return Promise.all([
        User.findById(userId).lean(),
        Routine.find({ status: "accepted" })
            .select("-__v")
            .populate("workouts.workout")
            .lean(),
        CustomRoutine.find({ userId })
            .select("_id")
            .lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, routines, customRoutines]) => {
            if (!user) throw new NotFoundError("User not found!")

            const userSavedRoutines = (user.routines || []).map(id => id.toString())
            const userCustomRoutines = customRoutines.map(r => r._id.toString())

            const excludedRoutines = [...userSavedRoutines, ...userCustomRoutines]

            const availableRoutines = routines.filter(
                routine => !excludedRoutines.includes(routine._id.toString())
            )

            if (availableRoutines.length === 0) return null

            const randomRoutine = availableRoutines[Math.floor(Math.random() * availableRoutines.length)]

            const routine: RoutineType = {
                id: randomRoutine._id.toString(),
                name: randomRoutine.name,
                description: randomRoutine.description,
                muscleGroup: randomRoutine.muscleGroup as RoutineType["muscleGroup"],
                feedImage: randomRoutine.feedImage,
                createdAt: randomRoutine.createdAt,
                modifiedAt: randomRoutine.modifiedAt || undefined,
                difficulty: randomRoutine.difficulty,
                duration: randomRoutine.duration,
                status: randomRoutine.status,
                likesCount: (randomRoutine.likes ?? []).length,
                savesCount: (randomRoutine.saves ?? []).length,
                author: {
                    id: randomRoutine.author?.toString() || "",
                    alias: "anonymous",
                },
                likedByMe: Array.isArray(randomRoutine.likes) && randomRoutine.likes.some(id => id.toString() === userId),
                savedByMe: Array.isArray(randomRoutine.saves) && randomRoutine.saves.some(id => id.toString() === userId),
                workouts: (randomRoutine.workouts || []).map(routineWorkout => {
                    const workout = routineWorkout.workout as any

                    return {
                        workout: {
                            id: workout?._id?.toString() || "",
                            name: workout?.name || "Unknown",
                            muscleGroup: workout?.muscleGroup || "chest",
                            feedImage: workout?.feedImage || "",
                            description: workout?.description || "",
                            type: workout?.type || "strength",
                            difficulty: workout?.difficulty || "easy",
                            status: workout?.status || "accepted",
                            createdAt: workout?.createdAt || new Date(),
                            author: {
                                id: workout?.author?._id?.toString() || "",
                                alias: workout?.author?.alias || ""
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

            return routine
        })
}

export default getRoutineOfTheDay