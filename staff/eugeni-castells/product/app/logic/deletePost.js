import { data } from "../data/index.js";
import { validate, errors } from "../../com";

const { SystemError } = errors;

export const deletePost = (postId) => {
  const { token } = data;

  validate.id(postId, "post id");

  return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((response) => {
      console.log(response.status);

      if (response.status === 202) {
        return;
      }
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
