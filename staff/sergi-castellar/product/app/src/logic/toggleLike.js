import { data } from './../data/index';
import { NotFoundError } from './../errors';
import { validate } from "./validate"

export const toggleLike = (currentPostId) => {
    validate.id(currentPostId, 'id');

    const { userId } = data;

    const currentPost = data.posts.findOne(post => post.id === currentPostId);

    if (!currentPost) throw new NotFoundError('post not found');

    const likePosition = currentPost.likes.indexOf(userId);
    const isAlreadyLiked = likePosition !== -1;

    if (!isAlreadyLiked) {
        currentPost.likes.push(userId);
    } else {
        currentPost.likes.splice(likePosition, 1);
    }

    data.posts.updateOne(currentPost);
};
