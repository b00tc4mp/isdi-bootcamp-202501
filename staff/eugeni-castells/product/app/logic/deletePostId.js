import { validate } from "./validate";
import data from "../data";

const deletePost = (postId) => {
  validate.id(postId, "id");

  const { userId } = data;

  const foundPost = data.posts.findOne((post) => post.id === postId);

  if (!foundPost) throw new NotFoundError("post not found");

  if (foundPost.author !== userId)
    throw new OwnershipError("user is not author of post");

  data.posts.deleteOne((post) => post.id === postId);
};

export default deletePost;
