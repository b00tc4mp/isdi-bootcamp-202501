import { data } from '../data/index.js'

export const deletePost = (postId) => {

    const { userId } = data;

    const foundPost = data.posts.findOne(post => post.id === postId)

    if (!foundPost) {
        throw new Error('post not found');
    }

    if (foundPost.author !== userId) {
        throw new Error('user is not author of the post');
    }

    data.posts.deleteOne(post => post.id === postId)

}