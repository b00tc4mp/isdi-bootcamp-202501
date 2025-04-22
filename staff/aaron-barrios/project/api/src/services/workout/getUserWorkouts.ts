import { User, Workout } from "../../data"
import { validate, errors } from "com"
import { WorkoutType } from "com/types"
import { ObjectId } from "mongoose"

const { SystemError, NotFoundError } = errors

const getUserWorkouts = (
    userId: string,
    targetUserId: string
): Promise<WorkoutType[]> => {
    validate.id(userId)
    validate.id(targetUserId)

    return Promise.all([
        User.findById(userId).lean(),
        User.findById(targetUserId).lean(),
        Workout.find({ author: targetUserId, status: 'accepted' })
            .select('-__v')
            .sort('-createdAt')
            .populate('author', 'alias level')
            .lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, targetUser, workouts]) => {
            if (!user) throw new NotFoundError('User not found!')
            if (!targetUser) throw new NotFoundError('Target user not found!')

            //sanear con map y no forEach para no mutar
            //tipamos el map con el type de datos de servicio (lo que mostramos en la app)
            //utilizo la variable author para evitar tener que poner un any en cada propiedad de author y 
            //utilizo unkwnon porque author no tiene estrictamente esas propiedades, entonces de esa forma lo "calmo"
            const sanitizedWorkouts = workouts.map<WorkoutType>(workout => {
                const author = workout.author as unknown as { _id: ObjectId; alias: string; level?: string }

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
                        level: author.level
                    },
                    likesCount: workout.likes?.length || 0,
                    savesCount: workout.saves?.length || 0,
                    likedByMe: workout.likes?.some((id: any) => id.toString() === userId) || false,
                    savedByMe: workout.saves?.some((id: any) => id.toString() === userId) || false
                }
            })


            return sanitizedWorkouts
        })

}

export default getUserWorkouts