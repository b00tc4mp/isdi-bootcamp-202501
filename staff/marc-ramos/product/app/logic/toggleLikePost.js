import { data } from '../data/index.js'
import { validate } from './validate.js'

import { NotFoundError } from '../errors.js'

export const toggleLikePost = (postId) => {
    validate.id(postId, 'postId')

    const {userId} = data

    // llamamos a la funcion para encontrar post
    const foundPost = data.posts.findOne(post => post.id === postId)

    // si no encontramos el post, lanzamos error
    if (!foundPost) throw new NotFoundError('post not found')

    let userIdFound = false

    // recorremos los likes del foundPost para ver si esta nuestro id
    for (let i = 0; i < foundPost.likes.length && !userIdFound; i++) {
        const id = foundPost.likes[i]

        if (id === userId)
            userIdFound = true
    }

    // si no encontramos nuestro id en el array de likes, lo ponemos al final
    if (!userIdFound)
        foundPost.likes[foundPost.likes.length] = userId

    // si encontramos nuestro id en el array id's de likes, recorremos el array y insertamos todos los id menos el nuestro en un nuevo array creado de 0, lo machacamos y lo subimos con el .updateOne
    else {
        const likes = []

        for (let i = 0; i < foundPost.likes.length; i++) {
            const id = foundPost.likes[i]

            if (id !== userId)
                likes[likes.length] = id
        }

        foundPost.likes = likes
    }

    data.posts.updateOne(foundPost)
}