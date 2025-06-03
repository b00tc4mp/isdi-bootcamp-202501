import { Routine, User } from '../../data/index.js';
import { errors, validate } from 'com';

const { SystemError, NotFoundError } = errors;

export const deleteRoutine = (userId, routineId) => {
    validate.id(userId, "userId");
    validate.id(routineId, "routineId");

    return Promise.all([
        User.findById(userId).lean(),
        Routine.findById(routineId).lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, routine]) => {
            if (!user) {
                throw new NotFoundError('user not found');
            }

            if (!routine) {
                throw new NotFoundError('routine not found');
            }

            return Routine.deleteOne({ _id: routine })
                .catch(error => { throw new SystemError('routin not found') });
        })
        .then(() => { })
}