import { data } from "../data/index.js";
import { errors, validate } from 'com'

const { NotFoundError } = errors

//el userId le dará like a postId

export const toggleLikePost = (userId, postId) => {
  validate.id(userId, "userId");
  validate.id(postId, "postId");

  //Comprobamos que el usuario exista
  const user = data.users.getById(userId);

  if (!user) throw new NotFoundError("user not found");

  //Comprobamos que el post exista
  const post = data.posts.findOne(post => post.id === postId);

  if (!post) throw new NotFoundError("post not found");


  /* TODO ESTO LO SIMPLIFICAMOS Y CAMBIAMOS POR MËTODOS

  let userIdFound = false;

  for (let i = 0; i < foundPost.likes.length && !userIdFound; i++) {
    const id = foundPost.likes[i];

    if (id === userId) userIdFound = true;
  }

  if (!userIdFound) foundPost.likes[foundPost.likes.length] = userId;
  else {
    const likes = [];

    for (let i = 0; i < foundPost.likes.length; i++) {
      const id = foundPost.likes[i];

      if (id !== userId) likes[likes.length] = id;
    }

    foundPost.likes = likes;
  }
    */

  /* 
  -Hacemos un findIndex en el post.likes (likes es un array de id's).
  -Estamos buscando el likeUserId que coincida con el mio, porque si es que si
  devolverá un indice superior o igual a 0.
  -Si no lo ha encontrado (index < 0), lo pusheo.
  -Si lo  ha encontrado, hay que hacer un splice en el indice.
  */

  const index = post.likes.findIndex(likeUserId => likeUserId === userId)

  if (index < 0) {
    post.likes.push(userId)
  } else {
    post.likes.splice(index, 1)
  }
  /*adaptamos la función con un callback. ya que en collection hemos
    modificado la función updateOne para que nos permita pasar una condición.
    Asi que le marcamos una condición, y un document.
    */
  data.posts.updateOne((post) => post.id === postId, post);
};
