import { data } from "../data/index.js";
import { validate, errors } from "com";
const { NotFoundError, SystemError } = errors;

const { ObjectId } = data;

export const toggleLikePost = (userId, postId) => {
  validate.id(postId, "postId");
  validate.id(userId, "userId");


  const userObjectId = new ObjectId(userId); //==>creo un objeto con el id del usuario para buscarlo en la base de datos y poder trabajar con el
  return data.posts
    .findOne({ id: postId })
    .catch(() => {
      throw new SystemError("database error", error.message);
    })

    .then((user) => {
      if (!user) throw new NotFoundError("user not found");

      const postObjectID = new ObjectId(postId); //==>creo un objeto con el id del post para buscarlo en la base de datos y poder trabajar con el

      return data.posts
        .findOne({ _id: postObjectID })
        .catch(() => {
          throw new SystemError("database error", error.message);
        })
        .then((post) => {
          
          if (!post) throw new NotFoundError("post not found");// ==> // Verifica si el post existe. Si no existe, lanza un error personalizado "NotFoundError".
      
          
          const { likes } = post;//==>Extrae la lista de "likes" del post. Esto es un array que contiene los IDs de los usuarios que han dado "like".
      
          // Busca el índice del usuario en el array de "likes". 
          // Se utiliza `findIndex` para encontrar la posición del ID del usuario que coincide con el `userId` proporcionado.
          const index = likes.findIndex(
              (userObjectId) => userObjectId.toString() === userId
          );
      
          // Si el índice es menor a 0, significa que el usuario no ha dado "like" todavía.
          if (index < 0) {
              // Agrega el ID del usuario al array de "likes" (el usuario da "like").
              likes.push(userObjectId);
          } else {
              // Si el índice es mayor o igual a 0, significa que el usuario ya dio "like".
              // En este caso, elimina el ID del usuario del array (el usuario quita el "like").
              likes.splice(index, 1);
          }

          return data.posts
            .updateOne({ _id: postObjectID }, { $set: { likes } })
            .catch(() => {
              throw new SystemError("database error", error.message);
            })
            .then(() => {});
        });
    });
};
