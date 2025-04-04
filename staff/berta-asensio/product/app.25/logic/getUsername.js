import { data } from "../data/index.js";

import { errors } from 'com'

const { SystemError } = errors

//esta funcion se usa en homepage, asi que pasamos then catch por ahi
export const getUsername = () => {
  const { token } = data;

  return fetch("http://localhost:8080/users/self/name", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((response) => {
      if (response.status === 200)
        return response
          .json() //si todo va bien convertimos la respuesta a json
          .catch((error) => {
            throw new SystemError(error.message);
          })
          .then((body) => {
            const { name } = body;

            return name;
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
