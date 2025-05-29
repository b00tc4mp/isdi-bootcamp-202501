import { data } from "../../_data/index.js";
import { errors, validate } from "com";

const { SystemError } = errors;

export const deletePropertyRequest = async (propertyId) => {
  validate.id(propertyId, "property id");
  const { token } = data;

  let response;
  return (async () => {
    try {
      const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/properties/${propertyId}`;
      response = await fetch(requestUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      throw new SystemError("Error al eliminar propiedad", error.message);
    }

    if (response.status === 204) {
      return { success: true, message: "Property delete successfully!" };
    }

    if (!response.ok) {
      try {
        body = await response.json();
      } catch (error) {
        throw new SystemError(
          `Error al eliminar propiedad (status ${response.status})`,
          error.message
        );
      }

      const { error, message } = body;
      const ErrorConstructor = errors[error];
      throw new ErrorConstructor(message);
    }
  })();
};
