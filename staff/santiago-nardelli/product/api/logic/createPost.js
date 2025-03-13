import { data } from "../data/index.js";
import { validate } from "./validate.js";

export const createPost = (userID, image, title) => {
  //valido que la imagen y el titulo sean de tipo string
  validate.id(userID, "userID");
  validate.text(image, "image");
  validate.maxLength(1000);
  validate.text(title, "title");
  validate.maxLength(500);

  //creo un objeto post con los datos que recibo
  const post = {
    author: userID,
    image: image,
    title: title,
    userId: userID,
    createdAt: new Date(),
    modifiedAt: null,
    likes: [],
  };

  data.posts.insertOne(post);
};



