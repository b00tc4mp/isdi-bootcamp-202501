import { validate, errors } from "../../com";

const { SystemError } = errors;

export const registerUser = (userInfo) => {
  const { name, email, username, password } = userInfo;

  validate.text(name, "name");
  validate.minLength(name, 1, "name");
  validate.maxLength(name, 20, "name");
  validate.email(email, "email");
  validate.username(username, "username");
  validate.password(password, "password");

  return fetch(`${import.meta.env.VITE_API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userInfo),
  })
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((response) => {
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
};
