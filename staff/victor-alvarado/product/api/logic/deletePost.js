// Importamos los módulos necesarios para manejar la base de datos y errores.
import { data } from '../data/index.js'
import { errors, validate } from 'com'

// Extraemos `ObjectId` del módulo `data` para convertir strings en IDs de MongoDB.
const { ObjectId } = data

// Extraemos los tipos de errores personalizados que vamos a manejar en la función.
const { SystemError, NotFoundError, OwnershipError } = errors

// Exportamos la función `deletePost` que recibe dos parámetros: el ID del usuario y el ID del post.
export const deletePost = (userId, postId) => {
    // Primero, validamos que los IDs sean correctos.
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    // Buscamos al usuario en la base de datos usando el `userId` proporcionado.
    return data.users.findOne({ _id: new ObjectId(userId) })
        .catch(error => { throw new SystemError(error.message) })  // Si ocurre un error en la búsqueda del usuario, lanzamos un SystemError.
        .then(user => {
            if (!user) throw new NotFoundError('user not found')  // Si no encontramos al usuario, lanzamos un NotFoundError.

            // Convertimos el `postId` en un `ObjectId` de MongoDB para usarlo en la búsqueda del post.
            const postObjectId = new ObjectId(postId)

            // Ahora buscamos el post en la base de datos usando el `postId`.
            return data.posts.findOne({ _id: postObjectId })
                .catch(error => { throw new SystemError(error.message) })  // Si ocurre un error en la búsqueda del post, lanzamos un SystemError.
                .then(post => {
                    if (!post) throw new NotFoundError('post not found')  // Si no encontramos el post, lanzamos un NotFoundError.

                    // Verificamos si el usuario es el autor del post. Si no lo es, lanzamos un OwnershipError.
                    if (post.author.toString() !== userId) throw new OwnershipError('user is not author of post')

                    // Si todo es correcto, eliminamos el post de la base de datos.
                    return data.posts.deleteOne({ _id: postObjectId })
                        .catch(error => { throw new SystemError(error.message) })  // Si ocurre un error al eliminar el post, lanzamos un SystemError.
                })
                .then(() => { })  // En este caso, no devolvemos nada después de eliminar el post.
        })
}
