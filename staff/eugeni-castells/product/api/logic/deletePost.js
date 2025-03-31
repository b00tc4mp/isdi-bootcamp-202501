import { errors, validate } from "../../com/index.js";
import { Post, User } from "../data/index.js";
const { OwnershipError, NotFoundError, SystemError } = errors;

export const deletePost = (userId, postId) => {
  debugger;
  validate.id(postId, "id");
  validate.id(userId, "user id");

  return Promise.all([
    User.findById(userId).lean(),
    Post.findById(postId).lean(),
  ])
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then(([user, foundPost]) => {
      if (!user) throw new NotFoundError("user not found");

      if (!foundPost) throw new NotFoundError("post not found");

      if (foundPost.author.toString() !== userId)
        throw new OwnershipError("user is not author of the post");

      return Post.deleteOne({ _id: postId }).catch((error) => {
        throw new SystemError(error.message);
      });
    })

    .then(() => {});
};
