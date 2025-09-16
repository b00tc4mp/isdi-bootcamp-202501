import { errors, validate } from "com";
const { SystemError } = errors;
import { data } from "../../data/data.js";

export const modifyPost = (postId, title) => {
  // Validar el ID del post
  validate.id(postId, "postId");

  // Obtener el ID del usuario actual
  const { token } = data;

  // Realizar la petición
  return fetch(`http://localhost:3000/posts/${postId}/title`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json ",
    },
    body: JSON.stringify({ title }),
  })
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((response) => {
      if (response.status === 204) return;

      return response
        .json()
        .catch((error) => {
          throw new SystemError(error.message);
        })
        .then((body) => {
          const { error, message } = body;

          const constructor = errors[error];

          throw new constructor(message);
        });
    });
};
