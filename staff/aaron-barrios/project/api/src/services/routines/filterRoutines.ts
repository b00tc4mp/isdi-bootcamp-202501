import { User, Routine } from "../../data"
import { errors, validate } from "com"
import { RoutineType } from "com/types"

const { NotFoundError, SystemError } = errors

const muscleGroups = [
    "chest",
    "back",
    "biceps",
    "triceps",
    "shoulders",
    "legs",
    "buttocks",
] as const

const filterRoutines = (
    userId: string,
    filter: "popular" | "saved" | "recent",
    muscleGroup?: string
): Promise<RoutineType[]> => {
    validate.id(userId)

    if (muscleGroup) validate.string(muscleGroup)

    return Promise.all([
        User.findById(userId).lean(),
        Routine.find({ status: "accepted" })
            .select("-__v")
            .populate("author", "alias role")
            .populate("workouts.workout")
            .lean(),
    ])
        .catch((error) => { throw new SystemError(error.message) })
        .then(([user, routines]) => {
            if (!user) throw new NotFoundError("User not found!")

            let filtered = muscleGroup
                ? routines.filter(
                    (routine) =>
                        routine.muscleGroup.toLowerCase() === muscleGroup.toLowerCase()
                )
                : routines

            if (filter === "popular") {
                filtered.sort(
                    (a, b) => (b.likes?.length || 0) - (a.likes?.length || 0)
                )
            } else if (filter === "saved") {
                filtered.sort(
                    (a, b) => (b.saves?.length || 0) - (a.saves?.length || 0)
                )
            } else if (filter === "recent") {
                filtered.sort(
                    (a, b) =>
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                )
            }

            const sanitizedRoutines = filtered.map((routine): RoutineType => {
                const author = routine.author as unknown as { _id: any, alias: string, role?: string }

                const safeMuscleGroup = muscleGroups.includes(
                    routine.muscleGroup as any
                )
                    ? (routine.muscleGroup as RoutineType["muscleGroup"])
                    : "chest"

                return {
                    id: routine._id.toString(),
                    name: routine.name,
                    muscleGroup: safeMuscleGroup,
                    feedImage: routine.feedImage,
                    difficulty: routine.difficulty,
                    description: routine.description,
                    duration: routine.duration,
                    status: routine.status,
                    createdAt: routine.createdAt,
                    modifiedAt: routine.modifiedAt || undefined,
                    author: {
                        id: author._id.toString(),
                        alias: author.alias,
                        role: author.role as RoutineType["author"]["role"],
                    },
                    likesCount: routine.likes?.length || 0,
                    savesCount: routine.saves?.length || 0,
                    likedByMe:
                        Array.isArray(routine.likes) &&
                        routine.likes.some((id) => id.toString() === userId),
                    savedByMe:
                        Array.isArray(routine.saves) &&
                        routine.saves.some((id) => id.toString() === userId),
                    workouts: (routine.workouts || []).map((routineWorkout: any) => {
                        const workout = routineWorkout.workout
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
                                    alias: workout?.author?.alias || "",
                                },
                                likesCount: Array.isArray(workout?.likes)
                                    ? workout.likes.length
                                    : 0,
                                savesCount: Array.isArray(workout?.saves)
                                    ? workout.saves.length
                                    : 0,
                            },
                            order: routineWorkout.order || 0,
                            sets: routineWorkout.sets || 0,
                            reps: routineWorkout.reps || 0,
                            weight: routineWorkout.weight || 0,
                            restTime: routineWorkout.restTime || 0,
                            time: routineWorkout.time || 0,
                        }
                    })
                }
            })

            return sanitizedRoutines
        })
}

export default filterRoutines