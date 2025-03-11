import { data } from './../data/index';
import { NotFoundError, OwnershipError } from './../errors';
import { validate } from "./validate"


export const editPost = (postId, text) => {
    validate.id(postId, 'id');

    const { posts } = data;

    const findPost = posts.findOne(post => post.id === postId);

    if (!findPost) throw new NotFoundError('post not found');
    if (data.userId !== findPost.authorId) throw new OwnershipError('user is not the post author');

    findPost.textDescription = text;
    findPost.modifiedAt = new Date;

    data.posts.updateOne(findPost);
};
