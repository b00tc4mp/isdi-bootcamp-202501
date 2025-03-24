import { data } from "../data/index.js";
import { validate, errors } from "com";

const { ObjectId } = data; //==> data.ObjectId
const { NotFoundError, OwnershipError, SystemError } = errors;
export const deletePost = (userId, postId) => {
  validate.id(postId, "postId");
  validate.id(userId, "userId");

  //TODO POR QUE NO CREO UNA CONSTANTE CON EL ID DEL USUARIO
  //  const userObjectID = ObjectId(userId);

  return data.users
    .findOne({ _id: new ObjectId(userId) })
    .catch(() => {
      throw new SystemError("database error", error.message);
    })
    .then((user) => {
      if (!user) throw new NotFoundError("user not found");

      const postObjectID = new ObjectId(postId);

      return data.posts
        .findOne({ _id: postObjectID })
        .catch(() => {
          throw new SystemError("database error", error.message);
        })
        .then((post) => {
          if (!post) throw new NotFoundError("post not found");

          if (post.author.toString() !== userId)
            //==>comparo el id del autor del post con el id del usuario, por que lo convierto a string?
            throw new OwnershipError("user is not author of post");

          return data.posts.deleteOne({ _id: postObjectID }).catch(() => {
            throw new SystemError("database error", error.message);
          });
        });
    });
};
