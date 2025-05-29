import {validate} from "../validate.js";
import { data } from "../../data/data.js";

export const createPost = (image, title) => {
  //valido que la imagen y el titulo sean de tipo string
  validate.text(image, "image");
  validate.maxLength(1000);
  validate.text(title, "title");
  validate.maxLength(500);

  const { userId } = data;
  //creo un objeto post con los datos que recibo
  const post = {
    author: userId,
    image: image,
    title: title,
    userId: userId,
    createdAt: new Date(),
    modifiedAt: null,
    likes: [],
  };

  data.posts.insertOne(post);
};
