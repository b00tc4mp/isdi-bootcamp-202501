import { Post, User } from './../data/index.js';
import { validate, errors } from 'com';

const { SystemError, NotFoundError } = errors

export const getPosts = userId => {
    validate.id(userId, 'id')

    return Promise.all([
        User.findById(userId).lean(),
        Post.find().select('-__v').sort('-createdAt').populate('author').lean()
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

                //TODO post.likes => usernames?
                post.likes = post.likes.map(objectId => objectId.toString())

                post.liked = post.likes.some(userObjectId => userObjectId.toString() === userId)

                post.own = post.author.id === userId
            });
            return posts
        })
}