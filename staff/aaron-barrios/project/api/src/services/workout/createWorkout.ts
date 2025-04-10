import { ObjectId } from 'mongoose'
import { User, Workout } from '../../data/models/index.js'
import { IWorkout } from '../../data/types.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

const createWorkout = (
    author: ObjectId,
    name: string,
    muscleGroup: string,
    description: string
) => {
    validate.name(name)
    validate.text(muscleGroup)
    validate.text(description)

    return User.findById(author).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found!')

            const newWorkout: Partial<IWorkout> = {
                author,
                name,
                muscleGroup,
                description
            }

            newWorkout.status = 'pending'

            return Workout.create(newWorkout)
                .catch(error => { throw new SystemError(error.message) })
        })
}

export default createWorkout

