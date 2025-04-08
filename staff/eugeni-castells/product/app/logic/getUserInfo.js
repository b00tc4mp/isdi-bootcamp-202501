import { data } from "../data/index.js";
import { validate, errors } from "../../com";

const { SystemError } = errors;

export const getUserInfo = () => {
  const { token } = data;

  return fetch(`${import.meta.env.VITE_API_URL}/users/self`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
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
};
