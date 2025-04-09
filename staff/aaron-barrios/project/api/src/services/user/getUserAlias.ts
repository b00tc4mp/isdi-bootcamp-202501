import { User } from '../../data/models.js'
import { errors, validate } from 'com'

const { NotFoundError, SystemError } = errors

const getUserAlias = (userId: string) => {
    validate.id(userId, 'userId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found!')

            return user.alias
        })
}

export default getUserAlias