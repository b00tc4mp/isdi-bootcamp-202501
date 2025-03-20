import { data } from "../../data/data.js";

import { errors, validate } from "com";

const { SystemError } = errors;
export const toggleLikePost = (postId) => {
  validate.id(postId, "postId");
  // me traigo el user id de la data, que viene del session storage
  const { userId } = data;

  return fetch(`http://localhost:3000/posts/${postId}/likes`, {
    method: "PATCH",
    headers: {
      // le paso el user id en el header
      Authorization: `Basic ${userId}`,
      //aca no usoo el content type porque no estoy enviando nada en el body
    },
  })
  .catch(error=>{
    throw new SystemError("Error al dar like al post", error.message)
  })
  .then(response => {
    if(response.status === 204) return
    //Duda aqui de por que poner ese return y despues el de abajo 
    return response.json()
    .catch(error=>{
      throw new SystemError("Error al dar like al post", error.message)
    })
    //Aca es donde se me mezcla los conceptos de que hacer con el body
    .then(body=>{
      const {error, message} = body

      const constructor = error[error]

      throw new constructor(message)

    })
  })
};
