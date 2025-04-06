import { data } from "../data/index";
import { validate, errors } from "../../com";

const { SystemError } = errors;

export const updateUser = (userInfo) => {
  const { token } = data;

  const { name, username, email, password } = userInfo;

  validate.username(username, "username");
  validate.email(email, "email");
  validate.password(password, "password");
  validate.text(name, "name");
  validate.minLength(name, 2, "name min length");
  validate.maxLength(name, 20, "nameMaxLength");

  return fetch(`${import.meta.env.VITE_API_URL}/users`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  })
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((response) => {
      console.log(response.status);

      if (response.status === 204) {
        return;
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
