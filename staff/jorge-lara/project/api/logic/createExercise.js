import { User, Exercise } from '../data/index.js';
import { errors, validate } from 'com';

const { SystemError, NotFoundError } = errors;

export const createExercise = (userId, name, muscleCategory, sets, reps, restTime) => {
    validate.id(userId, "userId");
    validate.name(name);
    validate.muscleCategory(muscleCategory);
    validate.sets(sets);
    validate.reps(reps);
    validate.restTime(restTime);

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