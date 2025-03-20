import { validate, errors } from "com";
const { SystemError } = errors;
export const registerUser = (name, email, password) => {
  validate.text(name, "name");
  validate.maxLength(name, 20, "name");
  validate.email(email, "email");
  validate.password(password, "password");

  return fetch("http://localhost:3000/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((response) => {
      if (response.status === 201)
        return (
          response
            .json()
            .catch((error) => {
              throw new SystemError(error.message);
            })
            //Necesito darle una iteracion mas a esta parte de la logica
            .then((body) => {
              const { error, message } = body;

              const constructor = errors[error];

              throw new constructor(message);
            })
        );
    });
};
