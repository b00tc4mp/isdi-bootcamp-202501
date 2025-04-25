import { errors } from "com";

const { SystemError } = errors;

export const getAllPropertiesRequest = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_API_URL}/properties`, {
      method: "GET",
    });

    if (!response.ok) {
      const body = await response.json();
      const { error, message } = body;
      const ErrorConstructor = errors[error] || SystemError;
      throw new ErrorConstructor(
        message || `Error al obtener las propiedades: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof SystemError) {
      throw error;
    }
    throw new SystemError("Error al obtener las propiedades", error.message);
  }
};
