import { loginUser } from './loginUser.js';
import { connectToDatabase, disconnectFromDatabase } from '@/lib/db/index.js';
import { withErrorHandling, jsonBodyParser } from '@/lib/handlers';


export default async function handler(req, res) {
  await connectToDatabase();
  try {
    switch (req.method) {
      case 'POST':
        await jsonBodyParser(req, res);
        const { email, password } = req.body;
        
        const response = await loginUser(email, password);
        return res.status(200).json(response);
      default:
        return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    return withErrorHandling(res, error);
  } finally {
    await disconnectFromDatabase();
  }
};

