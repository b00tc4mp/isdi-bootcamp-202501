import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { ObjectId } = data
const { SystemError, NotFoundError, OwnershipError } = errors

/*
-Definimos deletePost con dos parámetros: el ID del usuario que quiere eliminar un post y 
el ID del post que se quiere eliminar.
-Validamos que el userID y el postId sean válidos.
-Buscamos en la colección users de la base de datos a un usuario y se convierte a ObjectId porque
Mongo usa ese formato.
-Se lanza SystemError si ocurre algun error en la base de datos.
-Entramos en el then:
    -Si findOne devuelve null, significa que el usuario no se ha encontrado y lanzamos error.
    -Convertimos el post a ObjectId y lo almacenamos en la variable postObjectId para poder buscarlo
    en la base de datos en la colección de posts.
    -Buscamos ese post.
    -Si hay algun error en la base de datos; SystemError.
    -Entramos en el siguiente then:
        -Si el post no se encuentra, lanzamos NotFoundError.
        -Verificamos si el usuairo es el post del autor:
            -Convertimos post.author a string porque es un ObjectId.
            -Comparamos si userId es el mismo que el del autor.
            -Si no coinciden, lanzamos OwnerShipError (el usuario no tiene permiso).
            -Si coinciden: llamamos a deleteOne para eliminar el post de la colección posts.
            -Lanzamos ErrorSystem por si falla algo en la base de datos al eliminar el post.
        -Devolvemos undefined si el post se eliminó correctamente ya que no necesitamos retornar nada.

*/
export const deletePost = (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    return data.users.findOne({ _id: new ObjectId(userId) })
        .catch(error => { throw new SystemError (error.message) })
        .then(user => {
            if(!user) throw new NotFoundError ('user not found')

            const postObjectId = new ObjectId(postId)

            return data.posts.findOne({ _id: postObjectId })
                .catch(error => { throw new SystemError(error.message) })
                .then( post => {
                    if(!post) throw new NotFoundError ('post not found')

                    if(post.author.toString() !== userId) throw new OwnershipError('user is not author of post')
                    
                    return data.posts.deleteOne({ _id: postObjectId })
                        .catch(error => { throw new SystemError(error.message) })
                })
                .then(() => { })
        })
}
