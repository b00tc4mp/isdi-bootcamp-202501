import { User, Exercise } from "../data/index.js";
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors;

export const getExercises = userId => {
    validate.id(userId, "userId");

    return Promise.all([
        User.findById(userId).lean(),
        Exercise.find({ user: userId }).select('-__v').populate('user').lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, exercises]) => {
            if (!user) {
                throw new NotFoundError('user not found');
            }

            exercises.forEach(exercise => {
                exercise.id = exercise._id.toString();
                delete exercise._id;

                if (exercise.user._id) {
                    exercise.user.id = exercise.user._id.toString();
                    delete exercise.user._id;
                }
            })

            return exercises;
        })
}