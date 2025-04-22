import { Property } from "../../../lib/db/models/index.js";
import { errors, validate } from "com";

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
        throw new errors.NotFoundError("Property not found");
      }
    } catch (error) {
      throw new errors.SystemError(`Error deleting property: ${error.message}`);
    }
  })();
};
