import dotenv from 'dotenv'
dotenv.config()
import { User } from '../../data/index.js'
// import { errors, validate } from 'com'

// const { SystemError, NotFoundError, AuthorizationError, ConflictError } = errors

export const requestAdminRole = (userId, secretWord) => {
    // validate.id(userId, 'user id')
    // validate.string(secretWord, 'secret word')

    return User.findById(userId)
        .catch(error => { throw new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('User not found')
            if (user.role === 'admin') throw new Error('User is already admin')

            // Verificar palabra secreta
            if (secretWord !== process.env.ADMIN_SECRET_WORD) {
                throw new Error('Invalid secret word')
            }

            // Actualizar rol
            user.role = 'admin'
            return user.save()
                .catch(error => { throw new Error(error.message) })
                .then(() => {})
        })
}
