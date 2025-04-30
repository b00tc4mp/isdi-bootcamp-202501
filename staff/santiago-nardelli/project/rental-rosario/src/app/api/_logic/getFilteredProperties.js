import { Property } from "../../../lib/db/models/index.js";

import { errors } from "com";

const { SystemError } = errors;

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
    return properties;
  } catch (error) {
    // Manejo de errores
    throw new SystemError(`Error fetching properties: ${error.message}`);
  }
}
