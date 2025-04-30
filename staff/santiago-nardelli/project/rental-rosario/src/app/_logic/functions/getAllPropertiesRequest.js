import { errors } from "com";

const { SystemError } = errors;

const { NEXT_PUBLIC_API_URL } = process.env;

export const getAllPropertiesRequest = async () => {
  let response;
  let body;

  try {
    response = await fetch(`${NEXT_PUBLIC_API_URL}/properties`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw new SystemError("Error al obtener las propiedades", error.message);
  }

  if (response.status === 200) {
    try {
      body = await response.json();
      return body;
    } catch (error) {
      throw new SystemError(
        "Error al parsear la respuesta JSON de las propiedades",
        error.message
      );
    }
  }

  if (!response.ok) {
    try {
      body = await response.json();
    } catch (error) {
      throw new SystemError(
        "Error al procesar la respuesta de las propiedades",
        error.message
      );
    }

    const { error, message } = body;
    const ErrorConstructor = errors[error];
    throw new ErrorConstructor(message);
  }
};
