import { validate, errors } from "com";
const { SystemError } = errors;
import { data } from "../data/index.js";

const loginUser = function (username, password) {
  validate.password(password, "password");
  validate.username(username, "username");

  return fetch("http://localhost:8080/users/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((response) => {
      if (response.status === 200) {
        return response
          .json()
          .catch((error) => {
            throw new SystemError(error.message);
          })
          .then((body) => {
            const { token } = body;

            data.token = token;
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

export default loginUser;
