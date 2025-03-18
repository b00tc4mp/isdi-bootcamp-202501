import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { NotFoundError } = errors

export const createPost = (userId, link, text) => {
    validate.id(userId, 'userId')
    validate.url(link, 'image')
    validate.maxLength(link, 1000, 'link')
    validate.text(text, 'text')
    validate.maxLength(text, 500, 'text')

    const user = data.users.getById(userId)

    if (!user) throw new NotFoundError('user not found')

    const newPost = {
        author: userId,
        image: link,
        text: text,
        createdAt: new Date(),
        modifiedAt: null,
        likes: []
    }

    data.posts.insertOne(newPost)
}