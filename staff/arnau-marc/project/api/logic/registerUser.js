import { User } from '../data/index.js' // TODO
import { errors, validate } from 'com' //TODO
import bcrypt from 'bcryptjs'

// TODO errors

export const registerUser = (name, email, username, surname, password) =>{
    // TODO validates, name, minLength, maxLength, email, username, password

    return bcrypt.hash(password, 10)
        .catch(error => { throw new Error(error.message) }) // TODO SystemError
        .then(hash=> {
            const player = {
                name,
                surname,
                email,
                username,
                password: hash
            }

            return User.create(player)
                .catch(error=> {
                    if (error.code === 11000) throw new Error('user already exists')
                    
                    throw new Error(error.message)
                })
        })
        .then(() => {})
}