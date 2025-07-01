import { data } from '../data/index.js'
import { NotFoundError } from '../errors.js'
import { validate } from './validate.js'

export const createPost = (userId, image, text) => {
    validate.id(userId, 'userId')
    validate.url(image, 'image')
    validate.maxLength(image, 500, 'image')
    validate.text(text, 'text')
    validate.maxLength(text, 500, 'text')

    const user = data.users.getById(userId)

    if (!user) throw new NotFoundError('user not found')

    const post = {
        author: userId,
        image: image,
        text: text,
        createdAt: new Date(),
        modifiedAt: null,
        likes: []
    }

    data.posts.insertOne(post)
}