import { errors, validate } from "com";
import { User, Post } from "../data/index.js";

const { NotFoundError, OwnershipError, SystemError } = errors;

export const updatePostText = (userId, postId, text) => {
  validate.id(userId, "user id");
  validate.id(postId, "post id");
  validate.text(text, "post text");
  validate.maxLength(text, 500, "text maxLength");

  return Promise.all([
    User.findById(userId).lean(),
    Post.findById(postId).lean(),
  ])
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then(([user, post]) => {
      if (!user) throw new NotFoundError("user not found");
      if (!post) throw new NotFoundError("post not found");

      if (post.author.toString() !== userId)
        throw new OwnershipError("user is not author of the post");
      return Post.updateOne(
        { _id: postId },
        { $set: { text, modifiedAt: new Date() } }
      ).catch((error) => {
        throw new SystemError(error.message);
      });
    })
    .then(() => {});
};
