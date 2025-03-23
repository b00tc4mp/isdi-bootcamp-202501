// Importamos los módulos necesarios para manejar la base de datos y errores.
import { data } from '../data/index.js'
import { errors, validate } from 'com'

// Extraemos `ObjectId` del módulo `data` para convertir los strings en IDs de MongoDB.
const { ObjectId } = data

// Extraemos los tipos de errores personalizados que vamos a manejar en la función.
const { SystemError, NotFoundError, OwnershipError } = errors

// Exportamos la función `updatePostText` que recibe tres parámetros: el ID del usuario, el ID del post y el nuevo texto.
export const updatePostText = (userId, postId, text) => {
    // Primero, validamos que los parámetros sean correctos.
    validate.id(userId, 'userId')    // Validamos que el userId sea un ID válido.
    validate.id(postId, 'postId')    // Validamos que el postId sea un ID válido.
    validate.text(text, 'text')      // Validamos que el texto proporcionado sea válido.
    validate.maxLength(text, 400, 'text') // Validamos que el texto no tenga más de 400 caracteres.

    // Buscamos al usuario en la base de datos usando el `userId` proporcionado.
    return data.users.findOne({ _id: new ObjectId(userId) })
        .catch(error => { throw new SystemError(error.message) })  // Si ocurre un error en la búsqueda del usuario, lanzamos un SystemError.
        .then(user => {
            // Si no encontramos al usuario, lanzamos un NotFoundError.
            if (!user) throw new NotFoundError('user not found')

            // Convertimos el `postId` en un `ObjectId` de MongoDB para usarlo en la búsqueda del post.
            const postObjectId = new ObjectId(postId)

            // Ahora buscamos el post en la base de datos usando el `postId`.
            return data.posts.findOne({ _id: postObjectId })
                .catch(error => { throw new SystemError(error.message) })  // Si ocurre un error en la búsqueda del post, lanzamos un SystemError.
                .then(post => {
                    // Si no encontramos el post, lanzamos un NotFoundError.
                    if (!post) throw new NotFoundError('post not found')

                    // Verificamos si el usuario es el autor del post. Si no lo es, lanzamos un OwnershipError.
                    if (post.author.toString() !== userId) throw new OwnershipError('user is not author of post')

                    // Si todo es correcto, actualizamos el texto del post.
                    return data.posts.updateOne({ _id: postObjectId }, {
                        // Usamos la operación `$set` para actualizar el campo `text` y también la fecha `modifiedAt`.
                        $set: {
                            text,                         // Actualizamos el texto del post.
                            modifiedAt: new Date()        // Actualizamos la fecha de modificación del post.
                        }
                    })
                        .catch(error => { throw new SystemError(error.message) })  // Si ocurre un error al actualizar el post, lanzamos un SystemError.
                })
                .then(() => { })  // En este caso, no devolvemos nada después de actualizar el post.
        })
}
