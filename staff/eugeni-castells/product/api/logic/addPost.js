import { errors, validate } from "com";
import { User, Post } from "../data/index.js";
const { NotFoundError, SystemError } = errors;

export const addPost = (id, image, text) => {
  validate.id(id, "user id");
  validate.text(image, "image URL");
  validate.maxLength(image, 500, "image");
  validate.minLength(image, 10, "image URL");
  validate.text(text, "text");
  validate.maxLength(text, 500, "text max length");

  return User.findById(id)
    .lean()
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((user) => {
      if (!user) throw new NotFoundError("user not found");

      const newPost = {
        author: id,
        image,
        text,
      };

      return Post.create(newPost).catch((error) => {
        throw new SystemError(error.message);
      });
    })
    .then(() => {});
};
