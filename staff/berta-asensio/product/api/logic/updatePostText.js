import { data } from '../data/index.js'
import { validate } from './validate.js'

import { NotFoundError, OwnershipError } from '../errors.js'
//Esta función permite cambiar el texto del post.
//Le pasamos el userId y lo validamos.
export const updatePostText = (userId, postId, text) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    const foundPost = data.posts.findOne(post => post.id === postId)

    if (!foundPost) throw new NotFoundError('post not found')

    if (foundPost.author !== userId) throw new OwnershipError('user is not author of post')

    foundPost.text = text

    foundPost.modifiedAt = new Date()

    //ahora updateOne la hemos modificado en collection respecto a app, para que a parte del document (foundPost) tambien acepte una condición.
    data.posts.updateOne(post => post.id === postId, foundPost)
}