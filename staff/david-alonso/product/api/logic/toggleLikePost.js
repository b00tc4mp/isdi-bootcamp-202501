// CAMBIAR LIKE A UN POST

import { data } from '../data/index.js'
import { validate } from './validate.js'

import { NotFoundError } from '../errors.js'

// Agrega o elimina el Like de los Posts
export const toggleLikePost = (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    const user = data.users.getById(userId)

    if (!user) throw new NotFoundError('user not found')

    // Variable Encontrar el Post
    const post = data.posts.findOne(post => post.id === postId)

    // Si foundPost es undefined o null, lanza un error NotFoundError y detiene la ejecución
    if (!post) throw new NotFoundError('post not found')

    const index = post.likes.findIndex(likeUserId => likeUserId === userId)

    if (index < 0)
        post.likes.push(userId)
    else
        post.likes.splice(index, 1)

    data.posts.updateOne(post => post.id === postId, post)

}