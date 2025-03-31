// CAMBIAR LIKE A UN POST

import { User, Post } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

// Agrega o elimina el Like de los Posts
export const toggleLikePost = (userId, postId) => {
    validate.id(userId)
    validate.id(postId)

    return Promise.all([
        User.findById(userId).lean(),
        Post.findById(postId).lean
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')

            const { likes } = post

            const index = likes.findIndex(userObjectId => userObjectId.toString() === userId)

            if (index < 0)
                likes.push(userId)
            else
                likes.splice(index, 1)

            return Post.updateOne({ _id: postId }, { $set: { likes } })
                .catch(error => { throw new SystemError(error.message) })
                .then(() => { })

        })
}