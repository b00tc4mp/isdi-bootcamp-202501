import { data } from "../data/index.js";
import { validate } from "./validate.js";

export const updatePostText = (postId, text) => {
  const { userId } = data;

  validate.id(userId);
  validate.id(postId);
  validate.text(text);

  return fetch(`http://localhost:8080/posts/text/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${userId}`,
    },
    body: JSON.stringify({ text }),
  })
    .then((response) => {
      console.log(response.status);

      if (response.status === 200) return;

      return response
        .json()
        .catch((error) => {
          throw new Error(error.message);
        })
        .then((body) => {
          const { error, message } = body;

          console.log(error);

          throw new Error(message);
        });
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
