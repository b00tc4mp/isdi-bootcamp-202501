import { Routine, User } from '../data/index.js';
import { errors, validate } from 'com';

const { SystemError, NotFoundError } = errors;

export const getCurrentRoutines = userId => {
    validate.id(userId, "userId");

    const now = new Date()

    return Promise.all([
        User.findById(userId).lean(),
        Routine.find({ user: userId, startDate: { $lte: now }, endDate: { $gte: now } }).populate({ path: 'user', model: 'User' }).populate({ path: 'exercises', model: 'Exercise' }).lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, routines]) => {
            if (!user) {
                throw new NotFoundError('user not found');
            }

            routines.forEach(routine => {
                routine.id = routine._id.toString();
                delete routine._id;

                if (routine.user._id) {
                    routine.user.id = routine.user._id.toString();
                    delete routine.user._id;
                }
            })
            return routines;
        })
}