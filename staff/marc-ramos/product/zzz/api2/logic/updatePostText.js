import { data } from '../data/index.js'
import { validate } from './validate.js'

import { NotFoundError, OwnershipError } from '../errors.js'

export const updatePostText = (userId, postId, text) => { // edit post text
    validate.id(userId, 'userId')
    validate.id(postId, 'postId') // validamos el post id
    validate.text(text, 'text')

    const foundPost = data.posts.findOne(post => post.id === postId) // a traves del id buscamos el post 

    if (!foundPost) throw new NotFoundError('post not found')

    if (foundPost.author !== userId) throw new OwnershipError('user is not author of post') // si se intenta editar un post, la logica se protege y lanza un error si el id del usuario no es el mismo que el del post 

    foundPost.text = text // ponemos el nuevo texto en el text del foundPost

    foundPost.modifiedAt = new Date // same as new Date() ?

    data.posts.updateOne(post => post.id === postId, foundPost) // insertamos el post con el nuevo texto
}