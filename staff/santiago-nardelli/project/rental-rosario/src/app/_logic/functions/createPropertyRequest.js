import { data } from "../../_data/index.js";
import { validate, errors } from "com";

const { SystemError } = errors;

export const createPropertyRequest = (propertyData) => {
  const {
    title: propertyName,
    urlImage: propertyImage,
    description: propertyDescription,
    location: propertyLocation,
    type: propertyType,
    rooms: propertyRooms,
    urlArbnb: propertyUrlArbnb,
  } = propertyData;

  // Validate Name
  validate.text(propertyName);
  validate.minLength(propertyName, 3, "property name");
  validate.maxLength(propertyName, 20, "property name");
  // Validate Image
  validate.url(propertyImage);
  // Validate Description
  validate.text(propertyDescription);
  validate.minLength(propertyDescription, 10, "property description");
  validate.maxLength(propertyDescription, 200, "property description");
  // Validate Location
  validate.text(propertyLocation);
  // Validate Type
  validate.text(propertyType);
  // Validate Rooms
  validate.number(propertyRooms);
  // Validate UrlArbnb
  validate.url(propertyUrlArbnb);

  const { token } = data;

  let body;
  let response;
  return (async () => {
    try {
      response = await fetch(`http://localhost:3000/api/properties`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: propertyName,
          image: propertyImage,
          description: propertyDescription,
          urlArbnb: propertyUrlArbnb,
          location: propertyLocation,
          type: propertyType,
          rooms: propertyRooms,
        }),
      });
    } catch (error) {
      throw new SystemError("Error al crear propiedad", error.message);
    }

    if (response.status === 201) {
      return true;
    }

    if (!response.ok) {
      try {
        body = await response.json();
      } catch (error) {
        throw new SystemError(
          `Error al crear propiedad (status ${response.status})`,
          error.message
        );
      }

      const { error, message } = body;
      const ErrorConstructor = errors[error];
      throw new ErrorConstructor(message);
    }
  })();
};
