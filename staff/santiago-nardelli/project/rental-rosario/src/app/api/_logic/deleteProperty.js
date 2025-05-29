import { Property } from "../../../lib/db/models/index.js";
import { errors, validate } from "com";
import mongoose from "mongoose";

const { NotFoundError, SystemError } = errors;

export const deleteProperty = (userId, propertyId) => {
  // Validar el ID de la propiedad
  validate.id(userId, "userId");
  validate.id(propertyId, "propertyId");

  return (async () => {
    let deletedProperty;
    try {
      // Buscar y eliminar la propiedad por ID
      deletedProperty = await Property.findByIdAndDelete(propertyId);

      // Si no se encuentra la propiedad, lanzar un error
      if (!deletedProperty) {
        throw new NotFoundError("Property not found");
      }
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        throw new NotFoundError("Property not found");
      }
      throw new SystemError(`Error deleting property: ${error.message}`);
    }
  })();
};
