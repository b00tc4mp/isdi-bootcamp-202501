import { data } from '../data/index.js'
import { validate } from './validate.js'

export const createPost = (image, text) => {
    validate.url(image, 'image')
    validate.maxLength(1000)
    validate.text(text, 'text')
    validate.maxLength(500)

    const { userId } = data

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