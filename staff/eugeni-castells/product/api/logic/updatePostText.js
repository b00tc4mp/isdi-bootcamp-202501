import { validate } from "./validate.js";
import data from "../data/index.js";
import { NotFoundError, OwnershipError } from "./errors.js";

export const updatePostText = (userId, postId, text) => {
  validate.id(userId, "post id");
  validate.id(postId, "post id");
  validate.text(text, "post text");
  validate.maxLength(text, 500, "text maxLength");

  const post = data.posts.findOne((post) => post.id === postId);

  if (!post) throw new NotFoundError("post not found");

  if (post.author !== userId)
    throw new OwnershipError("user is not author of post");

  post.text = text;

  post.modifiedAt = new Date();

  data.posts.updateOne((post) => post.id === postId, post);
};
