import { Exercise, User } from '../data/index.js';
import { errors, validate } from 'com';

const { SystemError, NotFoundError } = errors;

export const updateExercise = (userId, exerciseId, updateFields) => {
    validate.id(userId, "userId");
    validate.id(exerciseId, "exerciseId");

    validate.name(updateFields.name)
    validate.muscleCategory(updateFields.muscleCategory)
    validate.sets(updateFields.sets)
    validate.reps(updateFields.reps)
    validate.restTime(updateFields.restTime)

    if (updateFields.description !== "") {
        validate.description(updateFields.description);
    }

    if (updateFields.instructions !== "") {
        validate.instructions(updateFields.instructions);
    }

    if (updateFields.images !== undefined) {
        validate.images(updateFields.images);
    }

    if (updateFields.videos !== undefined) {
        validate.videos(updateFields.videos);
    }

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