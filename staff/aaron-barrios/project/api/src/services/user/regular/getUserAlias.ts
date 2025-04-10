import { User } from '../../../data/models'
import { errors, validate } from 'com'

const { NotFoundError, SystemError } = errors

const getUserAlias = (userId: string): Promise<string> => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found!')

            return user.alias
        })
}

export default getUserAlias