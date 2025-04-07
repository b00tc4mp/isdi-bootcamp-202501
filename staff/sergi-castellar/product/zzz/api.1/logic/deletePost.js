import { data } from './../data/index.js'
import { NotFoundError, OwnershipError } from './../errors.js';
import { validate } from "./validate.js"

export const deletePost = (userId, postId) => {
    validate.id(userId, 'id')
    validate.id(postId, 'id')

    const { posts } = data;

    const findPost = posts.getById(postId);

    if (!findPost) throw new NotFoundError('post not found');
    if (userId !== findPost.authorId) throw new OwnershipError('user is not the post author');

    data.posts.deleteOne(post => post.id === postId);
};
