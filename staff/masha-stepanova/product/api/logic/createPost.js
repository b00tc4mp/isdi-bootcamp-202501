import { User, Post } from '../data/index.js'
import { errors, validate } from 'com'

const { NotFoundError, SystemError } = errors

export const createPost = (userId, image, text) => {
    validate.id(userId)
    validate.url(image)
    validate.maxLength(image, 1000, 'image')
    validate.text(text)
    validate.maxLength(text, 500, 'text')

    return User.findById(userId).lean()
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