
import { User, Post } from '../data/index.js'

import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export const createPost = (userId, image, text) => {
    validate.id(userId, 'userId')       // Verifica que `userId` sea un ID válido.
    validate.url(image, 'image')        // Verifica que `image` sea una URL válida.
    validate.maxLength(image, 500, 'image') // Asegura que la URL no supere los 500 caracteres.
    validate.text(text, 'text')         // Verifica que `text` sea un texto válido.
    validate.maxLength(text, 500, 'text')   // Asegura que el texto no supere los 500 caracteres.

    // **BUSCAMOS AL USUARIO EN LA BASE DE DATOS**
    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            // **CREAMOS EL POST**
            const post = {
                author: userId,  // Guardamos el ID del usuario como autor.
                image,                 // URL de la imagen.
                text                  // Texto del post.                
            }

            // Insertamos el post en la base de datos.
            return Post.create(post)
                .catch(error => { throw new SystemError(error.message) })
        })
        // No devolvemos nada al final.
        .then(() => { })
}