import { User, Routine } from "../../data"
import { validate, errors } from "com"
import { RoutineType } from "com/types"

const { NotFoundError, SystemError } = errors

const getModeratorRoutines = (
    userId: string
): Promise<{ routines: RoutineType[] }> => {
    validate.id(userId)

    //--- WARNING ---
    //¡¡ESPECIFICAR QUE SOLO TRAIGA LOS EJERCICIOS CON STATE PENDING!!!

    return Promise.all([
        User.findById(userId).lean(),
        Routine.find({ status: 'pending' })
            .select('-__v')
            .sort('-createdAt')
            .populate('author', 'alias level')
            .populate("workouts.workout")
            .lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, routines]) => {
            if (!user) throw new NotFoundError('User not found!')

            const sanitizedRoutines = routines.map<RoutineType>(routine => {
                const author = routine.author as unknown as { _id: any; alias: string }

                return {
                    id: routine._id.toString(),
                    name: routine.name,
                    muscleGroup: routine.muscleGroup as RoutineType["muscleGroup"],
                    feedImage: routine.feedImage,
                    difficulty: routine.difficulty,
                    description: routine.description,
                    status: routine.status,
                    createdAt: routine.createdAt,
                    modifiedAt: routine.modifiedAt || undefined,
                    duration: routine.duration,
                    author: {
                        id: author._id.toString(),
                        alias: author.alias
                    },
                    likesCount: (routine.likes ?? []).length,
                    savesCount: (routine.saves ?? []).length,
                    likedByMe: Array.isArray(routine.likes) && routine.likes.some(id => id.toString() === userId),
                    savedByMe: Array.isArray(routine.saves) && routine.saves.some(id => id.toString() === userId),
                    workouts: (routine.workouts || []).map(routineWorkout => {
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
            })

            return { routines: sanitizedRoutines }
        })
}

export default getModeratorRoutines