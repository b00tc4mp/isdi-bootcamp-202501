import { validate, errors } from "../../com";

const { SystemError } = errors;

export const registerUser = (userInfo) => {
  try {
    const { name, email, username, password } = userInfo;

    validate.text(name, "name");
    validate.minLength(name, 1, "name");
    validate.maxLength(name, 20, "name");
    validate.email(email, "email");
    validate.username(username, "username");
    validate.password(password, "password");

    return fetch("http://localhost:8080/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    })
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((response) => {
        console.log(response.status);

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
  } catch (error) {
    console.error(error);

    alert(error.message);
  }
};
