import { SystemError } from 'com/errors.js';
import { data } from './../data/index.js';
import { validate, errors } from 'com'

const { NotFoundError, OwnershipError } = errors
const { ObjectId } = data


export const editPost = (userId, postId, text) => {
    validate.id(userId, 'id');
    validate.id(postId, 'id');
    validate.description(text, 'text')

    const postObjectId = new ObjectId(postId)

    return Promise.all([
        data.users.findOne({ _id: new ObjectId(userId) }),
        data.posts.findOne({ _id: postObjectId })
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (user === null || post === null) throw new NotFoundError(`${user === null ? 'user' : 'post'} not found`)

            if (userId !== post.authorId.toString()) throw new OwnershipError('user is not the post author');

            return data.posts.updateOne({ _id: postObjectId }, { $set: { textDescription: text, modifiedAt: new Date } })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
};
