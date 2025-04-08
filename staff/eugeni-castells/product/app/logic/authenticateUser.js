import { validate, errors } from "../../com";
import { data } from "../data";

const { SystemError } = errors;

export const authenticateUser = (username, password) => {
  validate.username(username, "username");
  validate.password(password, "password");

  return fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((response) => {
      if (response.status === 200)
        return response
          .json()
          .catch((error) => {
            throw new SystemError(error.message);
          })
          .then((body) => {
            const { token } = body;

            data.token = token;
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
