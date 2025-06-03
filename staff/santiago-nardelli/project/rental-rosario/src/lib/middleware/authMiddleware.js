import jwt from "jsonwebtoken";
import { errors } from "com";

const { AuthorizationError } = errors;

const { JWT_SECRET } = process.env;

export const authMiddleware = (handler) => {
  return async (req, res, params) => {
    const authorization = req.headers.get("authorization"); // Usar `req.headers.get`

    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new AuthorizationError("Unauthorized: Missing or malformed token");
    }

    const token = authorization.slice(7); // Extraer el token del encabezado

    // Decodificar y verificar el token
    const { id, role } = jwt.verify(token, JWT_SECRET);

    // Agregar los datos decodificados al objeto req
    req.user = { id, role };

    // Continuar con el controlador de la ruta
    return await handler(req, res, params);
  };
};
