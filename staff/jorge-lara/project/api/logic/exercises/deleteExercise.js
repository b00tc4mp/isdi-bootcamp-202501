import { Exercise, User, Routine } from '../../data/index.js';
import { errors, validate } from 'com';

const { SystemError, NotFoundError, RangeError } = errors;

export const deleteExercise = (userId, exerciseId) => {
    validate.id(userId, "userId");
    validate.id(exerciseId, "exerciseId");

    return Promise.all([
        User.findById(userId).lean(),
        Exercise.findById(exerciseId).lean(),
        Routine.countDocuments({ exercises: exerciseId, user: userId })
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, exercise, exerciseUsed]) => {
            if (!user) {
                throw new NotFoundError('user not found');
            }

            if (!exercise) {
                throw new NotFoundError('exercise not found');
            }

            if (exerciseUsed > 0) {
                throw new RangeError('cannot delete exercises because its in an actual routine')
            }

            return Exercise.deleteOne({ _id: exerciseId })
                .catch(error => { throw new SystemError(error.message) });
        })
        .then(() => { })
}