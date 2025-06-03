import { User } from '../../../data'
import { errors } from 'com'

const { SystemError, NotFoundError, AuthorizationError } = errors

const deleteAnonymUser = (userId: string): Promise<void> => {
    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError("Anonym user not found")

            if (user.role !== "anonym") {
                throw new AuthorizationError("Only anonymous users can be deleted this way.")
            }

            return User.deleteOne({ _id: userId })
                .catch(error => { throw new SystemError(error.message) })
                .then(result => {
                    if (result.deletedCount === 0) {
                        throw new NotFoundError("Anonym user not deleted")
                    }
                })
        })
}

export default deleteAnonymUser