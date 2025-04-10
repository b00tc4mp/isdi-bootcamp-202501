import { User, Workout } from "../../../data/"
import { validate, errors } from "com"
import { UserType } from "../../types"

const { NotFoundError, SystemError } = errors

const getModeratorWorkouts = (
    userId: string
): Promise<object> => {
    validate.id(userId)

    //--- WARNING ---
    //¡¡ESPECIFICAR QUE SOLO TRAIGA LOS EJERCICIOS CON STATE PENDING!!!

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

export default getModeratorWorkouts