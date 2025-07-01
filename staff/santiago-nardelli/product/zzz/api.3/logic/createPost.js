import { data } from "../data/index.js";
import { validate, errors } from "com";

const { ObjectId } = data;
const { NotFoundError, SystemError } = errors;

export const createPost = (userID, image, title) => {
  //valido que la imagen y el titulo sean de tipo string
  validate.id(userID, "userID");
  validate.text(image, "image");
  validate.maxLength(1000);
  validate.text(title, "title");
  validate.maxLength(500);

  const userObjectID = new ObjectId(userID); //==>creo un objeto con el id del usuario

  return data.users
    .findOne({ _id: userObjectID }) //==>busco el usuario en la base de datos

    .catch(() => {
      throw new SystemError("Error connecting to database", error.message);
    })

    .then((user) => {
      if (!user) throw new NotFoundError("user not found");

      const post = {
        // ==>creo un objeto post con los datos que recibo
        author: userObjectID,
        image: image,
        title: title,
        createdAt: new Date(),
        modifiedAt: null,
        likes: [],
      };

      return data.posts
        .insertOne(post) //==>inserto el post en el array de posts
        .catch(() => {
          //==> si hay un error al insertar el post
          throw new SystemError(error.message);
        });
    })

    .then(() => {});
};
