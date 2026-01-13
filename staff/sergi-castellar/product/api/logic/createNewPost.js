import { User, Post } from '../data/index.js'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export const createNewPost = (userId, image, text) => {
    validate.id(userId, 'id')
    validate.url(image, 'url')
    validate.description(text, 'description')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            const newPost = {
                author: userId,
                image,
                text
            }

            return Post.create(newPost)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}
