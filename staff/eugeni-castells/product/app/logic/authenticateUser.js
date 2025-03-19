import { validate, errors } from "../../com";
import { data } from "../data";

const { SystemError } = errors;

export const authenticateUser = (username, password) => {
  validate.username(username, "username");
  validate.password(password, "password");

  return fetch("http://localhost:8080/users/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .catch((error) => {
      throw new Error(error.message);
    })
    .then((response) => {
      console.log(response.status);

      if (response.status === 200)
        return response
          .json()
          .catch((error) => {
            throw new SystemError(error.message);
          })
          .then((body) => {
            const { id } = body;

            data.userId = id;
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
};
