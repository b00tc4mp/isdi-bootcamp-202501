import { data } from '../data/index.js'
import { validate, errors } from 'com'

const { ObjectId } = data
const { NotFoundError, OwnershipError, SystemError } = errors

export const deletePost = (userId, postId) => {
    validate.id(userId, 'id')
    validate.id(postId, 'id')

    return data.users.findOne({ _id: new ObjectId(userId) })
        .catch(error => { throw new SystemError(error.message) })
        .then(foundUser => {
            if (!foundUser) throw new NotFoundError('user not found');

            return data.posts.findOne({ _id: new ObjectId(postId) })
        })
        .catch(error => { throw new SystemError(error.message) })
        .then(foundPost => {
            if (!foundPost) throw new NotFoundError('post not found');
            if (userId !== foundPost.authorId.toString()) throw new OwnershipError('user is not the post author');

            return data.posts.deleteOne({ _id: new ObjectId(postId) })
                .catch(error => {
                    throw new SystemError(error.message)
                })
        })
        .then(() => { })

};
