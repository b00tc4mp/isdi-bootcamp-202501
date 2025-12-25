
import { User, Post } from '../data/index.js'
import { errors, validate } from 'com'

const { NotFoundError, SystemError } = errors

export const getPosts = userId => {
    validate.id(userId, 'userId')

    return Promise.all([
        User.findById(userId).lean(),
        Post.find().select('-__v').sort('-createdAt').populate('author', 'username').lean()
    ])

        .catch(error => { throw new SystemError(error.message) })
        .then(([user, posts]) => {
            if (!user) throw new NotFoundError('user not found')

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
