// Ruta para autenticar usuarios (middleware de autenticacion), creado por mi para verificar el token y obtener el id del usuario
import 'dotenv/config.js';
import jwt from "jsonwebtoken";

export const{ JWT_SECRET } = process.env; 
   export const authHandler= (req, res, next )=>{
      try {
        const { authorization } = req.headers;

        const token = authorization.slice(7);

        const { sub: userId } = jwt.verify(token, JWT_SECRET);

        req.userId = userId; //==> Agrego el id del usuario a la request para poder usarlo en las rutas que lo necesiten
        next(); //==> Llama al siguiente middleware o ruta
      } catch (error) {
        next(error)
      }
    }