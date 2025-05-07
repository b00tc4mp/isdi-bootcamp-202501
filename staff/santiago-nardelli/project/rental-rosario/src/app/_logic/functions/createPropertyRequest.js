import { data } from "../../_data/index.js";
import { validate, errors } from "com";

const { SystemError } = errors;
export const createPropertyRequest = (propertyData) => {
  const {
    title: propertyName,
    image: propertyImage,
    description: propertyDescription,
    location: propertyLocation,
    type: propertyType,
    bedrooms: propertyRooms,
    airbnbUrl: propertyUrlArbnb,
  } = propertyData;

  // Validate Name
  validate.text(propertyName);
  validate.minLength(propertyName, 3, "property name");
  validate.maxLength(propertyName, 100, "property name");
  // Validate Image
  validate.url(propertyImage, "property image");
  // Validate Description
  validate.text(propertyDescription);
  validate.minLength(propertyDescription, 10, "property description");
  validate.maxLength(propertyDescription, 1000, "property description");
  // Validate Location
  validate.text(propertyLocation);
  // Validate Type
  validate.text(propertyType);
  // Validate Rooms
  validate.number(propertyRooms);
  // Validate UrlArbnb
  validate.url(propertyUrlArbnb, "property urlArbnb");

  const { token } = data;

  let body;
  let response;
  return (async () => {
    try {
      response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/properties`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: propertyName,
          image: propertyImage,
          description: propertyDescription,
          airbnbUrl: propertyUrlArbnb,
          location: propertyLocation,
          type: propertyType,
          bedrooms: propertyRooms,
        }),
      });
    } catch (error) {
      throw new SystemError("Error al crear propiedad", error.message);
    }

    if (response.status === 201) {
      return { success: true, message: "Property created successfully!" };
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
