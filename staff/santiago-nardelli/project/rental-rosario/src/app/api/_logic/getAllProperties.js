import { Property } from "../../../lib/db/models/index.js";
import { errors } from "com";

const { SystemError, NotFoundError } = errors;

export const getAllProperties = async () => {
  let properties;
  try {
    properties = await Property.find()
      .select("-__v")
      .sort("title") // Ordena alfabéticamente por título
      .lean();

    console.log("Propiedades encontradas:", properties.length); // Útil para ver cuántas se devuelven

    // Procesa las propiedades para formatear los datos
    properties.forEach((property) => {
      property.id = property._id.toString();
      delete property._id;
    });

    // Si no se encuentran propiedades, lanza un error
    if (properties.length === 0) {
      throw new NotFoundError("No properties found");
    }
    return properties;
  } catch (error) {
    // Manejo de errores
    if (error instanceof NotFoundError) {
      throw error; // Lanza el error original
    }
    throw new SystemError(`Error fetching properties: ${error.message}`);
  }
};
