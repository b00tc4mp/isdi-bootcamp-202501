import { data } from "../data";
import { errors } from "../../com";

const { SystemError } = errors;

export const getUserPosts = (targetUserId) => {
  const { token } = data;

  return fetch(`http://localhost:8080/users/${targetUserId}/posts`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  })
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((response) => {
      console.log(response.status);

      if (response.status === 200) {
        return response
          .json()
          .catch((error) => {
            throw new SystemError(error.message);
          })
          .then((body) => {
            const posts = body;

            posts.forEach((post) => {
              post.createdAt = new Date(post.createdAt);
              if (post.modifiedAt) post.modifiedAt = new Date(post.modifiedAt);
            });
            return posts;
          });
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
