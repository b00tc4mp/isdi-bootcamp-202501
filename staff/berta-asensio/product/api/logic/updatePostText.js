import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { ObjectId } = data
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
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    return data.users.findOne({ _id: new ObjectId(userId) })
        .catch(error => { throw new SystemError (error.message) })
        .then(user => {
            if(!user) throw new NotFoundError ('user not found')

            const postObjectId = new ObjectId(postId)

            return data.posts.findOne({ _id: postObjectId })
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    if (!post) throw new NotFoundError('post not found')
                    
                    if (post.author.toString() !== userId) throw new OwnershipError('user is not author of post')

                    return data.posts.updateOne({ _id: postObjectId }, {$set:{
                        text,
                        modifiedAt : new Date
                        }
                    })
                        .catch(error => { throw new SystemError(error.message) })
                })
                .then(() => { })
        })
}