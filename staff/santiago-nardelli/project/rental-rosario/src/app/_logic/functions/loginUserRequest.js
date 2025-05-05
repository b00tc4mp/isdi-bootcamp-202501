import { data } from "../../_data/index.js";
import { errors, validate } from "com";

const { SystemError } = errors;

export const loginUserRequest = (email, password) => {
  validate.email(email);
  validate.password(password);

  let response;
  let body;

  return (async () => {
    try {
      response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admins/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
    } catch (error) {
      throw new SystemError("Error al iniciar sesión", error.message);
    }

    if (response.status === 200) {
      body = await response.json();
      const { token } = body;
      data.token = token;
      return body; // Retornamos el body completo en caso de éxito (contiene el token)
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
