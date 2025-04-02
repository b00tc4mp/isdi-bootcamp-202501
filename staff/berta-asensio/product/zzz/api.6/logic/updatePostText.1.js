import { User, Post } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError, OwnershipError } = errors

/*
-Definimos updatePostText y le pasamos sus parámetros.
-Validamos los ID's.
-Buscamos al usuario del post en la base de datos por su ID:
    -Si hay un error durante la búsqueda, SystemError.
    -Happypath: entramos en el then:
        -Comprobamos si el usuario existe y si no existe NotFoundError.
        -Buscamos el post el la base de datos por su ID (antes lo pasamos a ObjectId para la busqueda en Mongo):
            -Si hay un error durante la búsqueda, SystemError.
            -Happypath: entramos en el then:
                -Si no encuentra el post, NotFoundError.
                -Verificamos que el usuario es el autor del post (pasando el ObjectId a string) y comparando
                el post del autor con user Id. Si no coinciden: OwnerShipError.
                -Si coinciden: actualizamos el post:
                    -Buscamos el post por su ID.
                    -Actualizamos el campo de text.
                    -Añadimos nueva fecha de modificación.
                    -Finalizamos con una promesa vacía.
 */

export const updatePostText = (userId, postId, text) => {
    validate.id(userId)
    validate.id(postId)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError (error.message) })
        .then(user => {
            if(!user) throw new NotFoundError ('user not found')

            return Post.findById(postId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    if (!post) throw new NotFoundError('post not found')
                    
                    if (post.author.toString() !== userId) throw new OwnershipError('user is not author of post')

                    return Post.updateOne({ _id: postId }, {$set:{
                        text,
                        modifiedAt : new Date
                        }
                    })
                        .catch(error => { throw new SystemError(error.message) })
                })
                .then(() => { })
        })
}