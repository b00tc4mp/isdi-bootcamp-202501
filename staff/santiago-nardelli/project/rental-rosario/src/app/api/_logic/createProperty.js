import { Property } from "../../../lib/db/models/index.js";
import { validate, errors } from "com";

const { SystemError, DuplicityError } = errors;

export const createProperty = (propertyData) => {
  // Validaciones de entrada

  validate.text(propertyData.title, { minLength: 3, maxLength: 50 });
  validate.text(propertyData.description, { minLength: 3, maxLength: 500 });
  validate.number(propertyData.price, { min: 0 });
  validate.text(propertyData.location, { minLength: 3, maxLength: 50 });
  validate.text(propertyData.type, {
    allowedValues: ["house", "apartment", "studio"],
  })

  return (async () => {
    let property

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
        price: propertyData.price,
        location: propertyData.location,
        type: propertyData.type,
        bedrooms: propertyData.bedrooms,
        images: propertyData.images,
        airbnbUrl: propertyData.airbnbUrl
      });
      return property; // Importante para obtener el resultado

    } catch (error) {
      throw new SystemError(error.message);
    }
  })();
};
