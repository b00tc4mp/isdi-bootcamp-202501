import { errors } from "com";

const { SystemError } = errors;

const { NEXT_PUBLIC_API_URL } = process.env;

export const getFilteredPropertiesRequest = async (filters) => {
  let response;
  let body;

  // Construir la cadena de consulta a partir del objeto de filtros
  const queryString = new URLSearchParams(filters).toString();
  const url = `${NEXT_PUBLIC_API_URL}/properties/filtered?${queryString}`;

  try {
    response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw new SystemError(
      "Error al obtener las propiedades filtradas",
      error.message
    );
  }

  if (response.status === 200) {
    try {
      body = await response.json();
      return body;
    } catch (error) {
      throw new SystemError(
        "Error al parsear la respuesta JSON de las propiedades filtradas",
        error.message
      );
    }
  }

  if (!response.ok) {
    try {
      body = await response.json();
    } catch (error) {
      throw new SystemError(
        "Error al procesar la respuesta de las propiedades filtradas",
        error.message
      );
    }

    const { error, message } = body;
    const ErrorConstructor = errors[error];
    throw new ErrorConstructor(message);
  }
};
