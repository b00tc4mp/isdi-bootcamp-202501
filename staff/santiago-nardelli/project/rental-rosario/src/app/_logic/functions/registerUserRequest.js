import { errors, validate } from "com";

const { SystemError } = errors;
const { NEXT_PUBLIC_API_URL } = process.env;

export const registerUserRequest = (name, email, password) => {
  // Validar los datos de entrada
  validate.name(name);
  validate.email(email);
  validate.password(password);

  let response;
  let body;

  return (async () => {
    try {
      response = await fetch(`${NEXT_PUBLIC_API_URL}/admins/register`, {
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
