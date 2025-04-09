import { data } from '../data/index.js'
import { errors, validate } from 'com'
import bcrypt from 'bcryptjs'

const { SystemError, CredentialsError, NotFoundError } = errors

export const authenticateUser = (username, password) => {
    validate.username(username, 'username')
    validate.password(password, 'password')

    return data.users.findOne({ username }) //En Mongo para buscar se hace de esta forma
        .catch(error => { throw new SystemError(error.message) })
        .then(user => { //Mongo cuando no encuentra nada te devuelve un null
            if (!user) throw new NotFoundError('user not found')

            //if (user.password !== password) throw new CredentialsError('wrong credentials') ya no se hace mas desde que esta el hash

            return bcrypt.compare(password, user.password)
                .catch(error => { throw new SystemError(error.message) })
                .then(match => {
                    if (!match) throw new CredentialsError('wrong credentials')

                    return user._id.toString() //Con el toString() se devuelve solo el string que esta entre ''. Nadie en la capa superior de api tiene que saber que usamos Mongo debajo.
                    // Este return va a parar al siguiente .then del test)
                })

        })
}