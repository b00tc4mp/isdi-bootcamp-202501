import { data } from "../data/index.js";
import { validate, errors } from "../../com";

const { SystemError } = errors;

export const getUserInfo = () => {
  try {
    const { userId } = data;
    validate.id(userId, "user id");

    return fetch("http://localhost:8080/users/self", {
      method: "GET",
      headers: { Authorization: `${data.userId}` },
    })
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((response) => {
        if (response.status === 200)
          return response
            .json()
            .catch((error) => {
              throw new S(error.message);
            })
            .then((body) => {
              return body;
            });

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
