import { Routine, User } from '../data/index.js';
import { errors, validate } from 'com';

const { SystemError, NotFoundError } = errors;

export const updateRoutine = (userId, routineId, updateFields) => {
    validate.id(userId, "userId");
    validate.id(routineId, "routineId");

    validate.name(updateFields.title);
    validate.duration(updateFields.duration);
    validate.difficulty(updateFields.difficulty);
    validate.category(updateFields.category);
    validate.type(updateFields.type);
    validate.exercises(updateFields.exercises);
    validate.startDate(updateFields.startDate);
    validate.endDate(updateFields.endDate);

    if (updateFields.description !== "") {
        validate.description(updateFields.description);
    }

    const routineFields = [
        'title',
        'description',
        'duration',
        'difficulty',
        'category',
        'type',
        'exercises',
        'startDate',
        'endDate'
    ];

    return Promise.all([
        User.findById(userId).lean(),
        Routine.findById(routineId)
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, routine]) => {
            if (!user) {
                throw new NotFoundError('user not found');
            }

            if (!routine) {
                throw new NotFoundError('routine not found');
            }

            routineFields.forEach(field => {
                if (updateFields[field] !== undefined) {
                    routine[field] = updateFields[field];
                }
            })

            return routine.save();
        })
}