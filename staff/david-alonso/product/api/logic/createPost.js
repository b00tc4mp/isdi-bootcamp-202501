import { data } from '../data/index.js'
import { validate } from './validate.js'

import { NotFoundError } from '../errors.js'

// Funcion para añadir un Posts nuevo
export const createPost = (userId, image, text) => {
    validate.id(userId, 'userId')
    validate.url(image)
    validate.maxLength(image, 500, 'image')
    validate.text(text)
    validate.maxLength(text, 500, 'text')

    const user = data.users.getById(userId)

    if (!user) throw new NotFoundError('user not found')

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