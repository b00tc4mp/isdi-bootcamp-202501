import { User, Workout } from '../../data/models/'
import { errors, validate } from 'com'

const { SystemError, NotFoundError, OwnershipError } = errors

const deleteWorkout = (
    userId: string,
    workoutId: string
) => {
    validate.id(userId)
    validate.id(workoutId)

    return Promise.all([
        User.findById(userId),
        Workout.findById(workoutId),
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, workout]) => {
            if (!user) throw new NotFoundError('User not found!')
            if (!workout) throw new NotFoundError('Workout not found!')

            if (workout.author.toString() !== userId) {
                throw new OwnershipError('User is not author of workout')
            }

            if (workout.status !== 'pending') {
                throw new OwnershipError('Only workouts with pending status can be deleted')
            }

            return Workout.deleteOne({ _id: workoutId })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}

export default deleteWorkout