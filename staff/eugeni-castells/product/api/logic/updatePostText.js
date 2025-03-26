import { errors, validate } from "com";
import { data } from "../data/index.js";

const { ObjectId } = data;

const { NotFoundError, OwnershipError, SystemError } = errors;

export const updatePostText = (userId, postId, text) => {
  validate.id(userId, "user id");
  validate.id(postId, "post id");
  validate.text(text, "post text");
  validate.maxLength(text, 500, "text maxLength");

  const userObjectId = new ObjectId(userId);

  return data.users
    .findOne({ _id: userObjectId })
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((user) => {
      if (!user) throw new NotFoundError("user not found");

      const postObjectId = new ObjectId(postId);

      return data.posts.findOne({ _id: postObjectId }).then((post) => {
        if (!post) throw new NotFoundError("post not found");

        if (post.author.toString() !== userId)
          throw new OwnershipError("user is not author of post");

        return data.posts
          .updateOne(
            { _id: postObjectId },
            { $set: { text, modifiedAt: new Date() } }
          )
          .catch((error) => {
            throw new SystemError(error.message);
          });
      });
    })
    .then(() => {});
};
