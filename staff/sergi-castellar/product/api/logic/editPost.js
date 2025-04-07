import { User, Post } from './../data/index.js'
import { validate, errors } from 'com'

const { NotFoundError, OwnershipError, SystemError } = errors

export const editPost = (userId, postId, text) => {
    validate.id(userId, 'id');
    validate.id(postId, 'id');
    validate.description(text, 'text')

    return Promise.all([
        User.findById({ _id: userId }),
        Post.findById({ _id: postId })
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found');
            if (!post) throw new NotFoundError('post not found');

            if (userId !== post.author.toString()) throw new OwnershipError('user is not the post author');

            return Post.updateOne({ _id: postId }, { $set: { text: text, modifiedAt: new Date } })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
};
