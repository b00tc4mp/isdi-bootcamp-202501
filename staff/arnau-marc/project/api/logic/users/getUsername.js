import { User } from '../../data/index.js'
//import { validate, errors } from 'com'

// const { SystemError, NotFoundError } = errors

export const getUsername = (userId) => {
   // validate.id?

   return User.findById(userId).lean()
        .catch(error => { throw new  Error(error.message) })
        .then(user => {
            if (!user) throw new Error(error.message) //NotFoundError('user not found)

            return user.username
        })
}