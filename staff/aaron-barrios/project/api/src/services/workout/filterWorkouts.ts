import { User, Workout } from "../../data"
import { errors, validate } from "com"
import { WorkoutType } from "com/types"

const { NotFoundError, SystemError } = errors

const filterWorkouts = (
    userId: string,
    filter: "popular" | "saved" | "recent"
): Promise<WorkoutType[]> => {
    validate.id(userId)

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

            // Sort according to filter
            let sorted = [...workouts]

            if (filter === "popular") {
                sorted.sort((workout1, workout2) => (workout2.likes?.length || 0) - (workout1.likes?.length || 0))
            } else if (filter === "saved") {
                sorted.sort((workout1, workout2) => (workout2.saves?.length || 0) - (workout1.saves?.length || 0))
            } else if (filter === "recent") {
                sorted.sort((workout1, workout2) => {
                    const date1 = new Date(workout1.createdAt).getTime()
                    const date2 = new Date(workout2.createdAt).getTime()
                    return date2 - date1
                })
            }

            // Sanitize
            return sorted.map<WorkoutType>((workout) => {
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
                        role: (author as any).role
                    },
                    likesCount: workout.likes?.length || 0,
                    savesCount: workout.saves?.length || 0,
                    likedByMe: workout.likes?.some((id: any) => id.toString() === userId) || false,
                    savedByMe: workout.saves?.some((id: any) => id.toString() === userId) || false
                }
            })
        })
}

export default filterWorkouts