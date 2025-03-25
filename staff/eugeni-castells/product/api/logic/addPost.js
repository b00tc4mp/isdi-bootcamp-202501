import { errors, validate } from "com";
import { data } from "../data/index.js";
const { ObjectId } = data;
const { NotFoundError, SystemError } = errors;

export const addPost = (id, image, text) => {
  validate.text(image, "image URL");
  validate.minLength(image, 10, "image URL");
  validate.text(text, "text");

  const userObjectId = new ObjectId(id);

  return data.users
    .findOne({ _id: userObjectId })
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((user) => {
      if (!user) throw new NotFoundError("user not found");

      const newPost = {
        author: userObjectId,
        image,
        text,
        createdAt: new Date(),
        modifiedAt: null,
        likes: [],
      };

      return data.posts.insertOne(newPost).catch((error) => {
        throw new SystemError(error.message);
      });
    })
    .then(() => {});
};
