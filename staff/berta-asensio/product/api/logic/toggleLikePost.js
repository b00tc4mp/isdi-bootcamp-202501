import { data } from '../data/index.js'
import { validate } from './validate.js'

import { NotFoundError } from '../errors.js'

//el userId le dará like a postId

export const toggleLikePost = (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    const foundPost = data.posts.findOne(post => post.id === postId)

    if (!foundPost) throw new NotFoundError('post not found')

    let userIdFound = false

    for (let i = 0; i < foundPost.likes.length && !userIdFound; i++) {
        const id = foundPost.likes[i]

        if (id === userId)
            userIdFound = true
    }

    if (!userIdFound)
        foundPost.likes[foundPost.likes.length] = userId
    else {
        const likes = []

        for (let i = 0; i < foundPost.likes.length; i++) {
            const id = foundPost.likes[i]

            if (id !== userId)
                likes[likes.length] = id
        }

        foundPost.likes = likes
    }

    /*adaptamos la función con un callback. ya que en collection hemos
    modificado la función updateOne para que nos permita pasar una condición.
    Asi que le marcamos una condición, y un document.
    */
    data.posts.updateOne(post => post.id === postId, foundPost)
}
