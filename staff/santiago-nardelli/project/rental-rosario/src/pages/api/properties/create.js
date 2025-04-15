import { createProperties } from './createProperties.js';
import { connectToDatabase, disconnectFromDatabase } from '@/lib/db/index.js';
import { withErrorHandling, jsonBodyParser } from '@/lib/handlers';

export default async function handler(req, res) {
  // Conexión a la base de datos
  await connectToDatabase();
  try {
    switch (req.method) {
      case 'POST':
        // Procesar el cuerpo de la solicitud
        await jsonBodyParser(req, res);
        const { title, description, price, location, type, ownerId, images } = req.body;

        // Validación preliminar
        if (!title || !description || !price || !location || !type || !ownerId || !images) {
          return res.status(400).json({ message: 'All fields are required.' });
        }

        // Crear la propiedad
        const result = await createProperties({
          title,
          description,
          price,
          location,
          type,
          ownerId,
          images,
        });

        // Respuesta exitosa
        return res.status(201).json({message: 'Property created successfully', property: result.property});

      default:
        return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    // Manejo de errores utilizando withErrorHandling
    return withErrorHandling(res, error);
  } finally {
    // Desconexión de la base de datos
    await disconnectFromDatabase();
  }
}
