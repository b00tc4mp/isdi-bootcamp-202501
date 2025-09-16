import { validate } from "../validate.js";
import { data } from "../../data/data.js";
export const modifyPost = (postId, image, title) => {
  // Validar el ID del post
  // this.validate.id(postId, "postId");

  // Validar la imagen y el título
  validate.text(image, "image");
  validate.maxLength(image, 1000, "image");
  validate.text(title, "title");
  validate.maxLength(title, 500, "title");

  // Obtener el ID del usuario actual
  const { userId } = data;

  // Buscar el post en la data
  const foundPost = data.posts.findOne((post) => post.id === postId);

  // Si no se encuentra el post, lanzar un error
  if (!foundPost) throw new NotFoundError("post not found");

  // Si el autor del post no es el usuario actual, lanzar un error
  if (foundPost.author !== userId)
    throw new OwnershipError("user is not author of post");

  // Actualizar el post con los nuevos datos
  foundPost.image = image;
  foundPost.title = title;
  foundPost.modifiedAt = new Date();

  // Actualizar el post en la data
  data.posts.updateOne(foundPost);
};
