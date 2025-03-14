import { data } from '../data/index.js'
import { NotFoundError, OwnershipError } from '../errors.js';
import { validate } from './validate.js';

export const updatePostText = (userId, postId, text) => {
    validate.id(userId, 'userId');
    validate.id(postId, 'postId');
    validate.text(text, 'text');
    validate.maxLength(text, 400, 'text');

    const user = data.users.getById(userId);

    if (!user) {
        throw new NotFoundError('user not found');
    }

    const foundPost = data.posts.findOne(post => post.id === postId);

    if (!foundPost) {
        throw new NotFoundError('post not found');
    }

    if (foundPost.author !== userId) {
        throw new OwnershipError('user is not author of post');
    }

    foundPost.text = text;
    foundPost.modifiedAt = new Date;

    data.posts.updateOne(post => post.id === postId, foundPost);
}