import { registerUser } from './registerUser.js';
import { connectToDatabase, disconnectFromDatabase } from '@/lib/db/index.js';
import { withErrorHandling, jsonBodyParser } from '@/lib/handlers';

export default async function handler(req, res) {
  await connectToDatabase();
  try {
    switch (req.method) {
      case 'POST':
        // Procesar el cuerpo de la solicitud
        await jsonBodyParser(req, res);
        const { username, email, password, confirmPassword } = req.body;

        // Validación preliminar
        if (!username || !email || !password || !confirmPassword) {
          return res.status(400).json({ message: 'All fields are required.' });
        }

        if (password !== confirmPassword) {
          return res.status(400).json({ message: 'Passwords do not match.' });
        }

        // Registrar al usuario
        const user = await registerUser(username, email, password);
        return res.status(201).json({ message: 'User registered successfully', user });

      default:
        return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    // Manejo de errores reutilizando withErrorHandling
    return withErrorHandling(res, error);
  } finally {
    await disconnectFromDatabase();
  }
}
