import { data } from '../data/index.js'
import { validate, errors } from 'com'

const { ObjectId } = data
const { NotFoundError, OwnershipError, SystemError } = errors

export const deleteOwnUser = (userId) => {
    validate.id(userId, 'id')

    return data.users.findOne({ _id: new ObjectId(userId) })
        .catch(error => { throw new SystemError(error.message) })
        .then(foundUser => {
            if (!foundUser) throw new NotFoundError('user not found');

            //            if (userId !== foundPost.author.toString()) throw new OwnershipError('user is not the post author');

            return data.users.deleteOne({ _id: new ObjectId(userId) })
                .catch(error => {
                    throw new SystemError(error.message)
                })
        })
        .then(() => { })

};
