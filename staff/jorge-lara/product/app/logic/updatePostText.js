import { data } from '../data/index.js'

export const updatePostText = (postId, text) => {

    const { userId } = data;

    const foundPost = data.posts.findOne(post => post.id === postId);

    if (!foundPost) throw new Error('post not found');

    if (foundPost.author !== userId) throw new Error('user is not author of post');

    foundPost.text = text;
    foundPost.modifiedAt = new Date;

    data.posts.updateOne(foundPost);
}