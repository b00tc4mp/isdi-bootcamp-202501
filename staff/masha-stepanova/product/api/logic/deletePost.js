import { User, Post, ObjectId } from '../data/index.js'
import { errors, validate } from 'com'

const { NotFoundError, OwnershipError, SystemError } = errors

export const deletePost = (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    return User.findOne({ _id: new ObjectId(userId) })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.findOne({ _id: new ObjectId(postId) })
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    if (!post) throw new NotFoundError('post not found')

                    if (post.author.toString() !== userId) throw new OwnershipError('user is not author of post')

                    return Post.deleteOne({ _id: new ObjectId(postId) })
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
        .then(() => { })
}