// import { ObjectId } from 'mongoose'
import { User, Workout } from '../../data/models/index.js'
import { IWorkout } from '../../data/types.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

const createWorkout = (
    author: string,
    name: string,
    muscleGroup: string,
    difficulty: string,
    description: string
) => {
    validate.id(author)
    validate.name(name)
    validate.text(muscleGroup)
    validate.text(difficulty)
    validate.text(description)

    return User.findById(author).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found!')

            const newWorkout: Partial<IWorkout> = {
                // author,
                name,
                muscleGroup,
                difficulty,
                description
            }

            // ---WARNING ---
            // -> ESTO ESTÁ MAL -> DEBERIA CAMBIARLE EL STATUS A PENDING E IR
            // A LA FEED DE REVIEW DE ADMIN (CREO OTRA DB???)
            return Workout.create(newWorkout)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}

export default createWorkout

