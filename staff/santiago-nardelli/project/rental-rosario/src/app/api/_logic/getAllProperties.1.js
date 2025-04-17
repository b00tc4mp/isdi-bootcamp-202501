import {Property} from '@/lib/db/models/index.js'
import {errors} from 'com'

const {SystemError, NotFoundError}= errors
export const getAllProperties = async (filters = {}, pagination = { limit: 10, page: 1 }) => {
  const { limit = 10, page = 1 } = pagination;// Extraer valores de paginación con valores predeterminados
  const skip = (page - 1) * limit;// Calcular el número de documentos a omitir

  try {
    // Construir consulta con filtros
    const query = {};

    // Filtro por tipo de propiedad
    if (filters.type) query.type = filters.type;

    // Filtro por número de habitaciones
    if (filters.bedrooms) query.bedrooms = { $gte: filters.bedrooms };

    // Filtro por precio (si es que los proporcionan)
    if (filters.minPrice || filters.maxPrice) {
      query.price = {};
      if (filters.minPrice) query.price.$gte = filters.minPrice; // Precio mínimo
      if (filters.maxPrice) query.price.$lte = filters.maxPrice; // Precio máximo
    }

    // Filtro por ubicación (búsqueda parcial)
    if (filters.location) query.location = new RegExp(filters.location, 'i');

    // Consultar base de datos con filtros, paginación y ordenamiento
    const properties = await Property.find(query)// Filtra propiedades según los criterios
      .select('title description price location type images bedrooms createdAt') // Selecciona campos relevantes
      .skip(skip)// Salta los primeros "skip" documentos
      .limit(limit)// Limita el número de documentos devueltos
      .sort({ title: 1 }) // Ordena alfabéticamente por título
      .lean();// Convierte los documentos a objetos JavaScript simples

      if (properties.length === 0) {
        throw new NotFoundError("No properties found with the given filters.");
      }
    // Obtener el total de propiedades para calcular el número total de páginas
    const total = await Property.countDocuments(query);

    return { properties, total, totalPages: Math.ceil(total / limit) };
  } catch (error) {
    throw new SystemError(`Error fetching properties: ${error.message}`);
  }
};
