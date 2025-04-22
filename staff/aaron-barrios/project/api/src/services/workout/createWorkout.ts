import { User, Workout } from '../../data/models'
import { WorkoutDocType } from '../../data/types'
import { errors, validate } from 'com'
import { Types } from 'mongoose'
const { SystemError, NotFoundError } = errors

const createWorkout = (
    author: string,
    name: string,
    muscleGroup: string,
    feedImage: string,
    description: string,
    executionImages?: string[]
): Promise<WorkoutDocType> => {
    validate.id(author)
    validate.name(name)
    validate.string(muscleGroup)
    validate.url(feedImage)
    validate.text(description)

    if (executionImages && !Array.isArray(executionImages)) {
        throw new SystemError("Execution images must be an array")
    }

    return User.findById(author).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found!')

            const newWorkout: Partial<WorkoutDocType> = {
                author: new Types.ObjectId(author),
                name,
                muscleGroup: muscleGroup as WorkoutDocType["muscleGroup"],
                feedImage,
                description,
                executionImages: executionImages?.length ? executionImages : undefined,
                status: "pending"
            }

            return Workout.create(newWorkout)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(workout => workout)
}

export default createWorkout

