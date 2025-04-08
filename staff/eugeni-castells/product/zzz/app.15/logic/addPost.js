import { validate } from "./validate.js";

export const addPost = (userId, postInfo) => {
  try {
    const { id, url, maxLength, text } = validate;
    const { image } = postInfo;

    id(userId, "userId");
    url(image, "image url");
    text(text, "post text");
    maxLength(500, "post text length");

    return fetch("http://localhost:8080/posts", {
      method: "POST",
      headers: "Content-Type:application/json",
      body: JSON.stringify(postInfo),
    })
      .catch((error) => {
        throw new Error(error.message);
      })
      .then((response) => {
        console.log(response);
        if (response === 201) return;

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
  } catch (error) {
    console.error(error);

    alert(error.message);
  }
};
