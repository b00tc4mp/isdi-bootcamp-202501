import { Property } from "../../../lib/db/models/index.js";

import { errors } from "com";

const { SystemError, NotFoundError } = errors;

export async function getFilteredForTrippers(filter) {
  const query = {};

  const travelers = filter?.travelers;

  // Normalizar valores especiales
  if (travelers === "4+") {
    travelers = "4";
  }

  // Filtrar por número mínimo de viajeros si se proporciona
  if (travelers && travelers !== "all" && travelers !== "") {
    query.travelers = { $gte: parseInt(travelers, 10) }; // Número mínimo de viajeros
  }
  let properties;
  try {
    properties = await Property.find(query).select("-__v").sort("title").lean();

    if (properties.length === 0 && travelers) {
      properties = await Property.find({}).select("-__v").sort("title").lean();

      if (properties.length === 0) {
        throw new NotFoundError("No se encontraron propiedades de este tipo.");
      }
    }

    return properties.map((property) => ({
      id: property._id.toString(),
      ...property,
    }));
  } catch (error) {
    // Manejo de errores
    if (error instanceof NotFoundError) {
      console.error(error.message);

      throw error; // Re-lanza el error si es un NotFoundError
    }
    throw new SystemError(`Error fetching properties: ${error.message}`);
  }
}
