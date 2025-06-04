import { data } from "../data/index.js";
import { validate } from "./validate.js";

export const getUserInfo = () => {
  try {
    const { userId } = data;
    validate.id(userId, "user id");

    return fetch("http://localhost:8080/users/self", {
      method: "GET",
      headers: { Authorization: `${data.userId}` },
    })
      .catch((error) => {
        throw new Error(error.message);
      })
      .then((response) => {
        if (response.status === 200)
          return response
            .json()
            .catch((error) => {
              throw new Error(error.message);
            })
            .then((body) => {
              return body;
            });

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
