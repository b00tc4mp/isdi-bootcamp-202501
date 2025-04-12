// import { Types } from 'mongoose'
// const { ObjectId } = Types

import { User, Workout } from '../../data/models'
import { WorkoutDocType } from '../../data/types'
import { errors, validate } from 'com'

import { Schema } from 'mongoose'
const { Types: { ObjectId } } = Schema
const { SystemError, NotFoundError } = errors

const createWorkout = (
    author: string,
    name: string,
    muscleGroup: string,
    description: string,
): Promise<void> => {
    validate.id(author)
    validate.name(name)
    validate.text(muscleGroup)
    validate.text(description)

    return User.findById(author).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found!')

            const newWorkout: Pick<WorkoutDocType, "author" | "name" | "muscleGroup" | "description" | "status"> = {
                author: new ObjectId(author),
                name,
                muscleGroup,
                description,
                status: "pending"
            }

            return Workout.create(newWorkout)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}

export default createWorkout

