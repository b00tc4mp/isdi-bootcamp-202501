import { Routine, User } from '../../data/index.js';
import { errors, validate } from 'com';

const { SystemError, NotFoundError } = errors;

export const getRoutines = userId => {
    validate.id(userId, "userId");

    return Promise.all([
        User.findById(userId).lean(),
        Routine.find({ user: userId }).select('-__v').populate({ path: 'user', model: 'User' }).populate({ path: 'exercises', model: 'Exercise' }).sort('-createdAt').lean()
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