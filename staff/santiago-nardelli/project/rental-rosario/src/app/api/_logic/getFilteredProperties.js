import { Property } from "../../../lib/db/models/index.js";

import { errors, validate } from "com";

const { SystemError, NotFoundError } = errors;

export async function getFilteredProperties(filter) {
  const query = {};

  const type = filter?.type;
  const bedrooms = filter?.bedrooms;

  if (type && type !== "all" && type !== "") {
    query.type = { $regex: new RegExp(type, "i") };
  }
  if (bedrooms && bedrooms !== "all" && bedrooms !== "") {
    query.bedrooms = parseInt(bedrooms);
  }

  try {
    const properties = await Property.find(query)
      .select("-__v")
      .sort("title") // Ordena alfabéticamente por título
      .lean();

    console.log("Propiedades encontradas:", properties);
    // Procesa las propiedades para formatear los datos
    properties.forEach((property) => {
      property.id = property._id.toString();
      delete property._id;
    });

    // Si no se encuentran propiedades, lanza un error
    if (properties.length === 0) {
      throw new NotFoundError(
        "No se encontraron propiedades con los filtros especificados."
      );
    }
    return properties;
  } catch (error) {
    // Manejo de errores
    if (error instanceof NotFoundError) {
      throw error; // Re-lanza el error si es un NotFoundError
    }
    throw new SystemError(`Error fetching properties: ${error.message}`);
  }
}
