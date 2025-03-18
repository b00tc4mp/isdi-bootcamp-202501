import { data } from "../data/index.js";
import { validate } from "./validate";

export const deletePost = (postId) => {
  const { userId } = data;
  validate.id(userId, "user id");
  validate.id(postId, "post id");

  return fetch(`http://localhost:8080/posts/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Basic ${userId}`,
    },
  })
    .catch((error) => {
      throw new Error(error.message);
    })
    .then((response) => {
      console.log(response.status);

      if (response.status === 202) {
        return;
      }
      return response
        .json()
        .catch((error) => {
          throw new Error(error.message);
        })
        .then((body) => {
          const { error, message } = body;

          console.Console.log(error);

          throw new Error(message);
        });
    });
};
