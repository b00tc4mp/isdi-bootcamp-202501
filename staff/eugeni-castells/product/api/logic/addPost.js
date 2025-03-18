import { validate } from "./validate.js";
import data from "../data/index.js";
import { NotFoundError } from "./errors.js";

export const addPost = (id, post) => {
  const { image, text } = post;

  validate.id(id, "user id");
  validate.text(image, "image URL");
  validate.minLength(image, 10, "image URL");
  validate.text(text, "text");

  const user = data.users.getById(id);

  if (!user) throw new NotFoundError("user not found");

  const newPost = {
    author: id,
    image: image,
    text: text,
    createdAt: new Date(),
    modifiedAt: null,
    likes: [],
  };

  data.posts.insertOne(newPost);
};
