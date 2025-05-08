import { Routine, User } from '../data/index.js';
import { errors } from 'com'

const { SystemError, NotFoundError } = errors;

export const createRoutine = (userId, title, description, duration, difficulty, category, type, exercises, startDate, endDate) => {
    //TODO validate

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found');
            }

            const routine = {
                user: userId,
                title,
                description,
                duration,
                difficulty,
                category,
                type,
                exercises,
                startDate,
                endDate
            }

            return Routine.create(routine)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}