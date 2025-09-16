import {data} from '../data/index.js';
import {validate, errors} from 'com';
const { NotFoundError } = errors;

export const toggleLikePost = (userId, postId) => {
  validate.id(postId, "postId");
  validate.id(userId, "userId");
 
  

  // me traigo los posts de la data para trabajar sobre ellos
  let foundPost = data.posts.findOne(post => post.id === postId);

  // si no encuentra el post tira un error
  if (!foundPost) throw new NotFoundError("post not found");

  // declaro una variable booleana para saber si el user ya le dio like al post y la inicializo en false
  let userIdFound = false;
  //recorro el array de likes del post
  for (let i = 0; i < foundPost.likes.length && !userIdFound; i++) {
    const id = foundPost.likes[i];

    if (id === userId) userIdFound = true;
  }
  // Si el usuario no ha dado like, se añade su id al array de likes
  if (!userIdFound) foundPost.likes[foundPost.likes.length] = userId;
  else {
    // Si el usuario ya ha dado like, se elimina su id del array de likes
    //Si userIdFound es true, se crea un nuevo array likes y se recorre el array de likes del post. Se añaden todos los id al nuevo array excepto el userId del usuario actual. Luego, se actualiza el array de likes del post con el nuevo array likes.
    const likes = [];

    for (let i = 0; i < foundPost.likes.length; i++) {
      const id = foundPost.likes[i];

      if (id !== userId) likes[likes.length] = id;
    }

    foundPost.likes = likes;
  }
  // Actualizo el post en la data

  data.posts.updateOne(post => post.id === postId, foundPost);
};
