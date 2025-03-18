import { validate } from "./validate";
import { data } from "../data/index.js";

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
      throw new Error(`Fetching error: ${error.message}`);
    })
    .then((response) => {
      console.log(response.status);

      if (response.status === 204) return;

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
    });
};
