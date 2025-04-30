import { data } from "../../_data/index.js";
import { errors } from "com";

const { SystemError } = errors;

const { NEXT_PUBLIC_API_URL } = process.env;

export const deletePropertyRequest = async (propertyId) => {
  const { token } = data;

  try {
    const response = await fetch(
      `${NEXT_PUBLIC_API_URL}/properties/${propertyId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const body = await response.json();
      const { error, message } = body;
      const ErrorConstructor = errors[error] || SystemError;
      throw new ErrorConstructor(
        message ||
          `Error al eliminar la propiedad con ID ${propertyId}: ${response.status}`
      );
    }

    // La API podría devolver un 204 No Content en caso de éxito sin cuerpo
    if (response.status === 204) {
      return; // Indica éxito sin datos de respuesta
    }

    return await response.json(); // Si la API devuelve algún dato tras la eliminación (ej., la propiedad eliminada)
  } catch (error) {
    if (error instanceof SystemError) {
      throw error;
    }
    throw new SystemError(
      `Error al eliminar la propiedad con ID ${propertyId}`,
      error.message
    );
  }
};
