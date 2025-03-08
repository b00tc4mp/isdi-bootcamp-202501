import { validate } from "./validate";
import data from "../data";

const updatePostText = (postId, text) => {
  validate.id(postId, "post id");

  const post = data.posts.getById(postId);

  post.text = text;

  post.modifiedAt = new Date();

  data.posts.updateOne(post);
};

export default updatePostText;
