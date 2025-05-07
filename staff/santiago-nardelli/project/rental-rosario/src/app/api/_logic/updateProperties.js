import { Property, User } from "../../../lib/db/models/index.js";
import { validate, errors } from "com";

const { SystemError, NotFoundError, ValidateError } = errors;

export const updateProperty = (userId, propertyId, updates) => {
  // 1. Validación de IDs: Asegura que userId y propertyId sean IDs válidos.
  validate.id(userId, "userId");
  validate.id(propertyId, "propertyId");

  // 2. Validación de 'updates': Verifica que 'updates' sea un objeto no vacío.
  if (
    !updates ||
    typeof updates !== "object" ||
    Array.isArray(updates) ||
    !Object.keys(updates).length
  ) {
    throw new NotFoundError("Updates must be a non-empty object");
  }

  // 3. Validaciones de Campos Individuales en 'updates':
  //    Se valida cada campo que podría venir en el objeto 'updates'.
  //    Solo se valida si el campo está presente en 'updates'.
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
    if (!Array.isArray(updates.images)) {
      throw new ValidateError("Images must be an array");
    }
    updates.images.forEach((image) => {
      validate.url(image, "image URL");
    });
  }
  if (updates.airbnbUrl) {
    validate.url(updates.airbnbUrl, { minLength: 1, maxLength: 500 });
  }

  // 4. Filtrado de 'updates': Elimina campos con valores vacíos, nulos o indefinidos.
  const filteredUpdates = Object.fromEntries(
    Object.entries(updates).filter(
      ([_, value]) => value !== undefined && value !== null && value !== ""
    )
  );

  // 5. Verificación de 'filteredUpdates': Asegura que queden campos válidos después del filtrado.
  if (!Object.keys(filteredUpdates).length) {
    throw new NotFoundError("No valid fields provided for update");
  }

  // 6. Lógica Asincrónica Principal (IIFE - Immediately Invoked Function Expression):
  //    La lógica de la base de datos se envuelve en una función asincrónica que se ejecuta inmediatamente.
  return (async () => {
    // 6.1. Verificación del Usuario (Autorización):
    //    Busca al usuario por userId para asegurar que existe.
    try {
      const user = await User.findById(userId).lean();
      if (!user) {
        throw new NotFoundError("User not found");
      }
    } catch (error) {
      throw new SystemError(error.message);
    }
    // 6.2. Búsqueda y Actualización de la Propiedad:
    //    Utiliza findOneAndUpdate de Mongoose para buscar la propiedad por _id y actualizarla.
    let updatedProperty;
    try {
      updatedProperty = await Property.findOneAndUpdate(
        { _id: propertyId }, // Filtro de búsqueda: encuentra la propiedad por su _id.
        {
          $set: {
            ...filteredUpdates, // Los datos a actualizar se aplican usando $set.
            modifiedAt: new Date(), // Se actualiza la fecha de modificación.
          },
        },
        {
          new: true, // Importante: Devuelve el documento *después* de la actualización.
        }
      ).lean();

      // 6.3. Verificación de si la Propiedad Fue Encontrada y Actualizada:
      if (!updatedProperty) {
        throw new NotFoundError("Property not found");
      }

      return updatedProperty; // Retorna la propiedad actualizada.
    } catch (error) {
      throw new SystemError(error.message);
    }
  })();
};
