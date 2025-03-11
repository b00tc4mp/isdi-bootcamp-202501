import { data } from './../data/index'
import { NotFoundError, OwnershipError } from './../errors';
import { validate } from "./validate"

export const deletePost = (postId) => {
    validate.id(postId, 'id');

    const { posts } = data;

    const findPost = posts.findOne(post => post.id === postId);

    if (!findPost) throw new NotFoundError('post not found');
    if (data.userId !== findPost.authorId) throw new OwnershipError('user is not the post author');

    data.posts.deleteOne(post => post.id === postId);
};
