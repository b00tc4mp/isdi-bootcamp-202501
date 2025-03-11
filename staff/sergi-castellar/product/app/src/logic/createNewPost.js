import { data } from './../data/index'

import { validate } from "./validate"

export const createNewPost = (imageSrc, textDescription) => {
    validate.url(imageSrc, 'url');
    validate.description(textDescription, 'description');

    const { userId } = data;

    const newPost = {
        authorId: userId,
        imageSrc: imageSrc,
        textDescription: textDescription,
        createdAt: new Date(),
        modifiedAt: null,
        likes: []
    };

    data.posts.insertOne(newPost, '01');
}
