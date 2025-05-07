import { data } from "../../_data";
import { validate, errors } from "com";

const { SystemError } = errors;

export const updatePropertyRequest = async (propertyId, updates) => {
  validate.id(propertyId, "property id");
  if (updates.title !== undefined) {
    validate.text(updates.title);
    validate.minLength(updates.title, 3, "property name");
    validate.maxLength(updates.title, 100, "property name");
  }
  if (updates.images !== undefined) {
    validate.url(updates.images, "property image");
  }
  if (updates.description !== undefined) {
    validate.text(updates.description);
    validate.minLength(updates.description, 10, "property description");
    validate.maxLength(updates.description, 500, "property description");
  }
  if (updates.location !== undefined) {
    validate.text(updates.location);
  }
  if (updates.type !== undefined) {
    validate.text(updates.type);
  }
  if (updates.bedrooms !== undefined) {
    validate.number(updates.bedrooms);
  }
  if (updates.airbnbUrl !== undefined) {
    validate.url(updates.airbnbUrl, "property urlArbnb");
  }

  const { token } = data;

  let body;
  let response;
  return (async () => {
    try {
      const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/properties/${propertyId}`;
      response = await fetch(requestUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });
    } catch (error) {
      throw new SystemError("Error al crear propiedad", error.message);
    }

    if (response.status === 204) {
      return { success: true, message: "Property update successfully!" };
    }

    if (!response.ok) {
      try {
        body = await response.json();
      } catch (error) {
        throw new SystemError(
          `Error al modificar propiedad (status ${response.status})`,
          error.message
        );
      }

      const { error, message } = body;
      const ErrorConstructor = errors[error];
      throw new ErrorConstructor(message);
    }
  })();
};
