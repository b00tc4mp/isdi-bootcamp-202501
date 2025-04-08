import { User } from '../data/models.js'
import { errors, validate } from 'com'

const { NotFountError, SystemError } = errors

const getUserAlias = (userId: string) => {
    validate.id(userId, 'userId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFountError('User not found!')

            return user.alias
        })
}

export default getUserAlias