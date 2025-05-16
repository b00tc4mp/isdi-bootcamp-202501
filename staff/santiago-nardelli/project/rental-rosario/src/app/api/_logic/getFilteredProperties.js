import { Property } from "../../../lib/db/models/index.js";

import { errors } from "com";

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
  let properties;
  try {
    properties = await Property.find(query).select("-__v").sort("title").lean();

    if (properties.length === 0 && type) {
      properties = await Property.find({ type: query.type })
        .select("-__v")
        .sort("title")
        .lean();

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
