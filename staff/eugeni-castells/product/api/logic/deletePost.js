import { errors, validate } from "../../com/index.js";
import data from "../data/index.js";

const { OwnershipError, NotFoundError } = errors;

export const deletePost = (userId, postId) => {
  validate.id(postId, "id");
  validate.id(userId, "user id");

  const foundPost = data.posts.findOne((post) => post.id === postId);

  if (!foundPost) throw new NotFoundError("post not found");

  if (foundPost.author !== userId)
    throw new OwnershipError("user is not author of post");

  data.posts.deleteOne((post) => post.id === postId);
};
