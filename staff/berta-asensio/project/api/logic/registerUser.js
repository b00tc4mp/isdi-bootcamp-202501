import { User } from '../data/index.js'
import { errors, validate } from 'com'
import bcrypt from 'bcryptjs'

const { SystemError, DuplicityError } = errors


export const registerUser = (name, email, password) => {
    validate.name(name)
    validate.minLength(name, 1, 'name')
    validate.maxLength(name, 50, 'name')
    validate.password(password)
    validate.email(email)

    //hasheamos el password introducido
    return bcrypt.hash(password, 10)
        .catch(error => { throw new SystemError(error.message) })
    .then(hash => {
        const user = {
            name: name, 
            email: email,
            password: hash
        }

        return User.create(user)
            .catch(error => {
                if(error.code === 11000) throw new DuplicityError('user already exists')
                
                throw new SystemError(error.message)
            })
    })
    .then(() => { })
}

//node logic/registerUser.test.js