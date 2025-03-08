import { data } from '../data/index.js'

export const toggleLikePost = (postId) => {
    const { userId } = data;

    const foundPost = data.posts.findOne(post => post.id === postId);

    if (!foundPost) {
        throw new Error("post not found");
    }

    let userIdFound = false;

    for (let i = 0; i < foundPost.likes.length && !userIdFound; i++) {
        const id = foundPost.likes[i];

        if (id === userId) {
            userIdFound = true
        }
    }


    if (!userIdFound) {
        foundPost.likes.push(userId);
    } else {
        const likes = [];

        for (let i = 0; i < foundPost.likes.length; i++) {
            const id = foundPost.likes[i];

            if (id !== userId) {
                likes.push(id);
            }
        }

        foundPost.likes = likes;
    }
    data.posts.updateOne(foundPost);
}