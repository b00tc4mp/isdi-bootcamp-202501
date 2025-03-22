import { data } from "../data/index.js";
import {validate, errors} from 'com'

const { NotFoundError } = errors;

export const createPost = (userID, image, title) => {
  //valido que la imagen y el titulo sean de tipo string
  validate.id(userID, "userID");
  validate.text(image, "image");
  validate.maxLength(1000);
  validate.text(title, "title");
  validate.maxLength(500);


  //busco el usuario por id en el array de usuarios y si no lo encuentro lanzo un error
  //el id lo busco en mi sessionStorage
  const user = data.users.getById(userID);
  if (!user) throw new NotFoundError("user not found");

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

  //inserto el post en el array de posts
  data.posts.insertOne(post);
};



