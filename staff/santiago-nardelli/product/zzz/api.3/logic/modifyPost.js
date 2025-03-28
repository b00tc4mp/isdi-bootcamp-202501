import { data } from "../data/index.js";
import { validate, errors } from "com";

const { ObjectId } = data;
const { NotFoundError, OwnershipError, SystemError } = errors;

export const modifyPost = (userId, postId, title) => {
  validate.id(userId, "userId");
  validate.id(postId, "postId");
  validate.text(title, "title");
  validate.maxLength(title, 500, "title");

  const userObjectId = new ObjectId(userId); //==>creo un objeto con el id del usuario para buscarlo en la base de datos y poder trabajar con el

  return data.users
    .findOne({ _id: userObjectId }) // ==> Buscar el usuario en la base de datos
    .catch(() => {
      throw new SystemError("database error", error.message);
    }) //==> Si hay un error, lanzar un error personalizado "SystemError".
    .then((user) => {
      //==> Si no hay error, ejecutar la siguiente función
      if (!user) throw new NotFoundError("user not found"); //==> Verifica si el usuario existe. Si no existe, lanza un error personalizado "NotFoundError".

      const postObjectID = new ObjectId(postId); //==>creo un objeto con el id del post para buscarlo en la base de datos y poder trabajar con el
      return data.posts
        .findOne({ _id: postObjectID }) //==> Buscar el post en la base de datos
        .catch(() => {
          throw new SystemError("database error", error.message);
        }) //==> Si hay un error, lanzar un error personalizado "SystemError".
        .then((post) => {
          if (!post) throw new NotFoundError("post not found"); //==> Verifica si el post existe. Si no existe, lanza un error personalizado "NotFoundError".
          //TODO POR QUE TOSTRING?
          if (post.author.toString() !== userId)
            throw new OwnershipError("user is not author of post"); //==> Verifica si el autor del post es el usuario actual. Si no es el autor, lanza un error personalizado "OwnershipError".

          return data.posts.updateOne(
            { _id: postObjectID },
            {
              $set: {
                title,
                modifiedAt: new Date(),
              },
            }
          ); //==> Actualiza el post en la base de datos
        })
        .catch(() => {
          throw new SystemError("database error", error.message);
        }); //==> Si hay un error, lanzar un error personalizado "SystemError".
    })
    .then(() => {}); //==> Si no hay error, devolver un objeto vacío.
};
