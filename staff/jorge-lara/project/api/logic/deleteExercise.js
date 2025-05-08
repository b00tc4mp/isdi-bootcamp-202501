import {Exercise, User} from '../data/index.js';
import {errors} from 'com';

const {SystemError, NotFoundError} = errors;

export const deleteExercise = (userId, exerciseId) => {

    return Promise.all([
        User.findById(userId).lean(),
        Exercise.findById(exerciseId).lean()
    ])
        .catch(error => {throw new SystemError(error.message)})
        .then(([user, exercise]) => {
            if (!user) {
                throw new NotFoundError('user not found');
            }

            if (!exercise) {
                throw new NotFoundError('exercise not found');
            }

            return Exercise.deleteOne({_id: exercise})
                .catch(error => {throw new SystemError(error.message)});
        })
        .then(() => { })
}