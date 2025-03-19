import { validate, errors } from "../../com";
import { data } from "../data/index.js";

const { SystemError } = errors;

export const updatePostLike = (postId) => {
  const { userId } = data;

  validate.id(userId, "userId");
  validate.id(postId, "postId");

  return fetch(`http://localhost:8080/posts/likes/${postId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Basic ${userId}`,
    },
  })
    .catch((error) => {
      throw new SystemError(`Fetching error: ${error.message}`);
    })
    .then((response) => {
      console.log(response.status);

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
