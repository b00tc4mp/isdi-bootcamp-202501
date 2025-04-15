import { Property } from '../../../lib/db/models/index.js';
import { validate, errors } from 'com';

const { SystemError, ValidateError } = errors;

export const createProperties = async (propertyData) => {
  // Validaciones de entrada
  try {
    validate.text(propertyData.title, { minLength: 3, maxLength: 50 });
    validate.text(propertyData.description, { minLength: 3, maxLength: 500 });
    validate.number(propertyData.price, { min: 0 });
    validate.text(propertyData.location, { minLength: 3, maxLength: 50 });
    validate.text(propertyData.type, { allowedValues: ['house', 'apartment', 'studio'] }); // Ejemplo de valores permitidos
    validate.text(propertyData.ownerId);
  } catch (validationError) {
    throw new ValidateError(`Validation failed: ${validationError.message}`);
  }

  try {
    // Crear la propiedad
    const property = new Property({
      title: propertyData.title,
      description: propertyData.description,
      price: propertyData.price,
      location: propertyData.location,
      type: propertyData.type,
      ownerId: propertyData.ownerId,
      images: propertyData.images,
    });

    // Guardar la propiedad en la base de datos
    await property.save();

    return { message: 'Property created successfully', property };
  } catch (error) {
    console.error('Database error:', error);
    throw new SystemError('Error creating the property');
  }
};
