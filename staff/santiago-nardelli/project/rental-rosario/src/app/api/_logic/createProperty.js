import { Property } from "../../../lib/db/models/index.js";
import { validate, errors } from "com";

const { SystemError, DuplicityError } = errors;

export const createProperty = (propertyData) => {
  // Validaciones de entrada
  console.log("propertyData recibido en createProperty:", propertyData);

  validate.text(propertyData.title, { minLength: 3, maxLength: 50 }, "title");
  validate.url(propertyData.image, "image");
  validate.text(
    propertyData.description,
    { minLength: 3, maxLength: 500 },
    "description"
  );
  validate.text(
    propertyData.location,
    { minLength: 3, maxLength: 50 },
    "location"
  );
  validate.string(propertyData.type, "type");
  validate.number(propertyData.bedrooms, { min: 1 }, "bedrooms");
  validate.number(propertyData.travelers, { min: 1 }, "travelers");
  validate.url(propertyData.airbnbUrl, "airbnbUrl");

  return (async () => {
    let property;

    try {
      property = await Property.findOne({
        location: propertyData.location,
        title: propertyData.title,
      });
    } catch (error) {
      throw new SystemError(error.message);
    }
    if (property) throw new DuplicityError("Property already exists");

    try {
      // Crear la propiedad

      property = await Property.create({
        title: propertyData.title,
        description: propertyData.description,
        location: propertyData.location,
        type: propertyData.type,
        bedrooms: propertyData.bedrooms,
        images: [propertyData.image],
        airbnbUrl: propertyData.airbnbUrl,
        travelers: propertyData.travelers,
      });
      return property; // Importante para obtener el resultado
    } catch (error) {
      throw new SystemError(error.message);
    }
  })();
};
