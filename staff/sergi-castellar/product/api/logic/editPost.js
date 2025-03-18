import { data } from './../data/index.js';
import { validate, errors } from 'com'

const { NotFoundError, OwnershipError } = errors


export const editPost = (userId, postId, text) => {
    validate.id(userId, 'id');
    validate.id(postId, 'id');
    validate.description(text, 'text')

    const { posts, users } = data;

    const user = users.getById(userId)
    if (!user) throw new NotFoundError('user not found');

    const post = posts.getById(postId);

    if (!post) throw new NotFoundError('post not found');
    if (userId !== post.authorId) throw new OwnershipError('user is not the post author');

    post.textDescription = text;

    post.modifiedAt = new Date;

    data.posts.updateOne(post);
};
