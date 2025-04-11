//import { errors, validate } from 'com' // TODO VALIDATIONS
import { User } from '../../data/index.js' // TODO MODELS
import bcrypt from 'bcryptjs'

// TO DO ERRORS const { SystemError, NotFoundError, CredentialsError } = errors

export const authenticateUser = (username, password) => {
   // validate.username = (username) // TODO
    // validate.password = (password) // TODO

    return User.findOne({ username }).lean()
        .catch(error => { throw new Error(error.message)}) // TODO SystemError
        .then(user=>{
            if(!user) throw new Error(error.message) // TODO NotFoundError

            return bcrypt.compare(password, user.password)
                .catch(error => { throw new Error(error.message)})
                .then(match => {
                    if(!match) throw new Error('Wrong credentials') // TODO CredentialsError

                    return user._id.toString()
                })
        })
}
