import { Property, User } from "../../../lib/db/models/index.js";
import { validate, errors } from "com";

const { SystemError, NotFoundError } = errors;

export const updateProperty = (userId, propertyId, updates) => {
  validate.id(userId, "userId");
  validate.id(propertyId, "propertyId");

  //Validacion de update sea un objeto con al menos 1 propiedad ingresada
  if (
    !updates ||
    typeof updates !== "object" ||
    Array.isArray(updates) ||
    !Object.keys(updates).length
  ) {
    throw new NotFoundError("Updates must be a non-empty object");
  }

  // Validaciones de entrada
  if (updates.title) {
    validate.text(updates.title, { minLength: 3, maxLength: 50 });
  }
  if (updates.description) {
    validate.text(updates.description, { minLength: 3, maxLength: 500 });
  }
  if (updates.price) {
    validate.number(updates.price, { min: 0 });
  }
  if (updates.location) {
    validate.text(updates.location, { minLength: 3, maxLength: 50 });
  }
  if (updates.type) {
    validate.text(updates.type, {
      allowedValues: ["house", "apartment", "studio"],
    });
  }
  if (updates.bedrooms) {
    validate.number(updates.bedrooms, { minLength: 1, maxLength: 50 });
  }
  if (updates.images) {
    validate.url(updates.images, { minLength: 1, maxLength: 500 });
  }
  if (updates.airbnbUrl) {
    validate.url(updates.airbnbUrl, { minLength: 1, maxLength: 500 });
  }

  // Filtrar campos vacíos o no válidos
  const filteredUpdates = Object.fromEntries(
    Object.entries(updates).filter(
      ([_, value]) => value !== undefined && value !== null && value !== ""
    )
  );

  if (!Object.keys(filteredUpdates).length) {
    throw new NotFoundError("No valid fields provided for update");
  }

  // Lógica asincrónica envuelta en una IIFE
  return (async () => {
    try {
      const user = await User.findById(userId).lean();
      if (!user) {
        throw new NotFoundError("User not found");
      }
    } catch (error) {
      throw new SystemError(error.message);
    }
    // Buscar la propiedad por ID y actualizarla
    let updatedProperty;
    try {
      updatedProperty = await Property.findOneAndUpdate(
        { _id: propertyId }, // Filtro de búsqueda
        {
          $set: {
            ...filteredUpdates, // Actualiza solo los campos proporcionados
            modifiedAt: new Date(),
          },
        },
        {
          new: true, // Devuelve el documento actualizado
        }
      ).lean();

      if (!updatedProperty) {
        throw new NotFoundError("Property not found");
      }

      return updatedProperty;
    } catch (error) {
      throw new SystemError(error.message);
    }
  })();
};
