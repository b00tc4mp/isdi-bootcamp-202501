import { SystemError } from 'com/errors.js'
import { User, Post } from '../data/index.js'
import { errors, validate } from 'com'

const { NotFoundError } = errors

export const getUserPosts = (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return Promise.all([
        User.findById(userId).lean(),
        User.findById(targetUserId).lean(),
        Post.find({ author: targetUserId }).select('-__v').sort('-createdAt').populate('author', 'username').lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, targetUser, posts]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!targetUser) throw new NotFoundError('targetUser not found')

            posts.forEach(post => {
                post.id = post._id.toString()
                delete post._id

                if (post.author._id) {
                    post.author.id = post.author._id.toString()
                    delete post.author._id
                }

                post.liked = post.likes.some(userObjectId => userObjectId.toString() === userId)
                post.likesCount = post.likes.length
                delete post.likes

                post.own = post.author.id === userId
            })

            return posts
        })
}