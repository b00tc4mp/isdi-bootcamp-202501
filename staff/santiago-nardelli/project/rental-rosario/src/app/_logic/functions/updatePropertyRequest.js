import { data } from "../../_data";
import { validate, errors } from "com";

const { SystemError } = errors;

export const updatePropertyRequest = async (propertyId, propertyData) => {
  const { token } = data;

  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/properties/${propertyId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(propertyData),
      }
    );

    if (!response.ok) {
      const body = await response.json();
      const { error, message } = body;
      const ErrorConstructor = errors[error] || SystemError;
      throw new ErrorConstructor(
        message ||
          `Error al actualizar la propiedad con ID ${propertyId}: ${response.status}`
      );
    }

    return await response.json(); // Devuelve los datos de la propiedad actualizada
  } catch (error) {
    if (error instanceof SystemError) {
      throw error;
    }
    throw new SystemError(
      `Error al actualizar la propiedad con ID ${propertyId}`,
      error.message
    );
  }
};
