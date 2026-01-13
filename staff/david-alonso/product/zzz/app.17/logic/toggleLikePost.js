import { data } from '../data/index.js'
import { validate } from './validate.js'

import { NotFoundError } from '../errors.js'

// Agrega o elimina el Like de los Posts
export const toggleLikePost = postId => {
    validate.id(postId, 'postId')

    const { userId } = data
    // Variable Encontrar el Post
    const foundPost = data.posts.findOne(post => post.id === postId)

    // Si foundPost es undefined o null, lanza un error NotFoundError y detiene la ejecución
    if (!foundPost) throw new NotFoundError('post not found')

    // Comprueba si el usuario ya ha dado "like"
    // Se incicia UserIdFound como false
    let userIdFound = false

    // Bucle que recorre la lista de Likes de "foundPost.likes"
    for (let i = 0; i < foundPost.likes.length && !userIdFound; i++) {
        const Id = foundPost.likes[i]

        // Si el usuario ya está en la lista (userId === data.userId), se cambia userIdFound a true y se detiene el bucle.
        if (Id === userId)
            userIdFound = true
    }

    // Si el usuario NO ha dado "like" se lo añade
    if (!userIdFound)
        // Si userIdFound es false, se añade "data.userId" al final de foundPost.likes
        foundPost.likes[foundPost.likes.length] = userId

    else { // Si el usuario Si ha dado "like" se lo elimina
        const likes = []  // Se crea un nuevo array vacío likes

        // Bucle que recorre la lista de "likes" del Post
        for (let i = 0; i < foundPost.likes.length; i++) {
            const id = foundPost.likes[i]

            // // Se copian todos los userId, excepto data.userId, al nuevo array
            if (id !== data.userId)
                likes[likes.length] = id
        }

        // Se actualiza foundPost.likes con este nuevo array, eliminando así el "like" del usuario
        foundPost.likes = likes
    }

    data.posts.updateOne(foundPost)
}