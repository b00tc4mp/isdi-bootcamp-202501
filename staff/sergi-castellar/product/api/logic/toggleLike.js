import { User, Post } from './../data/index.js'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export const toggleLike = (userId, currentPostId) => {
    validate.id(userId, 'id')
    validate.id(currentPostId, 'id')

    return Promise.all([
        User.findOne({ _id: userId }),
        Post.findOne({ _id: currentPostId })
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, currentPost]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!currentPost) throw new NotFoundError('post not found')

            const { likes } = currentPost

            const index = likes.findIndex(userObjectId => userObjectId.toString() === userId)

            const isAlreadyLiked = index !== -1

            if (!isAlreadyLiked) {
                likes.push(userId)
            } else {
                likes.splice(index, 1)
            }

            return Post.updateOne({ _id: currentPostId }, { $set: { likes } })
                .catch(error => { throw new SystemError(error.message) })
                .then(() => { })
        })
}
