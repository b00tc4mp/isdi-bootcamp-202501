import { data } from '../data/index.js'
import { validate } from './validate.js'

import { NotFoundError, OwnershipError } from '../errors.js'

export const deletePost = (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId') // validamos el id

    const foundPost = data.posts.findOne(post => post.id === postId) // buscamos si hay algun post con nuestro id

    if (!foundPost) throw new NotFoundError('post not found')

    if (foundPost.author !== userId) throw new OwnershipError('user is not author of post') // si el id del post no coincide con el nuestro, salta un error

    data.posts.deleteOne(post => post.id === postId) // eliminamos el post y actualizamos la localStorage con el .deleteOne
}