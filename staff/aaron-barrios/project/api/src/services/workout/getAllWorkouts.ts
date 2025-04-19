import { User, Workout } from "../../data"
import { validate, errors } from "com"
import { WorkoutType } from "com/types"

const { SystemError, NotFoundError } = errors

const getAllWorkouts = (
    userId: string
): Promise<{ workouts: WorkoutType[] }> => {
    validate.id(userId)

    return Promise.all([
        User.findById(userId).lean(),
        Workout.find({ status: 'accepted' })
            .select('-__v')
            .sort('-createdAt')
            .populate('author', 'alias level')
            .lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, workouts]) => {
            if (!user) throw new NotFoundError('User not found!')

            const sanitizedWorkouts = workouts.map<WorkoutType>(workout => {
                const author = workout.author as unknown as { _id: any; alias: string; level?: string }

                return {
                    id: workout._id.toString(),
                    name: workout.name,
                    muscleGroup: workout.muscleGroup,
                    type: workout.type,
                    difficulty: workout.difficulty,
                    description: workout.description,
                    images: workout.images,
                    status: workout.status,
                    createdAt: workout.createdAt,
                    author: {
                        id: author._id.toString(),
                        alias: author.alias,
                        level: author.level
                    },
                    likesCount: workout.likes?.length || 0,
                    savesCount: workout.saves?.length || 0,
                    likedByMe: workout.likes?.some((id: any) => id.toString() === userId) || false,
                    savedByMe: workout.saves?.some((id: any) => id.toString() === userId) || false
                }
            })

            return { workouts: sanitizedWorkouts }
        })
}

export default getAllWorkouts
