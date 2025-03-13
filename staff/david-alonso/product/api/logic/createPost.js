import { data } from '../data/index.js'
import { validate } from './validate.js'

// Funcion para añadir un Posts nuevo
export const createPost = (userId, image, text) => {
    validate.id(userId, 'userId')
    validate.url(image)
    validate.text(text)

    // Datos que usara
    const post = {
        author: userId,
        image: image,
        text: text,
        createdAt: new Date().toLocaleString(),
        modifiedAt: null,
        likes: []
    }

    data.posts.insertOne(post)
}