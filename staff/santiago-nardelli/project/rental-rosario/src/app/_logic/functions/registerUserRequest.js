import { errors, validate } from "com";

const { SystemError } = errors;

export const registerUserRequest = (name, email, password) => {
  // Validar los datos de entrada
  validate.name(name);
  validate.email(email);
  validate.password(password);

  let response;
  let body;

  return (async () => {
    try {
      response = await fetch(`http://localhost:3000/api/admins/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
    } catch (error) {
      throw new SystemError("Error al registrar usuario", error.message);
    }

    if (response.status === 201) {
      return;
    }

    if (!response.ok) {
      try {
        body = await response.json();
      } catch (error) {
        throw new SystemError("Error al registrar usuario", error.message);
      }

      const { error, message } = body;
      const ErrorConstructor = errors[error];
      throw new ErrorConstructor(message);
    }
  })();
};
