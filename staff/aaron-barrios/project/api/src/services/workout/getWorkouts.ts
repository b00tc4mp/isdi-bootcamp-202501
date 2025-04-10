import { User, Workout } from "../../data/index.js"
import { validate, errors } from "com"
import { UserType } from "../types.js"

const { SystemError, NotFoundError } = errors

const getWorkouts = (
    userId: string
): Promise<object> => {
    validate.id(userId)

    return Promise.all([
        User.findById(userId).lean(),
        Workout.find().select('-__v').sort('-createdAt').populate('author', 'username').lean()
    ])
        .then(([user, workouts]) => {
            if (!user) throw new NotFoundError('User not found!')

            //sanear con map y no forEach para no mutar
            // workouts.map<UserType>(workout => {

            //     // }) //sanear o crear nuevo Type

            return { user, workouts }
        })
        .catch(error => { throw new SystemError(error.message) })
}

export default getWorkouts