import { data } from '../data/index.js'
import { validate } from './validate.js';

export const deletePost = (userId, postId) => {
    validate.id(userId, 'userId');
    validate.id(postId, 'postId');

    const foundPost = data.posts.findOne(post => post.id === postId)

    if (!foundPost) {
        throw new Error('post not found');
    }

    if (foundPost.author !== userId) {
        throw new Error('user is not author of the post');
    }

    data.posts.deleteOne(post => post.id === postId)

}