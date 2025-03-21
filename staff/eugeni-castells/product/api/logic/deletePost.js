import { errors, validate } from "../../com/index.js";
import { data } from "../data/index.js";
const { ObjectId } = data;
const { OwnershipError, NotFoundError } = errors;

export const deletePost = (userId, postId) => {
  validate.id(postId, "id");
  validate.id(userId, "user id");

  return data.posts
    .findOne({ _id: new ObjectId(postId) })
    .catch((error) => {
      throw new Error(error.message);
    })
    .then((foundPost) => {
      if (!foundPost) throw new NotFoundError("post not found");

      if (foundPost.author.toString() !== userId)
        throw new OwnershipError("user is not author of post");

      return data.posts.deleteOne({ _id: new ObjectId(postId) });
    })
    .catch((error) => {
      throw new Error(error);
    });
};
