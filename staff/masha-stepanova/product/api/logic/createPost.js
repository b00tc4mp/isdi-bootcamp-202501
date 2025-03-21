import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { ObjectId } = data
const { NotFoundError, SystemError } = errors

export const createPost = (userId, image, text) => {
    validate.id(userId, 'userId')
    validate.url(image, 'image')
    validate.maxLength(image, 1000, 'image')
    validate.text(text, 'text')
    validate.maxLength(text, 500, 'text')

    const userObjectId = new ObjectId(userId)

    return data.users.findOne({ _id: userObjectId })
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

            return data.posts.insertOne(newPost)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}