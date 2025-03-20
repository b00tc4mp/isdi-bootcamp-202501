import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, CredentialsError, NotFoundError } = errors

export const authenticateUser = (username, password) => {
    validate.username(username, 'username')
    validate.password(password, 'password')

    return data.users.findOne({username})
        .catch(error => { throw new SystemError(error.message)} )
        .then(user => {
            if (!user) throw new NotFoundError('User not found!')

            if (user.password !== password) throw new CredentialsError('Wrong credentials')

            return user._id.toString() // => to mask the db we are using
        })
}
