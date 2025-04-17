import { Property} from '../../../lib/db/models/index.js'
import { errors} from 'com'

const {SystemError, NotFoundError}= errors

export const getAllProperties = async () => {
  let properties 
  try {
      
       properties = await Property.find()
        .select('-__v')
        .sort('title') // Ordena alfabéticamente por título
        .lean(); 
  
        console.log('Propiedades encontradas:', properties);
      // Procesa las propiedades para formatear los datos
      properties.forEach(property => {
        property.id = property._id.toString(); 
        delete property._id;
      });
  
      return properties;
    } catch (error) {
      // Manejo de errores
      throw new SystemError(`Error fetching properties: ${error.message}`);
    }
  };