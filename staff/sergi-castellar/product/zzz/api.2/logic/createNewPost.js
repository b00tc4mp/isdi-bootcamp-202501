import { data } from '../data/index.js'
import { validate, errors } from 'com'

const { NotFoundError } = errors

export const createNewPost = (userId, imageSrc, textDescription) => {
    validate.id(userId, 'id')
    validate.url(imageSrc, 'url')
    validate.description(textDescription, 'description')

    const user = data.users.getById(userId)

    if (!user) throw new NotFoundError('user not found')

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
