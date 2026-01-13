import { User, Post } from "../data/index.js"
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

/*
-Creamos función toggleLikePost con dos parámetros.
-Validamos los ID's.
-Convertimos userId en un ObjectId.
-Buscamos usuario en la base de datos.
  -Si hay algun error: SystemError.
  -Si no, entramos en el then:
    -Si no se encuentra el usuario, notFoundError.
    -Convertimos postId en un ObjectId.
    -Buscamos el post en la colección de posts
    -Si hay un error durante la busqueda: System error.
    -Happypath: 
      -Si no encontramos el post: notFoundError.
      -Buscamos si el usuario ya ha dado like con findIndex:
        -Si index = -1, el usuario NO ha dado like.
        -Si index >= 0, el usuario ya ha dado like.
      -Si el usuario no ha dado like: lo agrega(push)
      -SI el usuario ha dado like, lo quita (splice)
      -Actualizamos el post en la colección de posts con el Id del post y actualizando el like.
      -System error si hay algun error durante la actualización.
      -Si la operación fue exitosa, then vacío para no devolver nada.
*/

export const toggleLikePost = (userId, postId) => {
  validate.id(userId)
  validate.id(postId)

  return Promise.all([
    User.findById(userId).lean(),
    Post.findById(postId).lean()
  ])
    .catch(error => { throw new SystemError(error.message) })
    .then(([user, post]) => {
      if(!user) throw new NotFoundError("user not found")
      if (!post) throw new NotFoundError("post not found")

          const { likes } = post

          const index = likes.findIndex(userObjectId => userObjectId.toString() === userId)

          if (index < 0) {
            post.likes.push(userId)
          } else {
            post.likes.splice(index, 1)
          }

          return Post.updateOne({ _id: postId }, { $set: { likes } })
            .catch(error => { throw new SystemError(error.message) })
            .then(() => { })
        }) 
}
