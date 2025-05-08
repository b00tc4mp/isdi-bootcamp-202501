import { Routine, User } from '../data/index.js';
import { errors } from 'com';

const { SystemError, NotFoundError } = errors;

export const updateRoutine = (userId, routineId, updateFields) => {

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
                throw new NotFoundError('exercise not found');
            }

            routineFields.forEach(field => {
                if (updateFields[field] !== undefined) {
                    routine[field] = updateFields[field];
                }
            })

            return routine.save();
        })
}