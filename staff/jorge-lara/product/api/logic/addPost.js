import { User, Post } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors;

export const addPost = (userId, text, image) => {
    validate.id(userId, 'userId');
    validate.text(text);
    validate.maxLength(text, 500)
    validate.url(image, 'url');
    validate.maxLength(image, 500, 'image');

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found');
            }

            const post = {
                author: userId,
                image,
                text
            }

            return Post.create(post)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}