import { Exercise, User } from '../data/index.js';
import { errors } from 'com';

const { SystemError, NotFoundError } = errors;

export const updateExercise = (userId, exerciseId, updateFields) => {
    const exercisesFields = [
        'name',
        'description',
        'muscleCategory',
        'instructions',
        'images',
        'videos',
        'weight',
        'sets',
        'reps',
        'restTime',
    ];

    return Promise.all([
        User.findById(userId).lean(),
        Exercise.findById(exerciseId)
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, exercise]) => {
            if (!user) {
                throw new NotFoundError('user not found');
            }

            if (!exercise) {
                throw new NotFoundError('exercise not found');
            }

            exercisesFields.forEach((field) => {
                if (updateFields[field] !== undefined) {
                    exercise[field] = updateFields[field];
                }
            })

            return exercise.save();
        })
}