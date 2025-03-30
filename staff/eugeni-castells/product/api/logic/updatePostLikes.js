import { Post, User } from "../data/index.js";
import { errors, validate } from "com";
const { NotFoundError, SystemError } = errors;

export const updatePostLikes = (userId, postId) => {
  validate.id(postId, "post id");
  validate.id(userId, "user id");

  return Promise.all([User.findById(userId), Post.findById(postId)])
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then(([user, post]) => {
      if (!user) throw new NotFoundError("user not found");

      if (!post) throw new NotFoundError("post not found");

      if (!post) throw new NotFoundError("Post not found");

      const { likes } = post;

      const index = likes.findIndex(
        (userObjectId) => userObjectId.toString() === userId
      );

      if (index > -1) likes.splice(index, 1);
      else likes.push(userId);

      return Post.updateOne({ _id: postId }, { $set: { likes } })
        .catch((error) => {
          throw new SystemError(error.message);
        })
        .then(() => {});
    });
};
