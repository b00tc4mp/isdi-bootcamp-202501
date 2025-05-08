import { User, Exercise } from '../data/index.js';
import { errors } from 'com';

const { SystemError, NotFoundError } = errors;

export const createExercise = (userId, name, muscleCategory, sets, reps, restTime) => {

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {

            if (!user) {
                throw new NotFoundError('user not found');
            }

            const exercise = {
                user: userId,
                name,
                muscleCategory,
                sets,
                reps,
                restTime
            }

            return Exercise.create(exercise)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}