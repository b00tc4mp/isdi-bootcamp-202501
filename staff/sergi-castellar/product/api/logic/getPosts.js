import { data } from './../data/index.js';
import { validate } from 'com';

export const getPosts = (userId) => {
    validate.id(userId, 'id')
    const posts = data.posts.getAll();

    const aggregatedPosts = [];

    posts.forEach(post => {
        let liked;
        post.likes.includes(userId) ? liked = true : liked = false;

        const author = data.users.getById(post.authorId);

        const { id, imageSrc, textDescription, createdAt, modifiedAt, likes } = post;

        const aggregatedPost = {
            id: id,
            author: { ...author },
            imageSrc: imageSrc,
            textDescription: textDescription,
            createdAt: new Date(createdAt),
            modifiedAt: modifiedAt && new Date(modifiedAt),
            likes: likes,
            liked: liked,
            own: post.authorId === userId
        };

        aggregatedPosts.push(aggregatedPost);
    });

    return aggregatedPosts;
};
