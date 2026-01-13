import { User, Post } from './../data/index.js'
import { validate, errors } from 'com'

const { NotFoundError, OwnershipError, SystemError } = errors

export const deletePost = (userId, postId) => {
    validate.id(userId, 'id')
    validate.id(postId, 'id')

    return Promise.all([
        User.findById(userId),
        Post.findById(postId)
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([foundUser, foundPost]) => {
            if (!foundUser) throw new NotFoundError('user not found');
            if (!foundPost) throw new NotFoundError('post not found');

            if (userId !== foundPost.author.toString()) throw new OwnershipError('user is not the post author');

            return Post.deleteOne({ _id: postId })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })

};
