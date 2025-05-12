import { Routine, User } from '../data/index.js';
import { errors, validate } from 'com';

const { SystemError, NotFoundError } = errors;

export const getNextRoutine = userId => {
    validate.id(userId, "userId");
    const now = new Date()

    return Promise.all([
        User.findById(userId).lean(),
        Routine.findOne({ user: userId, startDate: { $gt: now } }).populate({ path: 'user', model: 'User' }).populate({ path: 'exercises', model: 'Exercise' }).sort({ startDate: 1 }).limit(1).lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, routine]) => {
            if (!user) {
                throw new NotFoundError('user not found');
            }

            if (!routine) {
                return null;
            }

            routine.id = routine._id.toString();
            delete routine._id;

            if (routine.user._id) {
                routine.user.id = routine.user._id.toString();
                delete routine.user._id;
            }
            return routine;
        })
}