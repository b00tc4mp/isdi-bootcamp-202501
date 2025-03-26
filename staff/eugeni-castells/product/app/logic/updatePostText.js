import { data } from "../data/index.js";
import { validate, errors } from "../../com";

const { SystemError } = errors;

export const updatePostText = (postId, text) => {
  const { token } = data;

  validate.id(postId, "post id");
  validate.text(text, "post text is text");

  return fetch(`http://localhost:8080/posts/text/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  })
    .then((response) => {
      console.log(response.status);

      if (response.status === 200) return;

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
    })
    .catch((error) => {
      throw new SystemError(error.message);
    });
};
