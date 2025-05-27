import { Routine, User } from '../../data/index.js';
import { errors, validate } from 'com'

const { SystemError, NotFoundError, RangeError } = errors;

export const createRoutine = (userId, title, description, duration, difficulty, category, type, exercises, startDate, endDate) => {
    validate.id(userId, "userId");
    validate.name(title, "title");
    validate.description(description);
    validate.duration(duration)
    validate.difficulty(difficulty)
    validate.category(category)
    validate.type(type)
    validate.exercises(exercises)
    validate.startDate(startDate)
    validate.endDate(endDate)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found');
            }

            if (startDate > endDate) {
                throw new RangeError('end date cannot be before start date')
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