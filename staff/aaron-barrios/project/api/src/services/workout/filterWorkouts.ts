import { User, Workout } from "../../data"
import { errors, validate } from "com"
import { WorkoutType } from "com/types"

const { NotFoundError, SystemError } = errors

const filterWorkouts = (
    userId: string,
    filter: "popular" | "saved" | "recent",
    muscleGroup?: string
): Promise<WorkoutType[]> => {
    validate.id(userId)

    if (muscleGroup)
        validate.string(muscleGroup)


    return Promise.all([
        User.findById(userId).lean(),
        Workout.find({ status: "accepted" })
            .select("-__v")
            .populate("author", "alias level role")
            .lean()
    ])
        .catch((error) => {
            throw new SystemError(error.message)
        })
        .then(([user, workouts]) => {
            if (!user) throw new NotFoundError("User not found!")

            let filtered = muscleGroup
                ? workouts.filter(w => w.muscleGroup.toLocaleLowerCase() === muscleGroup)
                : workouts

            if (filter === "popular") {
                filtered.sort((workout1, workout2) => (workout2.likes?.length || 0) - (workout1.likes?.length || 0))
            } else if (filter === "saved") {
                filtered.sort((workout1, workout2) => (workout2.saves?.length || 0) - (workout1.saves?.length || 0))
            } else if (filter === "recent") {
                filtered.sort((workout1, workout2) =>
                    new Date(workout2.createdAt).getTime() - new Date(workout1.createdAt).getTime()
                )
            }

            return filtered.map<WorkoutType>((workout) => {
                const author = workout.author as unknown as { _id: any; alias: string; level?: string, role?: string }

                return {
                    id: workout._id.toString(),
                    name: workout.name,
                    muscleGroup: workout.muscleGroup,
                    feedImage: workout.feedImage,
                    type: workout.type,
                    difficulty: workout.difficulty,
                    description: workout.description,
                    executionImages: workout.executionImages,
                    status: workout.status,
                    createdAt: workout.createdAt,
                    author: {
                        id: author._id.toString(),
                        alias: author.alias,
                        level: author.level,
                        role: author.role as WorkoutType["author"]["role"] //=> type assertion bc of typed role in types
                    },
                    likesCount: workout.likes?.length || 0,
                    savesCount: workout.saves?.length || 0,
                    likedByMe: workout.likes?.some((id: any) => id.toString() === userId) || false,
                    savedByMe: workout.saves?.some((id: any) => id.toString() === userId) || false,
                }
            })
        })
}

export default filterWorkouts