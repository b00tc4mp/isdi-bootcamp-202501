import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import { errors } from "com";
import jwt from "jsonwebtoken";

import { data } from "./data/index.js";
import { logic } from "./logic/index.js";

const {
  SystemError,
  ValidateError,
  CredentialsError,
  NotFoundError,
  OwnershipError,
  DuplicityError,
  AuthorizationError,
} = errors;

const { JsonWebTokenError, TokenExpiredError } = jwt; //==> Importo el error JsonWebTokenError de la libreria jsonwebtoken para manejar los errores de token, ya que este error es lanzado cuando el token no es valido o ha expirado. En este caso, lo utilizo para manejar el error de token expirado y el error de token invalido. Si el token es invalido, lanza un error de tipo JsonWebTokenError y si el token ha expirado, lanza un error de tipo TokenExpiredError. Por lo tanto, puedo manejar ambos errores de la misma manera, ya que ambos son errores de token.
const { JWT_SECRET, PORT, URL_MONGO, DB_NAME } = process.env; //==> Variables de entorno que se utilizan en el proyecto para configurar la API

const withErrorHandling = (callback) => {
  return (req, res, next) => {
    try {
      callback(req, res).catch((error) => {
        next(error);
      });
    } catch (error) {
      next(error);
    }
  };
}; //==> Funcion que recibe un callback y retorna un nuevo callback que maneja los errores que se puedan producir en el callback original y los pasa al siguiente middleware que maneja errores (errorHandler) para que este construya la respuesta de error en base al error que se recibe como parametro en la funcion errorHandler y la envie al cliente que realizo la peticion a la API
/**
 * Ventajas:

Centraliza el manejo de errores.
Reduce la duplicación de código en las rutas.
Permite manejar tanto errores síncronos como asíncronos de manera uniforme.
 */

data
  .connect(URL_MONGO, DB_NAME) //==> Conecto a la base de datos
  .catch(console.error)//==> Si hay un error al conectar a la base de datos, lo muestro por consola
  .then(() => {
    const api = express(); //==> Creo la API
    const jsonBodyParse = json(); //==> Middleware que parsea el body de las peticiones a JSON

    api.use(cors()); //==> Middleware que permite que se pueda acceder a la API desde cualquier origen


    // Ruta para autenticar usuarios
    api.post(
      "/users/auth",
      jsonBodyParse,
      withErrorHandling((req, res) => {
        const { email, password } = req.body;

        return logic.authenticateUser(email, password).then((id) => {
          const token = jwt.sign({ sub: id }, JWT_SECRET, {expiresIn: '1h'}); //==> Genero el token con el id del usuario y lo firmo con la clave secreta que tengo en las variables de entorno (JWT_SECRET) y le doy una validez de 1 hora
          res.json({ token });
        });
      })
    );//SI QUIERO VER LA WXPIRACION LUEGO DE REALIZAR EL TEXT SH, EN CONSOLA PONGO EL SIGUIENTE COMANDO:
    //NODE / ATOB(payload)

    // Ruta para registrar usuarios
    api.post(
      "/user/register",
      jsonBodyParse,
      withErrorHandling((req, res) => {
        const { name, email, password } = req.body;

        return logic.registerUser(name, email, password).then(() => {
          res.status(201).send();
        });
      })
    );

    // Ruta para autenticar usuarios (middleware de autenticacion), creado por mi para verificar el token y obtener el id del usuario
    const authHandler= (req, res, next )=>{
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

     //Ruta para obtener User Name
     api.get(
      "/users/self/name",
      authHandler,
      withErrorHandling((req, res) => {
        const{ userId } = req; //==> Obtengo el id del usuario de la request que fue agregado en el middleware de autenticacion
        
        return logic.getUserName(userId).then((name) => {
          res.json({ name });
        });
      })
    );

    // Ruta para obtener los posts
    api.get(
      "/posts",
      authHandler,
      withErrorHandling((req, res) => {
        const { userId } = req; //==> Obtengo el id del usuario de la request que fue agregado en el middleware de autenticacion
    
        return logic.getPosts(userId).then((posts) => res.json(posts));
      })
    );

  
    // Ruta para crear un post
    api.post(
      "/posts",
      jsonBodyParse,
      withErrorHandling((req, res) => {
        const { authorization } = req.headers;

        const token = authorization.slice(7);

        const { sub: userId } = jwt.verify(token, JWT_SECRET);

        const { image, title } = req.body;

        return logic.createPost(userId, image, title).then(() => {
          res.status(201).send();
        });
      })
    );

    // Ruta para modificar un post
    api.patch(
      "/posts/:postId/title",
      jsonBodyParse,
      withErrorHandling((req, res) => {
        const { authorization } = req.headers;

        const token = authorization.slice(7);

        const { sub: userId } = jwt.verify(token, JWT_SECRET);

        const { postId } = req.params;

        const { title } = req.body;

        return logic.modifyPost(userId, postId, title).then(() => {
          res.status(204).send();
        });
      })
    );
    //Ruta para los likes
    api.patch(
      "/posts/:postId/likes",
      withErrorHandling((req, res) => {
        const { authorization } = req.headers;

        const token = authorization.slice(7);

        const { sub: userId } = jwt.verify(token, JWT_SECRET);

        const { postId } = req.params;

        return logic.toggleLikePost(userId, postId).then(() => {
          res.status(204).send();
        });
      })
    );

    // Ruta para eliminar un post
    api.delete(
      "/posts/:postId",
      withErrorHandling((req, res) => {
        const { authorization } = req.headers;

        const token = authorization.slice(7);

        const { sub: userId } = jwt.verify(token, JWT_SECRET);

        const { postId } = req.params;

        return logic.deletePost(userId, postId).then(() => {
          res.status(204).send();
        });
      })
    );
    const errorHandler = (error, req, res, next) => {
      console.error(error);

      let status = 500;
      let errorName = SystemError.name;
      let { message } = error; //==> Mensaje de error que se envia al cliente 

      if (error instanceof ValidateError) {
        status = 400;
        errorName = error.constructor.name;
      } else if (error instanceof CredentialsError) {
        status = 401;
        errorName = error.constructor.name;
      } else if (error instanceof NotFoundError) {
        status = 404;
        errorName = error.constructor.name;
      } else if (error instanceof OwnershipError) {
        status = 403;
        errorName = error.constructor.name;
      } else if (error instanceof DuplicityError) {
        status = 409;
        errorName = error.constructor.name;
      } else if (error instanceof TokenExpiredError) {
        status = 401;
        errorName = AuthorizationError.name;
        message = "Expired token";
      } else if (error instanceof JsonWebTokenError) {
        status = 401;
        errorName = AuthorizationError.name;
        message = "Invalid token";
      }

      res.status(status).json({ error: errorName, message: message });
    }; //==> Funcion que construye la respuesta de error en base al error que se recibe como parametro en la funcion errorHandler

    // Middleware para manejar errores (middleware de error creado por nosotros)
    api.use(errorHandler);

    api.listen(PORT, () => {
      console.log(`Example api listening on port ${PORT}`);
    });
  });
