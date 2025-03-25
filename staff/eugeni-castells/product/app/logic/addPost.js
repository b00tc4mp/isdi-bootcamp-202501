import { data } from "../data/index.js";
import { validate, errors } from "../../com";

const { SystemError } = errors;

export const addPost = (postInfo) => {
  try {
    const { token } = data;

    const { image, text } = postInfo;

    validate.id(userId, "userId");
    validate.url(image, "image url");
    validate.text(text, "post text");
    validate.maxLength(500, "post text length");

    return fetch("http://localhost:8080/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postInfo),
    })
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((response) => {
        console.log(response);
        if (response.status === 201) return;

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
  } catch (error) {
    console.error(error);

    alert(error.message);
  }
};
