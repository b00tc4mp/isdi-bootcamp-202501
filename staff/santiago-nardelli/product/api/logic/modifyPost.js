import { User, Post } from "../data/index.js";
import { validate, errors } from "com";


const { NotFoundError, OwnershipError, SystemError } = errors;

export const modifyPost = (userId, postId, title) => {
  validate.id(userId, "userId");
  validate.id(postId, "postId");
  validate.text(title, "title");
  validate.maxLength(title, 500, "title");

 return Promise.all([

    User.findById(userId).lean(), //==>busco el usuario en la base de datos
    Post.findById(postId).lean(), //==>busco el post en la base de datos
 ])
    .catch((error) => {
      throw new SystemError("database error", error.message);
    }) //==> Si hay un error, lanzar un error personalizado "SystemError".
    .then(([user, post])=>{
      
      if (!user) throw new NotFoundError("user not found"); //==> Si no existe el usuario, lanzar un error personalizado "NotFoundError".
      if (!post) throw new NotFoundError("post not found"); //==> Si no existe el post, lanzar un error personalizado "NotFoundError".
      if (post.author.toString() !== userId) throw new OwnershipError("user not owner of post"); //==> Si el ID del usuario que creó el post no coincide con el ID del usuario que está intentando modificarlo, lanzar un error personalizado "OwnershipError".

      return Post.updateOne({ _id: postId }, { $set: { title, modifiedAt: new Date } }) //==> Actualizo el título del post en la base de datos.
        .catch((error) => {
          throw new SystemError("database error", error.message); //==> Si hay un error, lanzar un error personalizado "SystemError".
        })
        .then(() => {}); //==> Devuelvo una promesa resuelta.

    })
};
