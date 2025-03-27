import { User, Post, ObjectId } from '../data/index.js'
import { errors, validate } from 'com'

const { NotFoundError, SystemError } = errors

export const createPost = (userId, image, text) => {
    validate.id(userId, 'userId')
    validate.url(image, 'image')
    validate.maxLength(image, 1000, 'image')
    validate.text(text, 'text')
    validate.maxLength(text, 500, 'text')

    const userObjectId = new ObjectId(userId)

    return User.findOne({ _id: userObjectId })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            const newPost = {
                author: userObjectId,
                image,
                text,
                createdAt: new Date(),
                modifiedAt: null,
                likes: []
            }

            return Post.create(newPost)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}