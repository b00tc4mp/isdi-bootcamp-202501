import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

export const authHandler = (callback) => {
  return async (req, res) => {
    try {
      const { authorization } = req.headers;
      
      // Verificamos que exista el token
      if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authorization token missing or malformed' });
      }

      const token = authorization.slice(7); // Extraemos el token del header

      const { sub: userId } = jwt.verify(token, JWT_SECRET); // Verificamos y decodificamos el token

      // Agregamos el userId al req para que esté disponible en el resto de la ruta
      req.userId = userId;

      // Llamamos a la siguiente función (callback de la ruta)
      return callback(req, res);
    } catch (error) {
      // En caso de error (token inválido o expirado), respondemos con 401
      return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
    }
  };
};
