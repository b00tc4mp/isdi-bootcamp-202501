import { data } from "../data/index.js";
import { validate, errors } from "com";
const { NotFoundError, OwnershipError } = errors;

export const modifyPost = (userId, postId, title) => {
  // Validar el ID del post
  validate.id(postId, "postId");

  validate.text(title, "title");
  validate.maxLength(title, 500, "title");


  // Buscar el usuario en la data
  const user = data.users.getById(userId);
  if (!user) throw new NotFoundError("user not found");
  // Buscar el post en la data
  const foundPost = data.posts.findOne((post) => post.id === postId);

  // Si no se encuentra el post, lanzar un error
  if (!foundPost) throw new NotFoundError("post not found");

  // Si el autor del post no es el usuario actual, lanzar un error
  if (foundPost.author !== userId)
    throw new OwnershipError("user is not author of post");

  // Actualizar el post con los nuevos datos

  foundPost.title = title;
  foundPost.modifiedAt = new Date();

  // Actualizar el post en la data
  data.posts.updateOne((post) => post.id === postId, foundPost);
};
