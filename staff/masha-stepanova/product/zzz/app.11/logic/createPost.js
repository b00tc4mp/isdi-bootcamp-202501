import { data } from '../data/index.js'
import { validate } from './validate.js'

export const createPost = (link, text) => {
    validate.url(link)
    validate.maxLength(1000)
    validate.text(text)
    validate.maxLength(500)

    const { userId } = data

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