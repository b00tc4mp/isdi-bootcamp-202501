import { User, Post } from "../data/index.js";
import { validate, errors } from "com";

const { NotFoundError, SystemError } = errors;

export const getPosts = (userId) => {
  validate.id(userId, "userId"); //==> valido que userId sea un id

  return Promise.all([
    User.findById(userId).lean(),
    Post.find().select('-__v').sort('-createdAt').populate("author", "name").lean(),
  ])
    .catch(error => {throw new SystemError(error.message)})
    .then(([user, posts]) => {
      if (!user) throw new NotFoundError(`User with id ${userId} not found`);

      posts.forEach((post) => {
        /*
         * Mongo por defecto me devuelve un objecto con el id del autor, por lo que tengo que convertirlo a string para poder usarlo en el front
         * y eliminar el id original de mongo, para quedarme con el id en formato string
         * 
         */
        post.id = post._id.toString(); //==> le agrego el id del autor al post
        delete post._id; //==> elimino el id original de mongo, para quedarme con el id en formato string
       


        /*
         * Mongo tiene asociado con el author un objecto con el id y el nombre del autor, por lo que tengo que convertirlo a string para poder usarlo en el front
         */
        if (post.author._id) {
          post.author.id = post.author._id.toString(); //==> le agrego el id del autor al post
          delete post.author._id; //==> elimino el id original de mongo
        }

        post.liked = post.likes.some((userObjectId) => userObjectId.toString() === userId); //==> recorro el array de likes y por cada userObjectId(que lo comparo en formato string) valido si es igual al userId que me pasaron por parametro, si es igual le asigno true, sino false
        post.likesCount = post.likes.length; //==> valido la cantidad de likes del post
        delete post.likes; //==> elimino el liked del post

        post.own = post.author.id === userId; //==> valido si el post es del usuario
      });

      return posts;
    });
};
