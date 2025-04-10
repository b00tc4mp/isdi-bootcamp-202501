import { User, Workout } from "../../data/index.js"
import { validate, errors } from "com"

const { SystemError, NotFoundError } = errors

const getWorkouts = (
    userId: string
): Promise<object> => {
    validate.id(userId)

    return Promise.all([
        User.findById(userId).lean(),
        Workout.find().select('-__v').sort('-createdAt').populate('author', 'username').lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, workouts]) => {
            if (!user) throw new NotFoundError('User not found!')

            // workouts.forEach(workout => {

            // }) //sanear o crear nuevo Type

            return workouts
        })
}

export default getWorkouts