import { Post, User } from './../data/index.js';
import { validate, errors } from 'com';

const { SystemError, NotFoundError } = errors

export const getUserPosts = (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return Promise.all([
        User.findById(userId).lean(),
        User.findById(targetUserId).lean(),

        Post.find({ author: targetUserId }).select('-__v').sort('-createdAt').populate('author').lean()
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

                //TODO post.likes => usernames?
                post.likes = post.likes.map(objectId => objectId.toString())

                post.liked = post.likes.some(userObjectId => userObjectId.toString() === userId)

                post.own = post.author.id === userId
            })

            return posts
        })
}