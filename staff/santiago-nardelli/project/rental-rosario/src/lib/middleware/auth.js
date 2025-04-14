import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET no está definido en las variables de entorno');
}

export function verifyToken(req) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Unauthorized');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded; // Devuelve el payload del token
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}