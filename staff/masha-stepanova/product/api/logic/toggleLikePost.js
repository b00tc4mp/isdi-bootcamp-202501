import { User, Post, ObjectId } from '../data/index.js'
import { errors, validate } from 'com'

const { NotFoundError, SystemError } = errors

export const toggleLikePost = (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    const userObjectId = new ObjectId(userId)
    const postObjectId = new ObjectId(postId)

    return User.findOne({ _id: userObjectId })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.findOne({ _id: postObjectId })
        })
        .catch(error => { throw new SystemError(error.message) })
        .then(post => {
            if (!post) throw new NotFoundError('post not found')

            const { likes } = post

            const index = likes.findIndex(likeUserId => likeUserId.toString() === userId)

            if (index < 0)
                likes.push(userObjectId)
            else
                likes.splice(index, 1)

            return Post.updateOne({ _id: postObjectId }, {
                $set: {
                    likes
                }
            })
                .catch(error => { throw new SystemError(error.message) })
                .then(() => { })
        })
}