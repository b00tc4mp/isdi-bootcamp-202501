import { data } from '../data/index.js'
import { validate } from './validate.js'

export const addPost = (text, image) => {
    validate.text(text, 'title');
    validate.url(image, 'url');

    const { userId } = data;

    let post = {
        author: userId,
        image: image,
        text: text,
        createdAt: new Date(),
        modifiedAt: null,
        likes: []
    }

    data.posts.insertOne(post);
}