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
): Promise<WorkoutDocType> => {
    validate.id(author)
    validate.name(name)
    validate.text(muscleGroup)
    validate.url(feedImage)
    validate.text(description)

    return User.findById(author).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found!')

            const newWorkout: Partial<WorkoutDocType> = {
                author: new Types.ObjectId(author),
                name,
                muscleGroup,
                feedImage,
                description,
                status: "pending"
            }

            return Workout.create(newWorkout)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(workout => workout)
}

export default createWorkout

