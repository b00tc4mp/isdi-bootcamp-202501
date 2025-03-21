import { data } from "../data/index.js";
import { errors, validate } from "com";
const { NotFoundError, SystemError } = errors;
const { ObjectId } = data;

export const updatePostLikes = (userId, postId) => {
  validate.id(userId, "user id");
  validate.id(postId, "post id");

  const userObjectId = new ObjectId(userId);

  const postObjectId = new ObjectId(postId);

  return data.users
    .findOne({ _id: userObjectId })
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((user) => {
      if (!user) throw new NotFoundError("user not found");

      return data.posts
        .findOne({ _id: postObjectId })
        .catch((error) => {
          throw new SystemError(error.message);
        })
        .then((postFound) => {
          if (!postFound) throw new NotFoundError("Post not found");

          const { likes } = postFound;

          const index = likes.findIndex(
            (userObjectId) => userObjectId.toString() === userId
          );

          if (index > -1) likes.splice(index, 1);
          else likes.push(userObjectId);

          return data.posts
            .updateOne({ _id: postObjectId }, { $set: { likes } })
            .catch((error) => {
              throw new SystemError(error.message);
            })
            .then(() => {});
        });
    });
};
