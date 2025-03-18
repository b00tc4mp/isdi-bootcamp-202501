import { data } from '../data/index.js'
import { validate } from './validate.js'

import { NotFoundError, OwnershipError } from '../errors.js'
//Esta función permite cambiar el texto del post.
//Le pasamos el userId y lo validamos.
export const updatePostText = (userId, postId, text) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    //Comprobamos que el usuario exista
    const user = data.users.getById(userId)

    if(!user) throw new NotFoundError ('user not found')
        
    //Comprobamos que el post exista
    const post = data.posts.findOne(post => post.id === postId)

    if (!post) throw new NotFoundError('post not found')

    if (post.author !== userId) throw new OwnershipError('user is not author of post')

    post.text = text

    post.modifiedAt = new Date()

    //ahora updateOne la hemos modificado en collection respecto a app, para que a parte del document (postost) tambien acepte una condición.
    data.posts.updateOne(post => post.id === postId, post)
}