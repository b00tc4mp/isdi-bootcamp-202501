import { User, Workout } from "../../data"
import { errors, validate } from "com"
import { WorkoutType } from "com/types"

const { NotFoundError, SystemError } = errors

const getSuggestedWorkouts = (
    userId: string
): Promise<WorkoutType[]> => {
    validate.id(userId)

    return Promise.all([
        User.findById(userId).lean(),
        Workout.find({ status: "accepted" })
            .select("-__v")
            .populate("author", "alias level role")
            .lean()
    ])
        .catch((error) => { throw new SystemError(error.message) })
        .then(([user, workouts]) => {
            if (!user) throw new NotFoundError("User not found!")

            let filteredWorkouts

            //if interests
            if (user.interests?.length) {
                filteredWorkouts = workouts.filter(workout =>
                    user.interests!.some(interest =>
                        (workout.type && workout.type === interest)
                    )
                )
            }

            //if no interests
            if (!filteredWorkouts || filteredWorkouts.length === 0) {
                filteredWorkouts = [...workouts]
                filteredWorkouts.sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0))
                filteredWorkouts = filteredWorkouts.slice(0, 10)
            }

            return filteredWorkouts.map<WorkoutType>((workout) => {
                const author = workout.author as unknown as {
                    _id: any
                    alias: string
                    level?: string
                    role?: string
                }

                return {
                    id: workout._id.toString(),
                    name: workout.name,
                    muscleGroup: workout.muscleGroup,
                    feedImage: workout.feedImage,
                    type: workout.type as WorkoutType["type"],
                    difficulty: workout.difficulty,
                    description: workout.description,
                    executionImages: workout.executionImages,
                    status: workout.status,
                    createdAt: workout.createdAt,
                    author: {
                        id: author._id.toString(),
                        alias: author.alias,
                        level: author.level,
                        role: author.role as WorkoutType["author"]["role"]
                    },
                    likesCount: workout.likes?.length || 0,
                    savesCount: workout.saves?.length || 0,
                    likedByMe: workout.likes?.some(id => id.toString() === userId) || false,
                    savedByMe: workout.saves?.some(id => id.toString() === userId) || false
                }
            })
        })
}

export default getSuggestedWorkouts