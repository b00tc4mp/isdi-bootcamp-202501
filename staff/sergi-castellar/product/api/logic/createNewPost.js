import { User, Post } from '../data/index.js'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export const createNewPost = (userId, imageSrc, textDescription) => {
    validate.id(userId, 'id')
    validate.url(imageSrc, 'url')
    validate.description(textDescription, 'description')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            const newPost = {
                authorId: userId,
                imageSrc,
                textDescription
            }

            return Post.create(newPost)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}
