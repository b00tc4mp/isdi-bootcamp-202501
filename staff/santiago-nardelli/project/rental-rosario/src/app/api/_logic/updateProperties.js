import { Property, User } from "../../../lib/db/models/index.js";
import { validate, errors } from "com";

const { SystemError, NotFoundError, ValidateError, AuthorizationError } =
  errors;

// Función auxiliar para validar y filtrar actualizaciones
const validateAndFilterUpdates = (updates) => {
  if (!updates || typeof updates !== "object" || Array.isArray(updates)) {
    throw new ValidateError("Updates must be a non-empty object");
  }

  const allowedFields = {
    title: (value) => validate.text(value, { minLength: 3, maxLength: 50 }),
    description: (value) =>
      validate.text(value, { minLength: 3, maxLength: 500 }),
    price: (value) => validate.number(value, { min: 0 }),
    location: (value) => validate.text(value, { minLength: 3, maxLength: 50 }),
    type: (value) =>
      validate.text(value, { allowedValues: ["house", "apartment", "studio"] }),
    bedrooms: (value) => validate.number(value, { min: 1, max: 50 }),
    travelers: (value) => validate.number(value, { min: 1, max: 50 }),
    images: (value) => {
      if (!Array.isArray(value)) {
        throw new ValidateError("Images must be an array");
      }
      value.forEach((image) => validate.url(image, "image URL"));
    },
    airbnbUrl: (value) => validate.url(value, { minLength: 1, maxLength: 500 }),
  };

  const filteredUpdates = Object.entries(updates)
    .filter(
      ([key, value]) => value !== undefined && value !== null && value !== ""
    )
    .reduce((acc, [key, value]) => {
      if (allowedFields[key]) {
        allowedFields[key](value); // Valida el campo si está permitido
        acc[key] = value; // Solo agrega campos válidos
      }
      return acc;
    }, {});

  if (!Object.keys(filteredUpdates).length) {
    throw new ValidateError("No valid fields provided for update");
  }

  return filteredUpdates;
};

export const updateProperty = (userId, propertyId, updates) => {
  validate.id(userId, "userId");
  validate.id(propertyId, "propertyId");

  const filteredUpdates = validateAndFilterUpdates(updates);

  return (async () => {
    let user;
    try {
      // Verificación del Usuario
      user = await User.findById(userId).lean();
      if (!user) {
        throw new NotFoundError("User not found");
      }
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error; // Re-lanzar errores esperados
      }
      throw new SystemError(error.message); // Otros errores como problemas de conexión
    }

    let updatedProperty;

    try {
      // Actualización de la Propiedad
      updatedProperty = await Property.findOneAndUpdate(
        { _id: propertyId },
        {
          $set: {
            ...filteredUpdates,
            updatedAt: new Date(),
          },
        },
        { new: true }
      ).lean();

      if (!updatedProperty) {
        throw new NotFoundError("Property not found");
      }

      return updatedProperty;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error; // Re-lanzar errores esperados
      }

      throw new SystemError(error.message); // Otros errores como problemas de conexión
    }
  })();
};
