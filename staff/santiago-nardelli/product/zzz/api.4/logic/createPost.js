import { User, Post } from "../data/index.js";
import { validate, errors } from "com";

const { NotFoundError, SystemError } = errors;

export const createPost = (userId, image, title) => {
  //valido que la imagen y el titulo sean de tipo string
  validate.id(userId, "userID");
  validate.text(image, "image");
  validate.maxLength(1000);
  validate.text(title, "title");``
  validate.maxLength(500);


  return User
    .findById(userId).lean() //==>busco el usuario en la base de datos

    .catch((error) => {
      throw new SystemError("Error connecting to database", error.message);
    })

    .then((user) => {
      if (!user) throw new NotFoundError("user not found");

      const post = {
        // ==>creo un objeto post con los datos que recibo
        author: userId,
        image,
        title
      };

      return Post
        .create(post) //==>inserto el post en el array de posts
        .catch((error) => {
          //==> si hay un error al insertar el post
          throw new SystemError(error.message);
        });
    })

    .then(() => {});
};
