import { validate } from "./validate";
import data from "../data";

const addPost = (post) => {
  const { image, text } = post;

  validate.text(image, "image URL");
  validate.minLength(image, 10, "image URL");
  validate.text(text, "text");

  const newPost = {
    author: data.userId,
    image: image,
    text: text,
    createdAt: new Date(),
    modifiedAt: null,
    likes: [],
  };

  data.posts.insertOne(newPost);
};
export default addPost;
